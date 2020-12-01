const fs = require("fs");
const Employee = require("./employee");

class FileSystemRepository {
    path;

    constructor(path) {
        this.path = path;
        // ENHANCE Check the path is valid on construction?
    }

    employees() {
        let fileContents = fs.readFileSync(this.path, 'utf8');
        let lines = this.dropHeaderRow(fileContents.split(/\r?\n/));
        return lines.map(line => {
            return this.parseEmployee(line);
        });
    }

    dropHeaderRow(rows) {
        return rows.slice(1);
    }

    parseEmployee(line) {
        let fields = line.split(",").map(s => s.trim());
        return new Employee(fields[0], fields[1], this.parseDate(fields[2]), fields[3]);
    }

    // Expected date format is yyyy/mm/dd
    // This simple implementation doesn't check for date format errors
    parseDate(date) {
        let fields = date.split('/');
        return new Date(fields[0], fields[1] - 1, fields[2])
    }
}

module.exports = FileSystemRepository;