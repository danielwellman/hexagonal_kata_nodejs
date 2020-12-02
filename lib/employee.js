class Employee {
    firstName;
    lastName;
    birthDate;
    email;

    constructor(firstName, lastName, birthDate, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
    }
}

module.exports = Employee;