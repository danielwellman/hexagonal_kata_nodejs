const Message = require('./message');

class BirthdayService {
    constructor(repository, postOffice) {
        this.repository = repository;
        this.postOffice = postOffice;
    }

    sendGreetings(date) {
        let employees = [this.repository.employees[0]];
        employees.forEach(employee => {
            const message = new Message("Happy Birthday!",
                employee.email,
                `Happy Birthday, dear ${employee.firstName}!`);
            this.postOffice.send(message)
        });
    }

}

module.exports = BirthdayService;