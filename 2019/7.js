const Input = require('../tools/input');
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
/************/
/** PART 1 **/
/************/
async function part1(input) {
    const parsed = input.trim.split(',').numbers.get;
    
    let maxThrust = 0;

    let range = [0, 4]
    for (let first = range[0]; first <= range[1]; first++) {
        for (let second = range[0]; second <= range[1]; second++) {
            let sequence = [first];
            if (sequence.includes(second)) continue;
            for (let third = range[0]; third <= range[1]; third++) {
                sequence = [first, second];
                if (sequence.includes(third)) continue;
                for (let fourth = range[0]; fourth <= range[1]; fourth++) {
                    sequence = [first, second, third];
                    if (sequence.includes(fourth)) continue;
                    for (let fifth = range[0]; fifth <= range[1]; fifth++) {
                        sequence = [first, second, third, fourth];
                        if (sequence.includes(fifth)) continue;
                        sequence = [first, second, third, fourth, fifth];

                        const ampA = new IntcodeComputer([...parsed]);
                        const ampB = new IntcodeComputer([...parsed]);
                        const ampC = new IntcodeComputer([...parsed]);
                        const ampD = new IntcodeComputer([...parsed]);
                        const ampE = new IntcodeComputer([...parsed]);

                        ampA.input.push(sequence[0], 0);
                        ampB.input.push(sequence[1]);
                        ampC.input.push(sequence[2]);
                        ampD.input.push(sequence[3]);
                        ampE.input.push(sequence[4]);

                        ampA.addListener('output', output => ampB.push(output));
                        ampB.addListener('output', output => ampC.push(output));
                        ampC.addListener('output', output => ampD.push(output));
                        ampD.addListener('output', output => ampE.push(output));

                        while (true) {
                            if (!ampA.ok && !ampB.ok && !ampC.ok && !ampD.ok && !ampE.ok) break;
                            if (ampA.ok) ampA.step();
                            if (ampB.ok) ampB.step();
                            if (ampC.ok) ampC.step();
                            if (ampD.ok) ampD.step();
                            if (ampE.ok) ampE.step();
                        }

                        const lastOutput = ampE.output[ampE.output.length-1];
                        if (lastOutput > maxThrust) maxThrust = lastOutput;
                    }
                }
            }
        }
    }

    return maxThrust;
}

/************/
/** PART 2 **/
/************/

async function part2(input) {
    const parsed = input.trim.split(',').numbers.get;
    
    let maxThrust = 0;

    let range = [5, 9]
    for (let first = range[0]; first <= range[1]; first++) {
        for (let second = range[0]; second <= range[1]; second++) {
            let sequence = [first];
            if (sequence.includes(second)) continue;
            for (let third = range[0]; third <= range[1]; third++) {
                sequence = [first, second];
                if (sequence.includes(third)) continue;
                for (let fourth = range[0]; fourth <= range[1]; fourth++) {
                    sequence = [first, second, third];
                    if (sequence.includes(fourth)) continue;
                    for (let fifth = range[0]; fifth <= range[1]; fifth++) {
                        sequence = [first, second, third, fourth];
                        if (sequence.includes(fifth)) continue;
                        sequence = [first, second, third, fourth, fifth];

                        const ampA = new IntcodeComputer([...parsed]);
                        const ampB = new IntcodeComputer([...parsed]);
                        const ampC = new IntcodeComputer([...parsed]);
                        const ampD = new IntcodeComputer([...parsed]);
                        const ampE = new IntcodeComputer([...parsed]);

                        ampA.input.push(sequence[0], 0);
                        ampB.input.push(sequence[1]);
                        ampC.input.push(sequence[2]);
                        ampD.input.push(sequence[3]);
                        ampE.input.push(sequence[4]);

                        ampA.addListener('output', output => ampB.push(output));
                        ampB.addListener('output', output => ampC.push(output));
                        ampC.addListener('output', output => ampD.push(output));
                        ampD.addListener('output', output => ampE.push(output));
                        ampE.addListener('output', output => ampA.push(output));

                        while (true) {
                            if (!ampA.ok && !ampB.ok && !ampC.ok && !ampD.ok && !ampE.ok) break;
                            if (ampA.ok) ampA.step();
                            if (ampB.ok) ampB.step();
                            if (ampC.ok) ampC.step();
                            if (ampD.ok) ampD.step();
                            if (ampE.ok) ampE.step();
                        }

                        const lastOutput = ampE.output[ampE.output.length-1];
                        if (lastOutput > maxThrust) maxThrust = lastOutput;
                    }
                }
            }
        }
    }

    return maxThrust;
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2019, 7).fetch();
    const input_2 = await Input(2019, 7).fetch();

    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
