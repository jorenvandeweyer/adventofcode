const Input = require('../tools/input');
const Intcode = require('./code/IntcodeComputer');
const readline = require('readline');

async function readLine() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('', (answer) => {
            resolve(answer.split('').map(c => c.charCodeAt(0)));
            rl.close();
        });
    });
}

async function ASCII(input) {
    const parsed = input.trim.split(',').numbers.get;

    const intcode = new Intcode(parsed);

    intcode.on('output', (output) => {
        process.stdout.write(String.fromCharCode(output));
    });

    while(intcode.ok) {
        intcode.step();

        if (intcode.wait) {
            const answer = await readLine();
            intcode.send(...answer, 10);
        }
    }

    return;
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2019, 25).fetch();
    await ASCII(input_1);
}

main();
