const fsp = require("fs").promises;
const Employee = require("./employee");

class FileSystemEmployees {
    constructor(csv) {
        this.csv = csv;
    }

    all() {
        return this.csv.rows().map(row => {
            return this.parseEmployee(row);
        })
    }

    parseEmployee(fields) {
        return new Employee(fields[0], fields[1], this.parseDate(fields[2]), fields[3]);
    }

    // Expected date format is yyyy/mm/dd
    // This simple implementation doesn't check for date format errors
    parseDate(date) {
        let fields = date.split('/');
        return new Date(fields[0], fields[1] - 1, fields[2])
    }

    static async fromCsv(path) {
        return new FileSystemEmployees(await Csv.fromPath(path));
    }
}

// A minimal CSV abstraction to read a path and return the rows without any parsing.
// This is not suitable for large files as it loads the entire file contents in memory; a CSV library
// would be more appropriate for production use.
class Csv {
    constructor(lines) {
        this.lines = lines;
    }

    // Return an array of arrays; the first array contains lines, the internal array contains fields
    rows() {
        return this.dropHeaderRow(this.lines).map(line => {
            return line.split(",").map(s => s.trim());
        });
    }

    dropHeaderRow(rows) {
        return rows.slice(1);
    }

    // All file reading happens inside this function, to put all asynchronous operations in one place
    static async fromPath(path) {
        let stats = await fsp.stat(path);
        if (!stats.isFile()) {
            throw 'No such file';
        }

        let fileContents = await fsp.readFile(path, 'utf8');
        let rows = fileContents.split(/\r?\n/);
        return new Csv(rows)
    }
}

module.exports = FileSystemEmployees;