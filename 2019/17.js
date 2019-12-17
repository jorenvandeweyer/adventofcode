const Input = require('../tools/input');
const GridMap = require('../tools/gridMap');
const Intcode = require('./code/IntcodeComputer');

function isIntersection(pos, grid) {
    if (!grid[pos.y] || grid[pos.y][pos.x] !== '#') return false;
    if (!grid[pos.y] || grid[pos.y][pos.x+1] !== '#') return false;
    if (!grid[pos.y] || grid[pos.y][pos.x-1] !== '#') return false;
    if (!grid[pos.y-1] || grid[pos.y-1][pos.x] !== '#') return false;
    if (!grid[pos.y+1] || grid[pos.y+1][pos.x] !== '#') return false;
    return true;
}

/************/
/** PART 1 **/
/************/

async function part1(input) {
    const parsed = input.trim.split(',').numbers.get;
    const grid = [[]];

    const intcode = new Intcode(parsed);

    intcode.on('output', (output) => {
        if (output === 10) grid.push([]);
        else grid[grid.length-1].push(String.fromCharCode(output));
    });

    while(intcode.ok) {
        intcode.step();
    }

    let result = 0;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (isIntersection({x, y}, grid)) result += x * y;
        }
    }

    return [result, grid];
}

/************/
/** PART 2 **/
/************/

const dirs = {
    'N': { 
        'L': {x: -1, y: 0, s: '<'},
        'R': {x: 1, y: 0, s: '>'}
    },
    'E': {
        'L': {x: 0, y: -1, s: '^'},
        'R': {x: 0, y: 1, s: 'v'}
    },
    'S': {
        'L': {x: 1, y: 0, s: '>'},
        'R': {x: -1, y: 0, s: '<'}
    },
    'W': {
        'L': {x: 0, y: 1, s: 'v'},
        'R': {x: 0, y: -1, s: '^'},
    }
};

function findRobot(grid) {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const char = grid[y][x];
            if (char === '^') return {x, y, dir: 'N'};
            if (char === 'v') return {x, y, dir: 'S'};
            if (char === '<') return {x, y, dir: 'W'};
            if (char === '>') return {x, y, dir: 'E'};
        }
    }
}

function turnRobot(grid, pos) {
    const RIGHT = grid[pos.y][pos.x+1];
    const LEFT = grid[pos.y][pos.x-1];
    const DOWN = grid[pos.y+1] ? grid[pos.y+1][pos.x] : '.';
    const UP = grid[pos.y-1] ? grid[pos.y-1][pos.x] : '.';

    if (
        pos.dir === 'N' && LEFT === '#' || 
        pos.dir === 'E' && UP === '#' ||
        pos.dir === 'S' && RIGHT === '#' ||
        pos.dir === 'W' && DOWN === '#'
    ) return 'L';

    if (
        pos.dir === 'N' && RIGHT === '#' || 
        pos.dir === 'E' && DOWN === '#' ||
        pos.dir === 'S' && LEFT === '#' ||
        pos.dir === 'W' && UP === '#'
    ) return 'R';

    return false;

}

function findPath(grid) {
    const path = [];
    while (true) {
        const pos = findRobot(grid);
        const turn = turnRobot(grid, pos);

        if (!turn) break;
        path.push(turn);

        const dir = dirs[pos.dir][turn];
        let length = 0;

        while(grid[pos.y+dir.y*(length+1)] && grid[pos.y+dir.y*(length+1)][pos.x+dir.x*(length+1)] === '#') {
            length++
        }

        path.push(length);
        grid[pos.y][pos.x] = '.'
        grid[pos.y+dir.y*length][pos.x+dir.x*length] = dir.s; 
    }
    return path;
}

function isRepetitive(path, func, offset) {
    for (let i = 0; i < func.length; i++) {
        if (func[i] !== path[i+offset]) return false;
    }
    return true;
}

function replaceRepetitive(path, func, name) {
    for (let i = 0; i < path.length; i++) {
        if (isRepetitive(path, func, i)) {
            const copy = path.slice();
            copy.splice(i, func.length, name);
            return replaceRepetitive(copy, func, name);
        }
    }
    return path;
}

function programValid(program) {
    if (program.functions.length !== 3) return false;
    if (!program.main.join('').replace(/A?B?C?/g, '').length) {
        return true;
    }
    return false;
}

function findProgram(path, options, program, offset=0) {
    if (!program) program = {
        main: [],
        functions: []
    }

    if (program.functions.length === 3) return program;
    
    while(options.names.includes(path[offset])) {
        offset++;
    }

    for (let i = offset+2; i < path.length; i=i+2) {
        if (options.names.includes(path[i-2])) return false;

        const func = path.slice(offset, i);
        if (func.join(',').length > options.maxLength) return false;
        
        const newPath = replaceRepetitive(path, func, options.names[program.functions.length]);

        const program_new = findProgram(newPath, options, {
            main: newPath,
            functions: [
                ...program.functions,
                func,
            ],
        }, offset + 1);

        if (!program_new) continue;
        if (programValid(program_new)) return program_new;
    }
}

async function part2(input, grid) {
    const parsed = input.trim.split(',').numbers.get;
    parsed[0] = 2;

    const path = findPath(grid);
    const program = findProgram(path, {
        functions: 3,
        maxLength: 20,
        names: ['A', 'B', 'C'],
    });

    const intcode = new Intcode(parsed);

    let result = 0;
    intcode.on('output', (output) => {
        if (output > 200) result = output;
        // process.stdout.write(String.fromCharCode(output));
    });

    intcode.send(...program.main.join(',').split('').map(char => char.charCodeAt(0)), 10);
    intcode.send(...program.functions[0].join(',').split('').map(char => char.charCodeAt(0)), 10);
    intcode.send(...program.functions[1].join(',').split('').map(char => char.charCodeAt(0)), 10);
    intcode.send(...program.functions[2].join(',').split('').map(char => char.charCodeAt(0)), 10);
    intcode.send('n'.charCodeAt(0), 10);

    while(intcode.ok) {
        intcode.step();
    }

    return result;
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2019, 17).fetch();
    const input_2 = await Input(2019, 17).fetch();

    const [result, grid] = await part1(input_1);
    console.log('result 1:', result);
    await part2(input_2, grid).then(result => console.log('result 2:', result));    
}

main();
