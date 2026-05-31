declare module "@mailchimp/mailchimp_marketing" {
  type MailchimpConfig = {
    apiKey: string;
    server: string;
  };

  type AddListMemberInput = {
    email_address: string;
    status: "subscribed" | "pending" | "unsubscribed" | "cleaned" | "transactional";
    merge_fields?: Record<string, unknown>;
  };

  type AddListMemberResponse = {
    id: string;
  };

  const mailchimp: {
    setConfig: (config: MailchimpConfig) => void;
    lists: {
      addListMember: (listId: string, input: AddListMemberInput) => Promise<AddListMemberResponse>;
    };
  };

  export default mailchimp;
}