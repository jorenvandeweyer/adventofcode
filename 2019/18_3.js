const Input = require('../tools/input');
const GridMap = require('../tools/gridMap');

const dirs = [[0, 1], [0, -1], [-1, 0], [1, 0]];

function parseMap(input) {
    const array = input.trim.lines.map(line => line.split('')).get;
    const grid = new GridMap();

    for (let y = 0; y < array.length; y++) {
        for (let x = 0; x < array[y].length; x++) {
            grid.set(x, y, array[y][x]);
        }
    }
    return grid;
}

class Node {
    constructor(name, parent, depth) {
        this.name = name;
        this.parent = parent,
        this.depth = depth,
        this.childs = [];
    }

    get isDoor() {
        return this.name === this.name.toUpperCase();
    }

    get doors() {
        if (!this.parent) return [];
        const all = [...this.parent.doors];
        if (this.parent.isDoor) all.push(this.parent.name);
        return all;
    }
}

function createTreeNext(map, pos=[0,0], nodes=[], parent, been=new Set(), depth=1) {
    for (let dir of dirs) {
        const x = pos[0]+dir[0];
        const y = pos[1]+dir[1];
        const type = map.get(x, y, '#');

        if (been.has(`${x},${y}`)) continue;
        if (type === '#') continue;
        been.add(`${x},${y}`);

        if (type === '.') {
            createTreeNext(map, [x, y], nodes, parent, been, depth+1);
        } else {
            const node = new Node(type, parent, depth);
            nodes.push(node);
            parent.childs.push(node);
            createTreeNext(map, [x, y], nodes, node, been, depth+1);
        }
    }
    return parent;
}

function createTree(map) {
    const start = map.find('@');
    map.set(start[0], start[1], '.')
    const nodes = [];
    const parent = new Node('@', undefined, 0);
    return createTreeNext(map, start, nodes, parent);
}

/************/
/** PART 1 **/
/************/

function solve(map) {
    const tree = createTree(map);
}

async function part1(input) {
    const map = parseMap(input);
    return solve(map);
}

/************/
/** PART 2 **/
/************/

async function part2(input) {

}

/************/
/*** MAIN ***/
/************/

async function main() {
    let map1 = `########################
#...............b.C.D.f#
#.######################
#.....@.a.B.c.d.A.e.F.g#
########################`;
    let map2= `#################
#i.G..c...e..H.p#
########.########
#j.A..b...f..D.o#
########@########
#k.E..a...g..B.n#
########.########
#l.F..d...h..C.m#
#################`;
    let map3= `########################
#@..............ac.GI.b#
###d#e#f################
###A#B#C################
###g#h#i################
########################`;
    const input_1 = await Input(2019, 18, map2);
    const input_2 = await Input(2019, 18).fetch();

    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
