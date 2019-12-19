const Input = require('../tools/input');
const GridMap = require('../tools/gridMap');
const crypto = require('crypto');

const dirs = [[0, 1], [0, -1], [-1, 0], [1, 0]];
const cache = new Map();

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

function moveOnMap(grid, key) {
    const copy = grid.clone();
    const [x1, y1] = copy.find('@');
    const [x2, y2] = copy.find(key);
    const coords3 = copy.find(key.toUpperCase());

    copy.set(x1, y1, '.');
    copy.set(x2, y2, '@');
    if (coords3) copy.set(coords3[0], coords3[1], '.');

    return copy;
}

function getAccesibleKeys(grid, pos=[0,0], been=new Set(), keys=new Map(), depth=1) {
    for (let dir of dirs) {
        const x = pos[0]+dir[0];
        const y = pos[1]+dir[1];
        const type = grid.get(x, y, '#');

        if (been.has(`${x},${y}`)) continue;
        if (type === '#') continue;
        been.add(`${x},${y}`);

        if (type === '.') {
            getAccesibleKeys(grid, [x, y], been, keys, depth+1);
        } else if (type === type.toUpperCase()) {
            continue;
        } else if (type === type.toLowerCase()) {
            keys.set(type, depth);
        }
    }
    return keys;
}

function findKeys(grid, keys=[], weight=0) {
    const hash = crypto.createHash('sha1').update(Array.from(grid).toString()).digest('hex');
    if (cache.has(hash)) {
        const cached = cache.get(hash);
        cached.weight + weight;
        return {
            weight: cached.weight + weight,
            keys: [...keys, ...cached.keys],
        };
    }
    // const hash2 = crypto.createHash('sha1').update(keys.slice(-2).toString()).digest('hex');


    let best = { weight: Infinity };

    const pos = grid.find('@');
    const accesibleKeys = getAccesibleKeys(grid, pos);

    if (accesibleKeys.size === 0) {
        console.log(weight, keys)
        return {weight, keys};
    }

    const keyArray = Array.from(accesibleKeys)
        // .sort((a, b) => a[1]-b[1])

    for (let [accesibleKey, steps] of keyArray) {
        const update = moveOnMap(grid, accesibleKey);
        const result = findKeys(update, [...keys, accesibleKey], weight+steps);
        if (result.weight < best.weight) {
            best = result;
        }
    }

    cache.set(hash, {
        weight: best.weight-weight,
        keys: best.keys ? best.keys.slice(keys.length): [],
    });

    return best;
}
/************/
/** PART 1 **/
/************/

async function part1(input) {
    const map = parseMap(input);

    return findKeys(map);
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
