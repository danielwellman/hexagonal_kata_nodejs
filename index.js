const BirthdayService = require("./birthday_service");
const FileSystemRepository = require("./file_system_repository");
const SmtpPostOffice = require("./smtp_post_office");

// Assemble the dependencies, using production adapters
let repository = new FileSystemRepository('input.csv');
let postOffice = new SmtpPostOffice({
    serverAddress: "some-smtp-server.example.com",
    username: "...",
    password: "..."
});
let birthdayService = new BirthdayService(repository, postOffice);

// Run on a sample date which should send a message
birthdayService.sendGreetings(new Date(2020, 9, 8));