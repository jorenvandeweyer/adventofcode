const EventListener = require('events');

class Opcode {
    constructor(memory, pc) {
        this.memory = memory;
        this.pc = pc

        let value = memory[pc];

        this.value = value % 100;
        value = (value - this.value) / 100;
        this.p1 = value % 10;
        value = (value - this.p1) / 10;
        this.p2 = value % 10;
        value = (value - this.p2) / 10;
        this.p3 = value % 10;
    }



    set param1(value) {
        if (this.p1) this.memory[this.pc+1] = value;
        else this.memory[this.memory[this.pc+1]]= value;
    }
    
    set param2(value) {
        if (this.p2) this.memory[this.pc+2] = value;
        else this.memory[this.memory[this.pc+2]]= value;
    }

    set param3(value) {
        if (this.p3) this.memory[this.pc+3] = value;
        else this.memory[this.memory[this.pc+3]]= value;
    }

    get param1() {
        if (this.p1) return this.memory[this.pc+1];
        else return this.memory[this.memory[this.pc+1]];
    }

    get param2() {
        if (this.p2) return this.memory[this.pc+2];
        else return this.memory[this.memory[this.pc+2]];
    }

    get param3() {
        if (this.p3) return this.memory[this.pc+3];
        else return this.memory[this.memory[this.pc+3]];
    }
}

class IntcodeComputer extends EventListener {
    constructor(memory) {
        super();

        this.memory = memory;
        this.pc = 0;
        this.input = [];
        this.output = [];
        this.halt = false;
        this.wait = false;
    }

    step() {
        const op = new Opcode(this.memory, this.pc);

        switch (op.value) {
            case 99:
                this.halt = true;
                break;
            case 1:
                op.param3 = op.param1 + op.param2;
                this.pc += 4;
                break;
            case 2:
                op.param3 = op.param1 * op.param2;
                this.pc += 4;
                break;
            case 3:
                if (!this.input.length) {
                    this.wait = true;
                    break;
                }
                op.param1 = this.input.shift();
                this.pc += 2;
                break;
            case 4:
                this.output.push(op.param1);
                this.emit('output', op.param1);
                this.pc += 2;
                break;
            case 5: 
                if (!op.param1) {
                    this.pc += 3;
                    break;
                }
                this.pc = op.param2;
                break;
            case 6: 
                if (op.param1) {
                    this.pc += 3;
                    break;
                };
                this.pc = op.param2;
                break;
            case 7:
                op.param3 = (op.param1 < op.param2) ? 1 : 0;
                this.pc += 4;
                break;
            case 8:
                op.param3 = (op.param1 == op.param2) ? 1 : 0;
                this.pc += 4;
                break;
        }
    }

    push(input) {
        this.input.push(input);
        this.wait = false;
    }

    get ok() {
        return !this.halt && !this.wait;
    }
}

module.exports = IntcodeComputer;
