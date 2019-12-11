const Input = require('../tools/input');

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

    const grid = new Map();

    for (let layer of layers.reverse()) {
        for (let x = 0; x < wide; x++) {
            for (let y = 0; y < tall; y ++) {
                if (layer[y][x] === 2) continue;
                grid.set(`${x},${y}`, layer[y][x]);
            }
        } 
    }

    const keys = Array.from(grid.keys()).map(coord => coord.split(',').map(num => parseInt(num)));

    const xMin = Math.min(...keys.map(coord => coord[0]));
    const yMin = Math.min(...keys.map(coord => coord[1]));
    const xMax = Math.max(...keys.map(coord => coord[0]));
    const yMax = Math.max(...keys.map(coord => coord[1]));

    let result = '';
    for (let y = yMin; y <= yMax; y++) {
        let row = '\n'
        for (let x = xMin; x <= xMax; x++) {
            row += grid.has(`${x},${y}`) ? grid.get(`${x},${y}`) : 0;
        }
        result = result + row;
    }
    return result.replace(/1/g, 'X').replace(/0/g, ' ');
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
