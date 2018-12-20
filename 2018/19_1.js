const getInput = require("../importInput");

class Machine {
    constructor(ip, instructions) {
        this.reg = new Array(6).fill(0);
        this.ip = ip;
        this.instructions = instructions;
        console.log(this.reg);
    }

    run() {
        let i = 0;
        while (this.pc < this.instructions.length) {
            this[this.instr[0]]();
            this.pc++;
            i++;
        } 
        this.pc--;
    }

    addr() {
        this.reg[this.instr[3]] = this.reg[this.instr[1]] + this.reg[this.instr[2]];
    }
    addi() {
        this.reg[this.instr[3]] = this.reg[this.instr[1]] + this.instr[2];
    }

    mulr() {
        this.reg[this.instr[3]] = this.reg[this.instr[1]] * this.reg[this.instr[2]];
    }
    muli() {
        this.reg[this.instr[3]] = this.reg[this.instr[1]] * this.instr[2];        
    }

    banr() {
        this.reg[this.instr[3]] = this.reg[this.instr[1]] & this.reg[this.instr[2]];
    }
    bani() {
        this.reg[this.instr[3]] = this.reg[this.instr[1]] & this.instr[2];        
    }

    borr() {
        this.reg[this.instr[3]] = this.reg[this.instr[1]] | this.reg[this.instr[2]];
    }
    bori() {
        this.reg[this.instr[3]] = this.reg[this.instr[1]] | this.instr[2];        
    }

    setr() {
        this.reg[this.instr[3]] = this.reg[this.instr[1]];
    }
    seti() {
        this.reg[this.instr[3]] = this.instr[1];
    }

    gtir() {
        this.reg[this.instr[3]] = (this.instr[1] > this.reg[this.instr[2]])+0;
    }
    gtri() {
        this.reg[this.instr[3]] = (this.reg[this.instr[1]] > this.instr[2])+0;
    }
    gtrr() {
        this.reg[this.instr[3]] = (this.reg[this.instr[1]] > this.reg[this.instr[2]])+0;
    }

    eqir() {
        this.reg[this.instr[3]] = (this.instr[1] === this.reg[this.instr[2]])+0;
    }
    eqri() {
        this.reg[this.instr[3]] = (this.reg[this.instr[1]] === this.instr[2])+0;
    }
    eqrr() {
        this.reg[this.instr[3]] = (this.reg[this.instr[1]] === this.reg[this.instr[2]])+0;
    }
    get pc() {
        return this.reg[this.ip];
    }
    set pc(value) {
        this.reg[this.ip] = value;
    }

    next() {
        return this.reg[this.ip]++;
    }

    get instr() {
        return this.instructions[this.pc];
    }
}

async function main() {
    const input = (await getInput("./input_19.txt")).lines;
    const ip = parseInt(input.shift().split(" ")[1]);
    console.log(input);
    const instructions = input.map(line => line.split(" ").map((instr, i) => {
        if (i===0) return instr;
        return parseInt(instr);
    }))

    const machine = new Machine(ip, instructions);

    machine.run();

    console.log(machine);
}

main();
