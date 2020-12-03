const Message = require('./message');

function sameDayAndMonth(date, birthday) {
    return date.getMonth() === birthday.getMonth() &&
        date.getDate() === birthday.getDate();
}

class BirthdayService {
    constructor(employees, postOffice) {
        this.employees = employees;
        this.postOffice = postOffice;
    }

    sendGreetings(date) {
        this.employees.all().filter(employee => sameDayAndMonth(date, employee.birthDate))
            .forEach(employee => {
                const message = new Message("Happy Birthday!",
                    employee.email,
                    `Happy Birthday, dear ${employee.firstName}!`);
                this.postOffice.send(message)
            });
    }
}

module.exports = BirthdayService;