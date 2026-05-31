import { NextResponse } from "next/server";
import mailchimp from "@mailchimp/mailchimp_marketing";
import { createHash } from "crypto";

function getStatusFromError(err: unknown): number | undefined {
  if (typeof err === "object" && err !== null) {
    const obj = err as Record<string, unknown>;
    const s = obj.status;
    if (typeof s === "number") return s;
    const resp = (obj as { response?: unknown }).response;
    if (typeof resp === "object" && resp !== null) {
      const r = resp as Record<string, unknown>;
      const rs = r.status;
      if (typeof rs === "number") return rs;
    }
  }
  return undefined;
}

function configureMailchimp() {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  const explicitServer = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!apiKey) {
    throw new Error("MAILCHIMP_API_KEY is not set.");
  }
  if (!listId) {
    throw new Error("MAILCHIMP_LIST_ID is not set.");
  }

  // Derive server prefix from API key if not explicitly provided
  const derivedServer = apiKey.includes("-") ? apiKey.split("-")[1] : undefined;
  const server = explicitServer || derivedServer;

  if (!server) {
    throw new Error(
      "MAILCHIMP_SERVER_PREFIX is not set and could not be derived from MAILCHIMP_API_KEY. Expected suffix like 'us20' in API key."
    );
  }

  // Basic validation: typical Mailchimp servers are like 'us1', 'us20', etc.
  if (!/^us\d+$/i.test(server)) {
    throw new Error(
      `MAILCHIMP_SERVER_PREFIX '${server}' looks invalid. Use the data center suffix from your API key (e.g., 'us20').`
    );
  }

  mailchimp.setConfig({ apiKey, server });

  return { listId };
}

export async function POST(req: Request) {
  try {
    const { listId } = configureMailchimp();
    type SubscribePayload = {
      email: string;
      name?: string;
      company?: string;
      country?: string;
      phone?: string;
      address?: string;
      tshirtSize?: string;
      tags?: string[];
    };
    const { email, name, company, country, phone, address, tshirtSize, tags } = (await req.json()) as Partial<SubscribePayload>;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const memberBody = {
      email_address: email,
      status: "subscribed" as const,
      merge_fields: {
        FNAME: name ?? undefined,
        COMPANY: company ?? undefined,
        COUNTRY: country ?? undefined,
        PHONE: phone ?? undefined,
        ADDRESS: address ?? undefined,
        TSHIRT: tshirtSize ?? undefined,
      },
    };

    // Extend lists client to include updateListMember for existing members
    type MailchimpListsExtended = {
      addListMember: (
        listId: string,
        input: {
          email_address: string;
          status: "subscribed" | "unsubscribed" | "pending" | "cleaned";
          merge_fields?: Record<string, unknown>;
        }
      ) => Promise<{ id: string }>;
      updateListMember: (
        listId: string,
        subscriberHash: string,
        input: {
          email_address?: string;
          status?: "subscribed" | "unsubscribed" | "pending" | "cleaned";
          merge_fields?: Record<string, unknown>;
        }
      ) => Promise<{ id: string }>;
      updateListMemberTags: (
        listId: string,
        subscriberHash: string,
        input: { tags: Array<{ name: string; status: "active" | "inactive" }> }
      ) => Promise<unknown>;
    };
    const mc = mailchimp as unknown as { lists: MailchimpListsExtended };

    const requestedTags = Array.isArray(tags) && tags.length > 0 ? tags : ["newsletter"];

    try {
      const response = await mc.lists.addListMember(listId!, memberBody);
      // Tag the member as 'newsletter'
      try {
        const subscriberHash = createSubscriberHash(email);
        await mc.lists.updateListMemberTags(listId!, subscriberHash, {
          tags: requestedTags.map((name) => ({ name, status: "active" as const })),
        });
      } catch (tagErr) {
        console.error(tagErr);
      }
      return NextResponse.json({ message: "Subscribed successfully", id: response.id });
    } catch (addErr: unknown) {
      // If member already exists, update their info and treat as success
      const status = getStatusFromError(addErr);
      const info = extractMailchimpError(addErr);
      if (status === 400 && info.title === "Member Exists") {
        const subscriberHash = createHash("md5").update(email.toLowerCase().trim()).digest("hex");
        const updated = await mc.lists.updateListMember(listId!, subscriberHash, {
          status: "subscribed",
          merge_fields: {
            FNAME: name ?? undefined,
            COMPANY: company ?? undefined,
            COUNTRY: country ?? undefined,
            PHONE: phone ?? undefined,
            ADDRESS: address ?? undefined,
            TSHIRT: tshirtSize ?? undefined,
          },
        });
        // Tag the member as 'newsletter' (upsert case)
        try {
          await mc.lists.updateListMemberTags(listId!, subscriberHash, {
            tags: requestedTags.map((name) => ({ name, status: "active" as const })),
          });
        } catch (tagErr) {
          console.error(tagErr);
        }
        return NextResponse.json({ message: "Already subscribed; details updated", id: updated.id });
      }
      // For other 400s, return detail/title to client
      const detail = info.detail ?? (addErr instanceof Error ? addErr.message : undefined) ?? "Bad Request";
      return NextResponse.json({ error: detail }, { status: status ?? 400 });
    }
  } catch (err: unknown) {
    console.error(err);
    const statusCandidate = getStatusFromError(err);
    const status = statusCandidate ?? 500;
    let message = err instanceof Error ? err.message : "Unexpected error";
    if (status === 401) {
      message =
        "Unauthorized: verify MAILCHIMP_API_KEY, server prefix (e.g., us20), and that MAILCHIMP_LIST_ID belongs to the same account.";
    } else if (status === 404) {
      message = "Not Found: verify MAILCHIMP_LIST_ID and API data center prefix (e.g., us20).";
    }
    return NextResponse.json({ error: message }, { status });
  }
}

export async function GET() {
  try {
    configureMailchimp();
    return NextResponse.json({ message: "Mailchimp endpoint is reachable. Use POST to subscribe." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function extractMailchimpError(err: unknown): { status?: number; title?: string; detail?: string } {
  const status = getStatusFromError(err);
  let title: string | undefined;
  let detail: string | undefined;
  if (typeof err === "object" && err !== null) {
    const obj = err as Record<string, unknown>;
    const resp = (obj as { response?: unknown }).response;
    if (typeof resp === "object" && resp !== null) {
      const r = resp as Record<string, unknown>;
      const body = r.body;
      if (typeof body === "object" && body !== null) {
        const b = body as Record<string, unknown>;
        if (typeof b.title === "string") title = b.title;
        if (typeof b.detail === "string") detail = b.detail;
      } else if (typeof r.text === "string") {
        try {
          const parsed = JSON.parse(r.text as string) as Record<string, unknown>;
          if (typeof parsed.title === "string") title = parsed.title;
          if (typeof parsed.detail === "string") detail = parsed.detail;
        } catch {
          // ignore parse errors
        }
      }
    }
  }
  return { status, title, detail };
}

function createSubscriberHash(email: string): string {
  return createHash("md5").update(email.toLowerCase().trim()).digest("hex");
}
