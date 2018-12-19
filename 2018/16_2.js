const getInput = require("../importInput");

function addr(register, instr) {
    const reg = register.slice();
    reg[instr[3]] = reg[instr[1]] + reg[instr[2]]; 
    return reg; 
}
function addi(register, instr) {
    const reg = register.slice();
    reg[instr[3]] = reg[instr[1]] + instr[2]; 
    return reg; 
}

function mulr(register, instr) {
    const reg = register.slice();
    reg[instr[3]] = reg[instr[1]] * reg[instr[2]]; 
    return reg; 
}
function muli(register, instr) {
    const reg = register.slice();
    reg[instr[3]] = reg[instr[1]] * instr[2]; 
    return reg; 
}

function banr(register, instr) {
    const reg = register.slice();
    reg[instr[3]] = reg[instr[1]] & reg[instr[2]]; 
    return reg; 
}
function bani(register, instr) {
    const reg = register.slice();
    reg[instr[3]] = reg[instr[1]] & instr[2]; 
    return reg; 
}

function borr(register, instr) {
    const reg = register.slice();
    reg[instr[3]] = reg[instr[1]] | reg[instr[2]]; 
    return reg; 
}
function bori(register, instr) {
    const reg = register.slice();
    reg[instr[3]] = reg[instr[1]] | instr[2]; 
    return reg; 
}

function setr(register, instr) {
    const reg = register.slice();
    reg[instr[3]] = reg[instr[1]]; 
    return reg; 
}

function seti(register, instr) {
    const reg = register.slice();
    reg[instr[3]] = instr[1]; 
    return reg; 
}

function gtir(register, instr) {
    const reg = register.slice();
    reg[instr[3]] = (instr[1] > reg[instr[2]])+0; 
    return reg; 
}
function gtri(register, instr) {
    const reg = register.slice();
    reg[instr[3]] = (reg[instr[1]] > instr[2])+0; 
    return reg; 
}
function gtrr(register, instr) {
    const reg = register.slice();
    reg[instr[3]] = (reg[instr[1]] > reg[instr[2]])+0; 
    return reg; 
}

function eqir(register, instr) {
    const reg = register.slice();
    reg[instr[3]] = (instr[1] === reg[instr[2]])+0; 
    return reg; 
}
function eqri(register, instr) {
    const reg = register.slice();
    reg[instr[3]] = (reg[instr[1]] === instr[2])+0; 
    return reg; 
}
function eqrr(register, instr) {
    const reg = register.slice();
    reg[instr[3]] = (reg[instr[1]] === reg[instr[2]])+0; 
    return reg; 
}

function equals(reg1, reg2) {
    if (reg1.length !== reg2.length) return false;
    for (let i = 0; i < reg1.length; i++) {
        if (reg1[i] !== reg2[i]) return false;
    }
    return true;
}

function test(obj) {
    let tests = [];
    equals(obj.after, addr(obj.before, obj.instr)) ? tests.push(addr):null;
    equals(obj.after, addi(obj.before, obj.instr)) ? tests.push(addi):null;
    equals(obj.after, mulr(obj.before, obj.instr)) ? tests.push(mulr):null;
    equals(obj.after, muli(obj.before, obj.instr)) ? tests.push(muli):null;
    equals(obj.after, banr(obj.before, obj.instr)) ? tests.push(banr):null;
    equals(obj.after, bani(obj.before, obj.instr)) ? tests.push(bani):null;
    equals(obj.after, borr(obj.before, obj.instr)) ? tests.push(borr):null;
    equals(obj.after, bori(obj.before, obj.instr)) ? tests.push(bori):null;
    equals(obj.after, setr(obj.before, obj.instr)) ? tests.push(setr):null;
    equals(obj.after, seti(obj.before, obj.instr)) ? tests.push(seti):null;
    equals(obj.after, gtir(obj.before, obj.instr)) ? tests.push(gtir):null;
    equals(obj.after, gtri(obj.before, obj.instr)) ? tests.push(gtri):null;
    equals(obj.after, gtrr(obj.before, obj.instr)) ? tests.push(gtrr):null;
    equals(obj.after, eqir(obj.before, obj.instr)) ? tests.push(eqir):null;
    equals(obj.after, eqri(obj.before, obj.instr)) ? tests.push(eqri):null;
    equals(obj.after, eqrr(obj.before, obj.instr)) ? tests.push(eqrr):null;
    return tests;
}


function matchInstr(tests) {
    const instr = {};
    const all = [];
    for (let i = 0; i < tests.length; i++) {
        all.push({
            ...tests[i], 
            tests: test(tests[i]),
        });
    }

    while (all.length) {
        for (let i = 0; i < all.length; i++) {
            const t = all[i];
            if (Object.keys(instr).includes(t.instr[0].toString())) {
                all.splice(i, 1);
                i--;
                continue;
            } 
            for (let j = 0; j < t.tests.length; j++) {
                if (Object.values(instr).includes(t.tests[j])) {
                    t.tests.splice(j, 1);
                }
            }
            if (t.tests.length === 1) {
                instr[t.instr[0]] = t.tests[0];
            }
        }
    }
    return instr;
}

function run(instructions, instrSet) {
    let register = new Array(4).fill(0);
    for (let i = 0; i < instructions.length; i++) {
        const instr = instructions[i];
        const op = instrSet[instr[0].toString()];
        register = op(register, instr);
    }

    return register;
}

async function main() {
    const input = (await getInput("./input_16.txt")).raw;
    const tests = input.split("\n\n\n")[0].split("\n\n").map(instr => {
        const lines = instr.split("\n");
        return {
            before: JSON.parse(lines[0].split("Before: ")[1].trim()),
            instr: lines[1].split(" ").map(num => parseInt(num)),
            after: JSON.parse(lines[2].split("After: ")[1].trim()),
        }
    });
    const instructions = input.split("\n\n\n")[1].trim().split("\n").map(line => line.split(" ").map(num => parseInt(num)));
    const instrSet = matchInstr(tests);

    const reg = run(instructions, instrSet);
    console.log(reg);
}

main();
