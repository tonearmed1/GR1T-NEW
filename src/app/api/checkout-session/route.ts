import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    type PaymentPayload = {
      amount: number;
      email: string;
      name?: string;
      phone?: string;
      address?: string;
      address2?: string;
      city?: string;
      postalCode?: string;
      country?: string;
      company?: string;
      tshirtSize?: string;
      model?: string;
    };
    const { amount, email, name, phone, address, address2, city, postalCode, country, company, tshirtSize, model } =
      (await req.json()) as Partial<PaymentPayload>;

    if (typeof amount !== "number") {
      return NextResponse.json({ error: "Missing amount" }, { status: 400 });
    }
    // Do not require name/address/phone during intent initialization; client enforces them before payment

    // 1️⃣ Create a Payment Intent (not a Checkout Session)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "eur",
      receipt_email: email,
      description: "Deposit Payment",
      automatic_payment_methods: { enabled: true },
      metadata: {
        name: name || "",
        phone: phone || "",
        address: address || "",
        address2: address2 || "",
        city: city || "",
        postalCode: postalCode || "",
        country: country || "",
        company: company || "",
        tshirtSize: tshirtSize || "",
        model: model || "",
      },
      shipping:
        name || address
          ? {
              name: name || "",
              address: {
                line1: address || "",
                line2: address2 || undefined,
                city: city || undefined,
                postal_code: postalCode || undefined,
                country: country || undefined,
              },
              phone: phone,
            }
          : undefined,
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret, id: paymentIntent.id });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    type UpdatePayload = {
      id?: string;
      clientSecret?: string;
      email?: string;
      name?: string;
      phone?: string;
      address?: string;
      address2?: string;
      city?: string;
      postalCode?: string;
      country?: string;
      company?: string;
      tshirtSize?: string;
      model?: string;
    };
    const {
      id: explicitId,
      clientSecret,
      email,
      name,
      phone,
      address,
      address2,
      city,
      postalCode,
      country,
      company,
      tshirtSize,
      model,
    } = (await req.json()) as Partial<UpdatePayload>;
    let id = explicitId;
    if (!id && clientSecret && clientSecret.startsWith("pi_")) {
      const idx = clientSecret.indexOf("_secret");
      if (idx > 0) id = clientSecret.substring(0, idx);
    }
    if (!id) return NextResponse.json({ error: "Missing payment intent id or clientSecret" }, { status: 400 });

    const updated = await stripe.paymentIntents.update(id, {
      receipt_email: email,
      metadata: {
        name: name || "",
        phone: phone || "",
        address: address || "",
        address2: address2 || "",
        city: city || "",
        postalCode: postalCode || "",
        country: country || "",
        company: company || "",
        tshirtSize: tshirtSize || "",
        model: model || "",
      },
      shipping:
        name || address
          ? {
              name: name || "",
              address: {
                line1: address || "",
                line2: address2 || undefined,
                city: city || undefined,
                postal_code: postalCode || undefined,
                country: country || undefined,
              },
              phone: phone,
            }
          : undefined,
    });
    return NextResponse.json({ id: updated.id, clientSecret: updated.client_secret });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
