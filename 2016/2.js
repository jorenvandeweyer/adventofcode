const Input = require('../tools/input');

const dirs = {
    'U': { x:  0, y: -1 },
    'D': { x:  0, y:  1 },
    'L': { x: -1, y:  0 },
    'R': { x:  1, y:  0 },
};

function getButton(keyPad, string, pos) {
    for (let i = 0; i < string.length; i++) {
        const dir = dirs[string[i]];
        if (!keyPad[pos.y+dir.y] || !keyPad[pos.y+dir.y][pos.x+dir.x]) continue;
        pos.x += dir.x;
        pos.y += dir.y;
    }
    return keyPad[pos.y][pos.x]
}

/************/
/** PART 1 **/
/************/

async function part1(input) {
    const parsed = input.trim.lines.get;

    const keyPad = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    
    return parsed.map(string => getButton(keyPad, string, {x: 1, y: 1}));
}

/************/
/** PART 2 **/
/************/

async function part2(input) {
    const parsed = input.trim.lines.get;
    
    const keyPad = [
        [null, null, 1, null, null],
        [null, 2, 3, 4, null],
        [5, 6, 7, 8, 9],
        [null, "A", "B", "C", null],
        [null, null, "D", null, null]
    ];

    return parsed.map(string => getButton(keyPad, string, {x: 1, y: 1}));
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2016, 2).fetch();
    const input_2 = await Input(2016, 2).fetch();

    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
