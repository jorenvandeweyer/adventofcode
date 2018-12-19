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
    let tests = 0;
    tests += equals(obj.after, addr(obj.before, obj.instr));
    tests += equals(obj.after, addi(obj.before, obj.instr));
    tests += equals(obj.after, mulr(obj.before, obj.instr));
    tests += equals(obj.after, muli(obj.before, obj.instr));
    tests += equals(obj.after, banr(obj.before, obj.instr));
    tests += equals(obj.after, bani(obj.before, obj.instr));
    tests += equals(obj.after, borr(obj.before, obj.instr));
    tests += equals(obj.after, bori(obj.before, obj.instr));
    tests += equals(obj.after, setr(obj.before, obj.instr));
    tests += equals(obj.after, seti(obj.before, obj.instr));
    tests += equals(obj.after, gtir(obj.before, obj.instr));
    tests += equals(obj.after, gtri(obj.before, obj.instr));
    tests += equals(obj.after, gtrr(obj.before, obj.instr));
    tests += equals(obj.after, eqir(obj.before, obj.instr));
    tests += equals(obj.after, eqri(obj.before, obj.instr));
    tests += equals(obj.after, eqrr(obj.before, obj.instr));
    return tests >= 3;
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
    const instructions = input.split("\n\n\n")[1];
    
    let sum = 0;

    for (let i = 0; i < tests.length; i++) {
        sum+= test(tests[i]);
        console.log(sum, i);
    }
    console.log(sum);
}

main();
