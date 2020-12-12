const fs = require('fs').promises;
const path = require('path');
const axios = require('axios')
const v8 = require('v8')

require('dotenv').config({path: path.resolve(__dirname, '../.env')});

class Input {
    constructor(year, day) {
        this.year = year;
        this.day = day;
        this.file = '';
        this.result = '';
    }

    get path() {
        return path.resolve(__dirname, `../${this.year}/input/${this.day}.txt`)
    }

    async save() {
        await fs.writeFile(this.path, this.file);
        return this;
    }

    async fetch() {
        try {
            this.file = await fs.readFile(this.path, 'utf-8');
        } catch(e) {
            console.log('fetching from adventofcode...\n');
            const res = await axios.default.get(`https://${process.env.HOST}/${this.year}/day/${this.day}/input`, {
                headers: {
                    Cookie: `session=${process.env.AOC_SESSION}`
                }
            })
            this.file = res.data
            await this.save();
        }

        this.result = this.file;
        return this
    }

    custom(input) {
        this.file = input;
        this.result = this.file;
        return this;
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

    get clone () {
        return v8.deserialize(v8.serialize(this.result))
    }

    split(delimeter) {
        this.result = this.result.split(delimeter);
        return this;
    }

    map(fn) {
        this.result = this.result.map(x => fn(x));
        return this;
    }

    test(fn) {
        let count = 0

        for (const x of this.result) {
            if (fn(x)) count++
        }

        return count
    }
}

module.exports = (year, day, custom=false) => {
    if (custom) return new Input(year, day).custom(custom);
    return new Input(year, day);
}
