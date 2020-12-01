const Repository = require('./file_system_repository');
const Employee = require("./employee");

test('Reads a single Employee from the file system without a header row', () => {
    const actual = new Repository("test_single_no_header.csv").employees();
    expect(actual).toEqual(new Employee("Angela", "Spencer", date("1980-05-25"), "angela@example.com"));
});

// REFACTOR: Extract duplicate function in test cases
function date(date) {
    return new Date(date + "T00:00:00");
}

// REFACTOR: Introduce a temp file for the tests rather than a fixed resource