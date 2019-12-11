const Input = require('../tools/input');
const IntCode = require('./code/IntcodeComputer');

/************/
/** PART 1 **/
/************/

class Robot {
    constructor(instr) {
        this.brain = new IntCode(instr);
        this.painted = new Map();
        this.x = 0;
        this.y = 0;
        this.dir = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    }

    color(x, y) {
        return this.painted.has(`${x},${y}`) ? this.painted.get(`${x},${y}`) : 0
    }

    step() {
        this.brain.send(this.color(this.x, this.y));

        const instr = [];

        while (instr.length < 2) {
            if (!this.brain.ok) return false;
            this.brain.step();
            if (this.brain.output.length) instr.push(this.brain.recv());
        }

        this.painted.set(`${this.x},${this.y}`, instr[0]);

        if (instr[1]) {
            this.dir.push(this.dir.shift());
        } else {
            this.dir.unshift(this.dir.pop());
        }

        this.x += this.dir[0][0];
        this.y += this.dir[0][1];    
    }
}

async function part1(input) {
    const parsed = input.trim.split(',').numbers.get;

    const robot = new Robot(parsed);

    while (robot.brain.ok) {
        robot.step();
    }
    
    return robot.painted.size;
}

/************/
/** PART 2 **/
/************/

async function part2(input, base) {
    const parsed = input.trim.split(',').numbers.get;

    const robot = new Robot(parsed);

    robot.painted.set('0,0', 1);

    while (robot.brain.ok) {
        robot.step();
    }
    
    const keys = Array.from(robot.painted.keys()).map(coord => coord.split(',').map(num => parseInt(num)));

    const xMin = Math.min(...keys.map(coord => coord[0]));
    const yMin = Math.min(...keys.map(coord => coord[1]));
    const xMax = Math.max(...keys.map(coord => coord[0]));
    const yMax = Math.max(...keys.map(coord => coord[1]));

    let result = '';
    for (let y = yMin; y <= yMax; y++) {
        let row = '\n'
        for (let x = xMin; x <= xMax; x++) {
            row += robot.color(x, y);
        }
        result = row + result;
    }

    return result.replace(/0/g, '.').replace(/1/g, '#');
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2019, 11).fetch();
    const input_2 = await Input(2019, 11).fetch();

    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
