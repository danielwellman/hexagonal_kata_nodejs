export class Message {
    subject: string;
    recipient: string;
    body: string;

    constructor(subject: string, recipient: string, body: string) {
        this.subject = subject;
        this.recipient = recipient;
        this.body = body;
    }
}