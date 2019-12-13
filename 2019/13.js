const Input = require('../tools/input');
const IntCode = require('./code/IntcodeComputer');
const GridMap = require('../tools/gridMap');

/************/
/** PART 1 **/
/************/

async function part1(input) {
    const parsed = input.trim.split(',').numbers.get;
    const intCode = new IntCode(parsed);

    const grid = new GridMap();

    while (intCode.ok) {
        intCode.step();

        if (intCode.output.length === 3) {
            const instr = intCode.output.splice(0, 3);
            grid.set(instr[0], instr[1], instr[2]);
        }
    }

    return Array.from(grid).reduce((sum, cell) => {
        return (cell[1] === 2) ? sum+1 : sum;
    }, 0);
}

/************/
/** PART 2 **/
/************/

async function part2(input, base) {
    const parsed = input.trim.split(',').numbers.get;
    parsed[0] = 2;

    const intCode = new IntCode(parsed);
    const grid = new GridMap();

    let score = 0;

    while (intCode.ok) {
        intCode.step();

        if (intCode.wait) {
            const bal = Array.from(grid).find(value => value[1] === 4)[0].split(',').map(x => parseInt(x));
            const pad = Array.from(grid).find(value => value[1] === 3)[0].split(',').map(x => parseInt(x));

            if (bal[0] === pad[0]) intCode.send(0);
            if (bal[0] < pad[0]) intCode.send(-1);
            if (bal[0] > pad[0]) intCode.send(1);
        }

        if (intCode.output.length === 3) {
            const instr = intCode.output.splice(0, 3);

            if (instr[0] === -1 && instr[1] === 0) {
                score = instr[2];
            } else {
                grid.set(instr[0], instr[1], instr[2]);
            }
        }
    }

    return score;
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2019, 13).fetch();
    const input_2 = await Input(2019, 13).fetch();

    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
