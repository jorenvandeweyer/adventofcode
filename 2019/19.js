const Input = require('../tools/input');
const GridMap = require('../tools/gridMap');
const Intcode = require('./code/IntcodeComputer');

/************/
/** PART 1 **/
/************/

async function part1(input) {
    const parsed = input.trim.split(',').numbers.get;

    const size = [50, 50];
    let result = 0;

    const grid = new GridMap();
    for (let x = 0; x < size[0]; x++) {
        for (let y = 0; y < size[1]; y++) {
            const intcode = new Intcode([...parsed]);
            intcode.send(x, y);

            intcode.on('output', output => {
                output && result++;
                grid.set(x, y, output);
            });
            while (intcode.ok) {
                intcode.step();
            }
        }
    }

    return result;
}

/************/
/** PART 2 **/
/************/

function fitsShip(grid, start, size) {
    for (let x = start.x; x < start.x+size.x; x++) {
        if (!grid.get(x, start.y, 0)) return false; 
    }

    for (let y = start.y; y < start.y+size.y; y++) {
        if (!grid.get(start.x, y, 0)) return false;
    }

    return true;
}

async function part2(input) {
    const parsed = input.trim.split(',').numbers.get;

    const start = [850, 1050];
    const size = [1000, 1200];

    const grid = new GridMap();

    for (let x = start[0]; x < size[0]; x++) {
        for (let y = start[1]; y < size[1]; y++) {
            const intcode = new Intcode([...parsed]);
            intcode.send(x, y);

            intcode.on('output', output => {
                grid.set(x, y, output);
            });
            while (intcode.ok) {
                intcode.step();
            }
            
        }
    }
    for (let y = start[1]; y < size[1]; y++) {
        for (let x = start[0]; x < size[0]; x++) {
            if (fitsShip(grid, {x, y}, {x: 100, y: 100})) {
                return 10000*x+y
            };
        }
    }

    return false;
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2019, 19).fetch();
    const input_2 = await Input(2019, 19).fetch();

    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
