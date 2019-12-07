const Input = require('../tools/input');
const IntcodeComputer = require('./code/IntcodeComputer');

/************/
/** PART 1 **/
/************/
async function part1(input) {
    const parsed = input.trim.split(',').numbers.get;

    const computer = new IntcodeComputer([...parsed]);

    computer.send(1);

    while (computer.ok) computer.step();

    return computer.output[computer.output.length-1];
}

/************/
/** PART 2 **/
/************/

async function part2(input) {
    const inputt = input.trim.split(',').numbers.get;

    const computer = new IntcodeComputer(inputt);

    computer.send(5);

    while (!computer.halt) computer.step();

    return computer.output[computer.output.length-1];
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2019, 5).fetch();
    const input_2 = await Input(2019, 5).fetch();
    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
