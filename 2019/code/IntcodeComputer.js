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
        this.relativeBase = 0;
    }

    arg(n, set, disassemble=false) {
        const mode = Math.floor(this.mem[this.pc] / 10**(n+1)) % 10;

        if (set !== undefined) {
            if (mode === 0) this.mem[this.mem[this.pc+n]] = set;
            if (mode === 1) this.mem[this.pc+n] = set;
            if (mode === 2) this.mem[this.mem[this.pc+n] + this.relativeBase] = set;
        }

        if (disassemble) {
            if (mode === 0) return `*(${this.mem[this.pc+n]})`;
            if (mode === 1) return `${this.mem[this.pc+n]}`;
            if (mode === 2) return `*(${this.mem[this.pc+n]}+BASE) (${this.relativeBase})`;
        }

        let value = 0;
        if (mode === 0) value = this.mem[this.mem[this.pc+n]];
        if (mode === 1) value = this.mem[this.pc+n];
        if (mode === 2) value = this.mem[this.mem[this.pc+n] + this.relativeBase];
        if (value === undefined) value = 0;

        return value;
    }

    send(...input) {
        this.input.push(...input);
        this.wait = false;
    }

    recv() {
        return this.output.shift();
    }

    argd(n) {
        return this.arg(n, undefined, true);
    }

    disassemble(limit) {
        let op = this.mem[this.pc] % 100;
        const readable = [this.pc+':\t'];
        if (limit < this.pc) op = 98;

        switch (op) {
            case 1:
                readable.push('ADD', this.argd(3), this.argd(1), this.argd(2));
                this.pc += 4;
                break;
            case 2:
                readable.push('MUL', this.argd(3), this.argd(1), this.argd(2));
                this.pc += 4;
                break;
            case 3:
                readable.push('IN ', this.argd(1));
                this.pc += 2;
                break;
            case 4:
                readable.push('OUT', this.argd(1));
                this.pc += 2;
                break;
            case 5:
                readable.push('JE ', this.argd(1), this.argd(2));
                this.pc += 3;
                break;
            case 6:
                readable.push('JNE', this.argd(1), this.argd(2));
                this.pc += 3;
                break;
            case 7:
                readable.push('LE ', this.argd(3), this.argd(1), this.argd(2));
                this.pc += 4;
                break;
            case 8:
                readable.push('EQ ', this.argd(3), this.argd(1), this.argd(2));
                this.pc += 4;
                break;
            case 9:
                readable.push('BAS', this.argd(1));
                this.pc += 2;
            case 99:
                readable.push('HLT');
                this.pc += 1;
                break;
            default:
                readable.push('MEM', ['$', this.mem[this.pc]]);
                this.pc += 1;
        }

        return readable;
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
                this.emit('input');
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
            case 9:
                this.relativeBase += this.arg(1);
                this.pc += 2;
                break;
            case 99:
                this.halt = true;
                this.emit('halt');
                break;
        }
    }

    get ok() {
        return !this.halt && !this.wait;
    }
}

module.exports = IntcodeComputer;
