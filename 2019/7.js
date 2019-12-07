const Input = require('../tools/input');
const Permutations = require('../tools/permutations');
const IntcodeComputer = require('./code/IntcodeComputer');

/************/
/** PART 1 **/
/************/
async function part1(input) {
    const parsed = input.trim.split(',').numbers.get;
    
    let maxThrust = 0;

    let permutations = Permutations([0, 1, 2, 3, 4]);

    permutations.forEach((sequence) => {
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
    });

    return maxThrust;
}

/************/
/** PART 2 **/
/************/

async function part2(input) {
    const parsed = input.trim.split(',').numbers.get;
    
    let maxThrust = 0;

    let permutations = Permutations([5, 6, 7, 8, 9]);

    permutations.forEach((sequence) => {

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
    })

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
