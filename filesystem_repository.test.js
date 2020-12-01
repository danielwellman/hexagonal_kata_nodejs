const Repository = require('./file_system_repository');

test('Reads a line from the file system', () => {
    const actual = new Repository("test_input.csv").employees();
    expect(actual).toMatch(/Some text/);
});

// REFACTOR: Introduce a temp file for the tests rather than a fixed resource