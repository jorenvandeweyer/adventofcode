const Input = require('../tools/input');
const IntCode = require('./code/IntcodeComputer');
const GridMap = require('../tools/gridMap');

/************/
/** PART 1 **/
/************/

class Robot {
    constructor(instr) {
        this.brain = new IntCode(instr);
        this.painted = new GridMap();
        this.x = 0;
        this.y = 0;
        this.dir = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    }

    left() {
        this.dir.push(this.dir.shift());
    }

    right() {
        this.dir.unshift(this.dir.pop());
    }

    step() {
        this.brain.send(this.painted.get(this.x, this.y, 0));

        const instr = [];

        while (instr.length < 2) {
            if (!this.brain.ok) return false;
            this.brain.step();
            if (this.brain.output.length) instr.push(this.brain.recv());
        }

        this.painted.set(this.x, this.y, instr[0]);

        instr[1] ? this.left() : this.right();

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

    robot.painted.set(0, 0, 1);

    while (robot.brain.ok) {
        robot.step();
    }
    
    const string = robot.painted.toString();

    return string.replace(/0/g, ' ').replace(/1/g, '#');
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
