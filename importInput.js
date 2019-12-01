const fs = require("fs");

module.exports = (path) => {
    return new Parse(path);
}

class Parse {
    constructor(path) {
        this.file = fs.readFileSync(path, 'utf8');
        this.result = this.file;
    }

    get trim() {
        this.result = this.result.trim();
        return this;
    }

    get lines() {
        this.result = this.result.split('\n');
        return this;
    }

    get numbers() {
        this.result = this.result.map(string => parseInt(string));
        return this;
    }

    get get() {
        return this.result;
    }
}
