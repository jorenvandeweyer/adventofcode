const Input = require('../tools/input');

/************/
/** PART 1 **/
/************/

async function part1(input) {
    const parsed = input.trim.split('').get;

    let floor = 0;

    for (let instr of parsed) {
        if (instr==='(') floor++;
        if (instr===')') floor--;
    }

    return floor;
}

/************/
/** PART 2 **/
/************/

async function part2(input) {
    const parsed = input.trim.split('').get;

    let floor = 0;

    for (let i = 0; i < parsed.length; i++) {
        if (parsed[i]==='(') floor++;
        if (parsed[i]===')') floor--;

        if (floor < 0) return i+1;
    }
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2015, 1).fetch();
    const input_2 = await Input(2015, 1).fetch();
    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
