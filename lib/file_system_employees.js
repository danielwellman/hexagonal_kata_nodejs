const fs = require("fs");
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

    static fromCsv(path) {
        return new FileSystemEmployees(new Csv(path))
    }
}

// A minimal CSV abstraction to read a path and return the rows without any parsing.
// This is not suitable for large files as it loads the entire file contents in memory; a CSV library
// would be more appropriate for production use.
class Csv {
    constructor(path) {
        let stats = fs.statSync(path);
        if (!stats.isFile()) {
            throw 'No such file';
        }
        this.path = path;
    }

    // Return an array of arrays; the first array contains lines, the internal array contains fields
    rows() {
        let fileContents = fs.readFileSync(this.path, 'utf8');
        let lines = this.dropHeaderRow(fileContents.split(/\r?\n/));
        return lines.map(line => {
            return line.split(",").map(s => s.trim());
        });
    }

    dropHeaderRow(rows) {
        return rows.slice(1);
    }
}

module.exports = FileSystemEmployees;