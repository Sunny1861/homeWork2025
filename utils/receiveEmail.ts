import { MailSlurp } from "mailslurp-client";

const apiKey = 'b8cf2e87a1cdfe280e99a81185d5d54887110c7a14dfe452de7dfb1dac0996f4';

export class MailOperation {
    private  mailslurp:MailSlurp;

    constructor() {
        this.mailslurp = new MailSlurp({ apiKey }); 
    }

    async getVerificationCode(): Promise<string> {
        const inboxIDs = await this.mailslurp.inboxController.getInboxIds();
        const inboxId = inboxIDs.inboxIds[0].id;
    
        // wait for verification code
        const email = await this.mailslurp.waitForLatestEmail(inboxId)
    
        const regex = /\>\d{6}/g;
        const str = JSON.stringify(email.body);
        const match = str.match(regex);
    
        if (match) {
            console.debug("Matched 6-digit number:", match[0]);
            const res = match[0]
            return res.substring(1)
        } else {
            console.error("No 6-digit number found. Can't get the code in mail");
            return ""
        }
    
    }

    async emptyInbox(): Promise<void> {
        const inboxIDs = await this.mailslurp.inboxController.getInboxIds();
        const inboxId = inboxIDs.inboxIds[0].id;
    
        // Empty inbox.
        const email = await this.mailslurp.emptyInbox(inboxId);
    }
}
