const EventListener = require('events');

class IntcodeComputer extends EventListener {
    constructor(mem) {
        super();

        this.mem = mem;
        this.pc = 0;
        this.input = [];
        this.output = [];
        this.halt = false;
        this.wait = false;
    }

    arg(n, set) {
        const mode = Math.floor(this.mem[this.pc] / 10**(n+1)) % 10;
        if (set) mode ? this.mem[this.pc+n] = set : this.mem[this.mem[this.pc+n]] = set;
        return mode ? this.mem[this.pc+n] : this.mem[this.mem[this.pc+n]];
    }

    send(...input) {
        this.input.push(...input);
        this.wait = false;
    }

    get() {
        return 
    }

    step() {
        const op = this.mem[this.pc] % 100;

        switch (op) {
            case 1:
                this.arg(3, this.arg(1) + this.arg(2));
                this.pc += 4;
                break;
            case 2:
                this.arg(3, this.arg(1) * this.arg(2));
                this.pc += 4;
                break;
            case 3:
                if (!this.input.length) {
                    this.wait = true;
                    break;
                }
                this.arg(1, this.input.shift());
                this.pc += 2;
                break;
            case 4:
                this.output.push(this.arg(1));
                this.emit('output', this.arg(1));
                this.pc += 2;
                break;
            case 5: 
                if (!this.arg(1)) {
                    this.pc += 3;
                    break;
                }
                this.pc = this.arg(2);
                break;
            case 6: 
                if (this.arg(1)) {
                    this.pc += 3;
                    break;
                };
                this.pc = this.arg(2);
                break;
            case 7:
                this.arg(3, (this.arg(1) < this.arg(2)) ? 1 : 0);
                this.pc += 4;
                break;
            case 8:
                this.arg(3, (this.arg(1) == this.arg(2)) ? 1 : 0);
                this.pc += 4;
                break;
            case 99:
                this.halt = true;
                break;
        }
    }

    get ok() {
        return !this.halt && !this.wait;
    }
}

module.exports = IntcodeComputer;
