class Message {
    subject;
    recipient;
    body;

    constructor(subject, recipient, body) {
        this.subject = subject;
        this.recipient = recipient;
        this.body = body;
    }
}

module.exports = Message