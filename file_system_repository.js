const fs = require("fs");

class FileSystemRepository {
    path;

    constructor(path) {
        this.path = path;
        // ENHANCE Check the path is valid on construction?
    }

    employees() {
        return fs.readFileSync(this.path, 'utf8')
    }
}

module.exports = FileSystemRepository;