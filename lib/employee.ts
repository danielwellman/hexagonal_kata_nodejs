export class Employee {
    firstName: string;
    lastName: string;
    birthDate: Date;
    email: string;

    constructor(firstName: string, lastName: string, birthDate: Date, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
    }
}