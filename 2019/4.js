const Input = require('../tools/input');

/************/
/** PART 1 **/
/************/

async function part1(range) {
    let matches = 0;

    numberLoop:
    for (let number = range[0]; number <= range[1]; number++) {
        let adjacent = false;

        const explode = number.toString().split('').map(x => parseInt(x));

        for (let i = 0; i < explode.length -1; i++) {
            if (explode[i] > explode[i+1]) continue numberLoop;
            if (explode[i] === explode[i+1]) adjacent = true;
        }

        if (adjacent) matches++;
    }

    return matches;
}

/************/
/** PART 2 **/
/************/

async function part2(range) {
    let matches = 0;

    numberLoop:
    for (let number = range[0]; number <= range[1]; number++) {
        let adjacent_anyways = false;
        let adjacent = false;
        let adjacent_value = -1;

        const explode = number.toString().split('').map(x => parseInt(x));

        for (let i = 0; i < explode.length -1; i++) {
            if (explode[i] > explode[i+1]) continue numberLoop;
            if (adjacent && explode[i] !== explode[i+1]) adjacent_anyways = true;
            if (adjacent && explode[i] === explode[i+1]) adjacent = false;
            if (explode[i] === explode[i+1] && adjacent_value !== explode[i]) adjacent = true, adjacent_value = explode[i];
            if (explode[i] !== explode[i+1]) adjacent_current = false;
        }

        if (adjacent_anyways || adjacent) matches++;
    }

    return matches;
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input = await Input(2019, 4).fetch();
    const range = input.trim.split('-').get.map(x => parseInt(x));


    await part1(range).then(result => console.log('result 1:', result));
    await part2(range).then(result => console.log('result 2:', result));    
}

main();
