const fs = require('fs');
const Input = require('../../tools/input');
const Intcode = require('./IntcodeComputer');

function disassemble(instr) {
    const intcode = new Intcode(instr);

    const parsed = [];

    while(intcode.pc < intcode.mem.length) {
        parsed.push(intcode.disassemble(250));
    }

    return parsed.map(x => x.join(' ')).join('\n');
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input = await Input(2019, 15).fetch();
    const result = disassemble(input.trim.split(',').numbers.get);
    fs.writeFileSync('./disassemble.asm', result);
}

main();
