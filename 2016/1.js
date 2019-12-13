const Input = require('../tools/input');

/************/
/** PART 1 **/
/************/

class You {
    constructor() {
        this.dir = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        this.x = 0;
        this.y = 0;
        this.visited = new Set();
    }

    left() {
        this.dir.push(this.dir.shift());
    }
    
    right() {
        this.dir.unshift(this.dir.pop());
    }

    step(instr, twice) {
        const change = instr.slice(0, 1);
        const steps = parseInt(instr.slice(1));

        if (change === 'L') this.left();
        if (change === 'R') this.right();

        for (let i = 0; i < steps; i++) {
            this.x += this.dir[0][0];
            this.y += this.dir[0][1];

            if (twice && this.visited.has(`${this.x},${this.y}`)) return true;
            this.visited.add(`${this.x},${this.y}`);
        }

        return false;
    }
}
  
async function part1(input) {
    const parsed = input.trim.split(', ').get;
    const you = new You();

    for (let instr of parsed) {
        you.step(instr);
    }

    return Math.abs(you.x) + Math.abs(you.y);
}

/************/
/** PART 2 **/
/************/

async function part2(input) {
    const parsed = input.trim.split(', ').get;
    const you = new You();

    for (let instr of parsed) {
        if(you.step(instr, true)) break;
    }

    return Math.abs(you.x) + Math.abs(you.y);
}


/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2016, 1).fetch();
    const input_2 = await Input(2016, 1).fetch();

    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
