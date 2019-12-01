const rp = require('request-promise');
const tough = require('tough-cookie');
const fs = require('fs').promises;
const path = require('path');

require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const cookie = new tough.Cookie({
    key: "session",
    value: process.env.AOC_SESSION,
    domain: process.env.HOST,
    maxAge: 31536000
});

const cookiejar = rp.jar();
cookiejar.setCookie(cookie.cookieString(), `https://${process.env.HOST}`);

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
            this.file = await rp({
                uri: `https://${process.env.HOST}/${this.year}/day/${this.day}/input`,
                method: 'GET',
                jar: cookiejar
            });
            await this.save();
        }

        this.result = this.file;
        return this
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

module.exports = (year, day) => {
    return new Input(year, day);
}
