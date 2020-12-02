const Repository = require('../lib/file_system_repository');
const Employee = require("../lib/employee");
const date = require("../lib/date_functions");

test('Reads a single Employee from the file system', () => {
    const actual = new Repository("__tests__/test_single_employee.csv").all();
    expect(actual).toEqual([new Employee("Angela", "Spencer", date("1980-05-25"), "angela@example.com")]);
});

test('Reads multiple Employees from the file system', () => {
    const actual = new Repository("__tests__/test_multiple_employees.csv").all();
    expect(actual).toEqual([
        new Employee("Zed", "Albatross", date("2001-01-29"), "zed@example.com"),
        new Employee("Marco", "Litman", date("1999-12-31"), "marco@example.com")
    ]);
});

test('Throws an exception on construction if the filename does not exist', () => {
    expect(() => new Repository("__tests__/this_file_does_not_exist.txt")).toThrow(/no such file/i);
});

// REFACTOR: Introduce a temp file for the tests rather than a fixed resource