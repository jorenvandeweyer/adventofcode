const Input = require('../tools/input');

/************/
/** PART 1 **/
/************/

function adjentBugs(grid, x, y) {
    let sum = 0;

    [[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(dir => {
        if (!grid[y+dir[1]]) return;
        const value = grid[y+dir[1]][x+dir[0]];
        if (value === '#') sum++;
    });

    return sum;
}

function bioDiversity(grid) {
    let bio = 0;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] !== '#') continue;
            bio += 2**(y*5+x);
        }
    }

    return bio;
}

async function part1(input) {
    let grid = input.trim.lines.map(line => line.split('')).get;
    const bio = new Set();

    bio.add(bioDiversity(grid));

    while (true) {
        grid = grid.map((row, y, grid) => {
            return row.map((value, x) => {
                const adj = adjentBugs(grid, x, y);

                if (value === '#') 
                    return (adj === 1) ? '#' : '.';
                if (value === '.')
                    return (adj === 1 || adj === 2) ? '#' : '.';
            });
        });
        const biod = bioDiversity(grid);
        if (bio.has(biod)) return biod;
        bio.add(biod);
    }
}

/************/
/** PART 2 **/
/************/

function adjentBugs2(grids, level, x, y) {
    const grid = grids[level];
    let sum = 0;

    [[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(dir => {
        const nx = x + dir[0];
        const ny = y + dir[1];

        let values;

        if (!grid[ny] || !grid[ny][nx]) {
            if (!grids[level+1]) return;
            values = [grids[level+1][2+dir[1]][2+dir[0]]];
        } else if (ny === 2 && nx === 2) {
            if (!grids[level-1]) return
            if (y === 1) values = grids[level-1][0];
            if (y === 3) values = grids[level-1][4];
            if (x === 1) values = grids[level-1].map(row => row[0]);
            if (x === 3) values = grids[level-1].map(row => row[4]);
        } else {
            values = [grid[ny][nx]];
        }
        sum += values.reduce((sum, val) => (val === '#') ? sum + 1 : sum, 0);
    });

    return sum;
}

async function part2(input) {
    let grid = input.trim.lines.map(line => line.split('')).get;

    let grids = new Array(400).fill(undefined).map(_ => (
        new Array(5).fill(null).map(_ => new Array(5).fill('.'))
    ));

    grids[200] = grid;

    for (let i = 0; i < 200; i++) {
        grids = grids.map((grid, level, grids) => (
            grid.map((row, y) => (
                row.map((value, x) => {
                    if (x === 2 && y === 2) return '.';

                    const adj = adjentBugs2(grids, level, x, y);
                    if (value === '#')
                        return (adj === 1) ? '#' : '.';
                    if (value === '.')
                        return (adj === 1 || adj === 2) ? '#' : '.';
                })
            ))
        ));
    }

    return grids.flatMap(x => x).flatMap(x => x).reduce((sum, value) => value === '#' ? sum + 1 : sum, 0);
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2019, 24).fetch();
    const input_2 = await Input(2019, 24).fetch();

    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
