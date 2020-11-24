const BirthdayService = require('./birthday_service');
const Employee = require('./employee');
const Message = require('./message');

class InMemoryEmployeeRepository {
    constructor() {
        this.employees = [];
    }

    add(employee) {
        this.employees.push(employee);
    }
}

class InMemoryPostOffice {
    sentMessages = []

    // post office contract
    send(message) {
        this.sentMessages.push(message);
    }
}

// TODO introduce a method for dates to hide the JS Date class decision in the tests
const today = new Date("2020-11-24T00:00:00")

test('Sends an e-mail to one person on their birthday', () => {
    const postOffice = new InMemoryPostOffice();
    const repository = new InMemoryEmployeeRepository();

    let jane = new Employee("Jane", "Simpson",
        new Date("1934-11-24T00:00:00"), "jane@example.com");
    repository.add(jane)

    const service = new BirthdayService(repository, postOffice);
    service.sendGreetings(today);

    expect(postOffice.sentMessages).toEqual([
        new Message("Happy Birthday!", "jane@example.com", "Happy Birthday, dear Jane!")])
});