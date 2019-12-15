const Input = require('../tools/input');

function createPixels(input) {
    const parsed = input.trim.lines.map(line => line.split(' ')).get;
    const wide = 50;
    const tall = 6;

    const screen = new Array(tall);

    for (let i = 0; i < screen.length; i++) {
        screen[i] = new Array(wide).fill(0);
    }

    for (let instr of parsed) {
        if (instr[0] === 'rect') {
            const [x, y] = instr[1].split('x').map(num => parseInt(num));

            for (let i = 0; i < x; i++) {
                for (let j = 0; j < y; j++) {
                    screen[j][i] = 1;
                }
            }
        } else if (instr[0] === 'rotate' && instr[1] === 'row') {
            const row = parseInt(instr[2].slice(2));

            for (let i = 0; i < parseInt(instr[4]); i++) {
                const last = screen[row][wide-1];
                for (let j = wide-1; j > 0; j--) {
                    screen[row][j] = screen[row][j-1];
                }
                screen[row][0] = last;
            }

        } else if (instr[0] === 'rotate' && instr[1] === 'column') {
            const column = parseInt(instr[2].slice(2));

            for (let i = 0; i < parseInt(instr[4]); i++) {
                const last = screen[tall-1][column];
                for (let j = tall-1; j > 0; j--) {
                    screen[j][column] = screen[j-1][column];
                }
                screen[0][column] = last;
            }
        }

    }
    
    return screen;
}

/************/
/** PART 1 **/
/************/

async function part1(pixels) {
    return pixels.flatMap(x => x).reduce((sum, cur) => cur + sum, 0);
}

/************/
/** PART 2 **/
/************/

async function part2(pixels) {
    return '\n' + pixels.map(row => row.join('')).join('\n').replace(/0/g, ' ').replace(/1/g, 'X');
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2016, 8).fetch();
    const pixels = await createPixels(input_1);

    await part1(pixels).then(result => console.log('result 1:', result));
    await part2(pixels).then(result => console.log('result 2:', result));    
}

main();
