class Message {
    subject;
    recipients;
    body;

    constructor(subject, recipients, body) {
        this.subject = subject;
        this.recipients = recipients;
        this.body = body;
    }
}

module.exports = Message