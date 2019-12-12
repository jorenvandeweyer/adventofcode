const Input = require('../tools/input');
const crypto = require('crypto')

/************/
/** PART 1 **/
/************/

async function part1(input) {
    const id = input.trim.get;

    let pin = '';

    for (let j = 0; true; j++) {
        const hash = crypto.createHash('md5').update(id+j).digest("hex");
        if (hash.slice(0, 5) !== '00000') continue;

        pin += hash[5];

        if (pin.length === 8) break;
    }

    return pin;
}

/************/
/** PART 2 **/
/************/

async function part2(input) {
    const id = input.trim.get;

    let pin = new Array(8);

    pinLoop:
    for (let j = 0; true; j++) {
        const hash = crypto.createHash('md5').update(id+j).digest("hex");
        if (hash.slice(0, 5) !== '00000') continue;

        const pos = parseInt(hash[5]);

        if (pos >= 0 && pos < 8 && !pin[pos]) pin[pos] = hash[6];
        
        for (let i = 0; i < 8; i++) {
            if (pin[i] == undefined) continue pinLoop;
        }
        break;
    }

    return pin.join('');
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2016, 5).fetch();
    const input_2 = await Input(2016, 5).fetch();

    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
