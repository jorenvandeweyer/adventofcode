const Input = require('../tools/input');
const IntcodeComputer = require('./code/IntcodeComputer');

/************/
/** PART 1 **/
/************/
async function part1(input) {
    const parsed = input.trim.split(',').numbers.get;

    parsed[1] = 12;
    parsed[2] = 2;

    const comp = new IntcodeComputer(parsed);

    while (true) {
        if (!comp.ok) break;
        comp.step();
    }

    return comp.mem[0];
}

/************/
/** PART 2 **/
/************/

async function part2(input) {
    const parsed = input.trim.split(',').numbers.get;

    for (let first = 0; first <= 99; first++) {
        for (let second = 0; second <= 99; second++) {
            parsed[1] = first;
            parsed[2] = second;

            const comp = new IntcodeComputer([...parsed])

            while (true) {
                if (!comp.ok) break;
                comp.step();
            }

            if (comp.mem[0] === 19690720) return 100*first+second;
        }
    }
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2019, 2).fetch();
    const input_2 = await Input(2019, 2).fetch();
    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
