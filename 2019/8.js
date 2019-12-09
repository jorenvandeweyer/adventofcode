const Input = require('../tools/input');
const Grid = require('../tools/grid');

/************/
/** PART 1 **/
/************/
async function part1(input) {
    const parsed = input.trim.split('').numbers.get;
    
    const wide = 25;
    const tall = 6;

    const layers = [];

    while (parsed.length) {
        const layer = [];
        for (let i = 0; i < tall; i++) {
            layer.push(parsed.splice(0, wide));
        }
        layers.push(layer);
    }

    let zeros = Infinity;
    let product = 0;

    for (let layer of layers) {
        const zeros_layer = layer
            .reduce((line, row) => line.concat(row), [])
            .reduce((count, current) => {
                count[current]++;
                return count;
            }, [0,0,0])
        
        if (zeros_layer[0] >= zeros) continue;

        zeros = zeros_layer[0];
        product = zeros_layer[1] * zeros_layer[2];

    }

    return [zeros, product];
}

/************/
/** PART 2 **/
/************/

async function part2(input) {
    const parsed = input.trim.split('').numbers.get;
    
    const wide = 25;
    const tall = 6;

    const layers = [];

    while (parsed.length) {
        const layer = [];
        for (let i = 0; i < tall; i++) {
            layer.push(parsed.splice(0, wide));
        }
        layers.push(layer);
    }

    const grid = new Grid(wide, tall, 0);

    for (let layer of layers.reverse()) {
        for (let x = 0; x < wide; x++) {
            for (let y = 0; y < tall; y ++) {
                const value = layer[y][x];

                if (value === 2) continue;
                grid.insert(x, y, value);
            }
        }
    }

    let result = grid.toString().replace(/1/g, 'X').replace(/0/g, ' ');

    return result;
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2019, 8).fetch();
    const input_2 = await Input(2019, 8).fetch();

    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
