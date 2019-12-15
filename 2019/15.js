const Input = require('../tools/input');
const GridMap = require('../tools/gridMap');
const Intcode = require('./code/IntcodeComputer');

class Dir {
    constructor() {
        this.dir = [{
            instr: 1, //NORTH
            d: [0, 1],
        }, {
            instr: 4, // EAST
            d: [1, 0],
        }, {
            instr: 2, //SOUTH
            d: [0, -1],
        }, {
            instr: 3, //WEST
            d: [-1, 0],
        }]
    }

    right() {
        this.dir.push(this.dir.shift());
    }

    left() {
        this.dir.unshift(this.dir.pop());
    }

    get instr() {
        return this.dir[0].instr;
    }

    get d() {
        return this.dir[0].d;
    }
}

const Types = {
    wall: '#',
    path: '.',
    oxyg: 'O',
};

const dirs = [[0, 1], [0, -1], [-1, 0], [1, 0]];

function explore(input) {
    const parsed = input.trim.split(',').numbers.get;
    const intcode = new Intcode(parsed);
    const grid = new GridMap();

    const dir = new Dir();
    const pos = [0, 0];

    let found = false;

    intcode.on('output', (response) => {
        switch (response) {
            case 0:
                grid.set(pos[0] + dir.d[0], pos[1] + dir.d[1], Types.wall);
                dir.left();
                break;
            case 1:
                pos[0] += dir.d[0];
                pos[1] += dir.d[1];
                grid.set(pos[0], pos[1], Types.path)
                dir.right();
                break;
            case 2:
                pos[0] += dir.d[0];
                pos[1] += dir.d[1];
                grid.set(pos[0], pos[1], Types.oxyg);
                grid.set(0, 0, 'S');
                if (found) intcode.send(0);
                found = true;
                break;
            default:
                break;
        }
    });

    while (!intcode.halt) {
        intcode.step();
        if (intcode.wait) {
            intcode.send(dir.instr);
        }
    }

    return grid;
}

function findOxygen(map, place=[0,0], been=new Set(), depth=1) {
    for (let dir of dirs) {
        const x = place[0]+dir[0];
        const y = place[1]+dir[1];
        const type = map.get(x, y, Types.wall);
        if (been.has(`${x},${y}`)) continue;
        if (type === Types.wall) continue;
        if (type === Types.oxyg) return depth;
        been.add(`${x},${y}`);
        const found = findOxygen(map, [x, y], been, depth+1);
        if (found) return found;
    }
    return false;
}

function fillOxygen(map, place=[0,0], depth=0) {
    map.set(place[0], place[1], Types.oxyg);

    let deepest = depth;

    for (let dir of dirs) {
        const x = place[0]+dir[0];
        const y = place[1]+dir[1];
        const type = map.get(x, y, Types.wall);
        if (type === Types.wall) continue;
        if (type === Types.oxyg) continue;
        const result = fillOxygen(map, [x, y], depth+1);
        if (result > deepest) deepest = result;
    }

    return deepest;
}

/************/
/** PART 1 **/
/************/

async function part1(map) {
    return findOxygen(map);
}

/************/
/** PART 2 **/
/************/

async function part2(map) {
    const oxygen = Array.from(map).find(([coord, type]) => type === Types.oxyg)[0].split(',').map(x => parseInt(x));
    return fillOxygen(map, oxygen);
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input = await Input(2019, 15).fetch();
    const map = explore(input);
    console.log(map.toString())

    await part1(map).then(result => console.log('result 1:', result));
    await part2(map).then(result => console.log('result 2:', result));    
}

main();
