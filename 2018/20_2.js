const getInput = require("../importInput");

class Path {
    constructor(from, dirs, id) {
        this.dirs = dirs;
        this.from = from;
        this.id = id
        this.to = [];
    }

    connect(path) {
        this.to.push(path);
    }

    get weight() {
        return this.dirs.length;
    }
}

function parse(from, string, id) {

    return path;
}

function make(string) {
    let id = 0;
    const start = new Path([], "X", id++);
    parse(start, string, id);
    return start;
}

async function main() {
    const input = (await getInput("./input_20.txt")).raw.replace("^", "").replace("$", "");
    const string = make(input);
    console.log(string.length, string);
}

main();
