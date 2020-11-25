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

// REFACTOR introduce a method for dates to hide the JS Date class decision in the tests
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

test('Does not send an email if not a birthday', () => {
    const postOffice = new InMemoryPostOffice();
    const repository = new InMemoryEmployeeRepository();

    let notBirthday = new Employee("Not", "MyBirthday",
        oneDayAfter(today), "irrelevant@example.com");
    repository.add(notBirthday)

    const service = new BirthdayService(repository, postOffice);
    service.sendGreetings(today);

    // REFACTOR: Create a more domain-specific assertion, possibly using a Set
    expect(postOffice.sentMessages).toHaveLength(0);
});

// TEST: Sends multiple messages on the same day
// TEST: Ignores year in same date comparison

// REFACTOR: Although this is a correct day to test, it's probably not realistic test data - the year should also be different
//           ... so we'd also need a better name
function oneDayAfter(date) {
    let after = new Date(date);
    after.setDate(date.getDate + 1);
    return after;
}
