const BirthdayService = require('./birthday_service');
const Employee = require('./employee');
const Message = require('./message');

class InMemoryEmployeeRepository {
    #employees

    constructor() {
        this.#employees = [];
    }

    all() {
        return this.#employees;
    }

    add(employee) {
        this.#employees.push(employee);
    }
}

class InMemoryPostOffice {
    sentMessages = []

    // post office contract
    send(message) {
        this.sentMessages.push(message);
    }
}

let postOffice;
let repository;
let service;

beforeEach(() => {
    postOffice = new InMemoryPostOffice();
    repository = new InMemoryEmployeeRepository();
    service = new BirthdayService(repository, postOffice);
});


test('Sends an e-mail to one person on their birthday', () => {
    let jane = new Employee("Jane", "Simpson",
        date("1934-11-24"), "jane@example.com");
    repository.add(jane)

    service.sendGreetings(date("2020-11-24"));

    expect(postOffice.sentMessages).toEqual([
        new Message("Happy Birthday!", "jane@example.com", "Happy Birthday, dear Jane!")])
});

test('Does not send an email if not a birthday', () => {
    let notBirthday = new Employee("Not", "MyBirthday",
        date("2019-02-12"), "irrelevant@example.com");
    repository.add(notBirthday)

    service.sendGreetings(date("2020-11-24"));

    // REFACTOR: Create a more domain-specific assertion, possibly using a Set
    expect(postOffice.sentMessages).toHaveLength(0);
});

test('Sends e-mails for multiple people with the same birthday', () => {
    repository.add(new Employee("Jane", "Simpson",
        date("1934-11-24"), "jane@example.com"));
    repository.add(new Employee("Not", "MyBirthday",
        date("2000-11-25"), "irrelevant@example.com"));
    repository.add(new Employee("Marcus", "Aurelius",
        date("1999-11-24"), "marcus@example.com"));

    service.sendGreetings(date("2020-11-24"));

    let actual = postOffice.sentMessages.map(message => message.recipients);
    expect(actual).toEqual(["jane@example.com", "marcus@example.com"])
})

// TEST: Ignores year in same date comparison

function date(date) {
    return new Date(date + "T00:00:00");
}