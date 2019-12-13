const Input = require('../tools/input');

/************/
/** PART 1 **/
/************/

async function part1(input) {
    const parsed = input.trim.lines.get;
    
    const arr = [];

    for (let i = 0; i < parsed.length; i++) {
        for (let j = 0; j < parsed[i].length; j++) {
            if (!arr[j]) arr[j] = {};
            if (!arr[j][parsed[i][j]]) arr[j][parsed[i][j]] = 0;
            arr[j][parsed[i][j]]++;
        }
    }

    return arr.map(letters => Object.entries(letters).reduce((most, cur) => most[1] > cur[1] ? most : cur, [0, 0])[0]).join('');
}

/************/
/** PART 2 **/
/************/

async function part2(input) {
    const parsed = input.trim.lines.get;
    
    const arr = [];

    for (let i = 0; i < parsed.length; i++) {
        for (let j = 0; j < parsed[i].length; j++) {
            if (!arr[j]) arr[j] = {};
            if (!arr[j][parsed[i][j]]) arr[j][parsed[i][j]] = 0;
            arr[j][parsed[i][j]]++;
        }
    }

    return arr.map(letters => Object.entries(letters).reduce((most, cur) => most[1] < cur[1] ? most : cur, [0, Infinity])[0]).join('');
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2016, 6).fetch();
    const input_2 = await Input(2016, 6).fetch();

    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
