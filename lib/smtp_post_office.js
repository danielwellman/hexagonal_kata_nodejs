// An implementation of the PostOffice contract that will send an e-mail over SMTP using a library such as `nodemailer`
// Note that this not fully implemented, but provided as an example of where the e-mail sending code would live
export class SmtpPostOffice {

    constructor(settings) {
        // Configure the mail transport using the specified settings
    }

    send(message) {
        console.debug("Sending message to " + message.recipient);

        // Construct and send an e-mail over SMTP using a library such as `nodemailer`
        // In practice this would mean we would have asynchronous code which would impact
        // how the BirthdayService handles completion/failure.
        //
        // e.g.
        //
        // let result = await transporter.sendMail({
        //     from: '"Birthday Kata Robot" <birthdaybot@example.com>',
        //     to: message.recipient,
        //     subject: message.subject,
        //     text: message.body
        // });
    }
}

module.exports = SmtpPostOffice;