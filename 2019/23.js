const Input = require('../tools/input');
const Intcode = require('./code/IntcodeComputer');

/************/
/** PART 1 **/
/************/

async function part1(input) {
    const parsed = input.trim.split(',').numbers.get;

    const network = [];

    for (let i = 0; i < 50; i++) {
        network[i] = new Intcode([...parsed]);
    }

    let result = false;

    network.forEach((pc, index, network) => {
        pc.send(index);

        pc.on('output', () => {
            if (pc.output.length !== 3) return;
            const packet = pc.output.splice(0, 3);
            const address = packet.shift();
            if (address === 255) {
                result = packet[1];
                return;
            }
            network[address].send(...packet);
        });

        pc.on('input', () => {
            if (pc.input.length) return;
            pc.send(-1);
        });

        pc.on('halt', () => {
            console.log(index, 'halting...');
        })
    });

    while(!result) {
        for (let pc of network) {
            if (pc.halt) continue;
            pc.step();
        }
    }

    return result;
}

/************/
/** PART 2 **/
/************/

function idleState(network) {
    for (let pc of network) {
        if (pc.idle < 100) return false;
    }
    return true;
}

async function part2(input) {
    const parsed = input.trim.split(',').numbers.get;

    const network = [];
    let NAT = [];
    let PREVNAT = [-1, -1];

    for (let i = 0; i < 50; i++) {
        network[i] = new Intcode([...parsed]);
    }

    network.forEach((pc, index, network) => {
        pc.send(index);
        pc.idle = 0;

        pc.on('output', () => {
            if (pc.output.length !== 3) return;
            const packet = pc.output.splice(0, 3);
            const address = packet.shift();
            if (address === 255) {
                NAT = packet;
                return;
            }
            network[address].send(...packet);
            network[address].idle = 0;
            pc.idle = 0;

        });

        pc.on('input', () => {
            if (pc.input.length) return;
            pc.send(-1);
            pc.idle++;
        });

        pc.on('halt', () => {
            console.log(index, 'halting...');
        })
    });

    while(true) {
        if (idleState(network)) {
            if (NAT[1] && NAT[1] === PREVNAT[1]) return NAT[1];
            NAT[1] && (PREVNAT = NAT);
            network[0].send(...NAT);
            NAT = [-1];
        }

        for (let pc of network) {
            if (pc.halt) continue;
            pc.step();
        }
    }
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2019, 23).fetch();
    const input_2 = await Input(2019, 23).fetch();

    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
