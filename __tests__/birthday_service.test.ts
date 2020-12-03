import {Employees} from "../lib/employees";
import {PostOffice} from "../lib/post_office";
import {Message} from "../lib/message";
import {BirthdayService} from "../lib/birthday_service";
import {Employee} from "../lib/employee";
import {date} from "../lib/date_functions";

class InMemoryEmployees implements Employees {
    readonly #employees

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

class InMemoryPostOffice implements PostOffice {
    sentMessages = []

    // post office contract
    send(message) {
        this.sentMessages.push(message);
    }
}

let postOffice;
let employees;
let service;

beforeEach(() => {
    postOffice = new InMemoryPostOffice();
    employees = new InMemoryEmployees();
    service = new BirthdayService(employees, postOffice);
});


test('Sends an e-mail to one person on their birthday', () => {
    let jane = new Employee("Jane", "Simpson",
        date("1934-11-24"), "jane@example.com");
    employees.add(jane)

    service.sendGreetings(date("2020-11-24"));

    expect(postOffice.sentMessages).toEqual([
        new Message("Happy Birthday!", "jane@example.com", "Happy Birthday, dear Jane!")])
});

test('Does not send an email if not a birthday', () => {
    let notBirthday = new Employee("Not", "MyBirthday",
        date("2019-02-12"), "irrelevant@example.com");
    employees.add(notBirthday)

    service.sendGreetings(date("2020-11-24"));

    expect(postOffice.sentMessages).toHaveLength(0);
});

test('Sends e-mails for multiple people with the same birthday', () => {
    employees.add(new Employee("Jane", "Simpson",
        date("1934-11-24"), "jane@example.com"));
    employees.add(new Employee("Not", "MyBirthday",
        date("2000-11-25"), "irrelevant@example.com"));
    employees.add(new Employee("Marcus", "Aurelius",
        date("1999-11-24"), "marcus@example.com"));

    service.sendGreetings(date("2020-11-24"));

    let actual = postOffice.sentMessages.map(message => message.recipient);
    expect(actual).toEqual(["jane@example.com", "marcus@example.com"])
})