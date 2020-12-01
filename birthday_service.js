const Message = require('./message');

function sameDayAndMonth(date, birthday) {
    return date.getMonth() === birthday.getMonth() &&
        date.getDate() === birthday.getDate();
}

class BirthdayService {
    constructor(repository, postOffice) {
        this.repository = repository;
        this.postOffice = postOffice;
    }

    sendGreetings(date) {
        this.repository.employees.filter(employee => sameDayAndMonth(date, employee.birthDate))
            .forEach(employee => {
                const message = new Message("Happy Birthday!",
                    employee.email,
                    `Happy Birthday, dear ${employee.firstName}!`);
                this.postOffice.send(message)
            });
    }
}

module.exports = BirthdayService;