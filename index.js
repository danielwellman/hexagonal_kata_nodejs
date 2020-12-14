const BirthdayService = require("./lib/birthday_service");
const FileSystemEmployees = require("./lib/file_system_employees");
const SmtpPostOffice = require("./lib/smtp_post_office");

// Assemble the dependencies, using production adapters
let employees = FileSystemEmployees.fromCsv('employees_sample.csv');
let postOffice = new SmtpPostOffice({
    serverAddress: "some-smtp-server.example.com",
    username: "...",
    password: "..."
});
let birthdayService = new BirthdayService(employees, postOffice);

// Run on a sample date which should send a message
birthdayService.sendGreetings(new Date(2020, 9, 8));