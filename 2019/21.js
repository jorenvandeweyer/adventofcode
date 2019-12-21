const Input = require('../tools/input');
const Intcode = require('./code/IntcodeComputer');

async function ASCII(input, program) {
    const parsed = input.trim.split(',').numbers.get;

    const intcode = new Intcode(parsed);

    intcode.on('output', (output) => {
        if (output > 300) console.log(output);
        process.stdout.write(String.fromCharCode(output));
    });


    intcode.send(...program.split('').map(char => char.charCodeAt(0)))

    while(intcode.ok) {
        intcode.step();
    }

    return;
}

/************/
/** PART 1 **/
/************/

const program1 = `NOT A J
NOT B T
OR T J
NOT C T
OR T J
AND D J
WALK\n`;

/************/
/** PART 2 **/
/************/

const program2 = `NOT A J
NOT B T
OR T J
NOT C T
OR T J
AND D J
NOT E T
AND H T
OR E T
AND T J
RUN\n`;

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2019, 21).fetch();
    const input_2 = await Input(2019, 21).fetch();

    console.log('result 1:', await ASCII(input_1, program1));
    console.log('result 2:', await ASCII(input_2, program2));    
}

main();
