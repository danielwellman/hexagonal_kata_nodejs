import {Message} from "./message";
import {Employees} from "./employees";
import {PostOffice} from "./post_office";

function sameDayAndMonth(date: Date, birthday: Date) {
    return date.getMonth() === birthday.getMonth() &&
        date.getDate() === birthday.getDate();
}

export class BirthdayService {
    private employees: Employees;
    private postOffice: PostOffice;

    constructor(employees: Employees, postOffice: PostOffice) {
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