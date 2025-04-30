import { MailSlurp } from "mailslurp-client";

// Use API key from environment or hardcode for testing
const apiKey = 'b8cf2e87a1cdfe280e99a81185d5d54887110c7a14dfe452de7dfb1dac0996f4';
const mailslurp = new MailSlurp({ apiKey });

export async function getVerificationCode(): Promise<string> {
    const inboxIDs = await mailslurp.inboxController.getInboxIds();
    const inboxId = inboxIDs.inboxIds[0].id;

    // wait for verification code
    const email = await mailslurp.waitForLatestEmail(inboxId)

    const regex = /\>\d{6}/g;
    const str = JSON.stringify(email.body);
    const match = str.match(regex);

    if (match) {
        console.log("Matched 6-digit number:", match[0]);
        const res = match[0]
        return res.substring(1)
    } else {
        console.error("No 6-digit number found.Can't get the code in mail");
        return ""
    }

}
