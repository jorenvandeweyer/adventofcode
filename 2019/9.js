const Input = require('../tools/input');
const IntcodeComputer = require('./code/IntcodeComputer');

/************/
/** PART 1 **/
/************/
async function part1(input) {
    const parsed = input.trim.split(',').numbers.get;
    
    const comp = new IntcodeComputer(parsed);
    comp.send(1);

    while (comp.ok) comp.step();

    return comp.output[0];
}

/************/
/** PART 2 **/
/************/

async function part2(input) {
    const parsed = input.trim.split(',').numbers.get;
    
    const comp = new IntcodeComputer(parsed);
    comp.send(2);

    while (comp.ok) comp.step();

    return comp.output[0];
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2019, 9).fetch();
    const input_2 = await Input(2019, 9).fetch();

    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
