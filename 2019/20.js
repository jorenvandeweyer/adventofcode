const Input = require('../tools/input');
const GridMap = require('../tools/gridMap');

const dirs = [{x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1},];

/************/
/** PART 1 **/
/************/

function getPortalExit(grid, p1) {
    for (let [coord, type] of Array.from(grid)) {
        if (type !== p1.first && type !== p1.second) continue;

        const [x, y] = coord.split(',').map(n => parseInt(n));
        const p2 = getPortal(grid, {x, y});
        if (!p2) continue;

        if (p1.entrance && p1.entrance.x === p2.entrance.x && p1.entrance.y && p2.entrance.y) continue;

        if (p2.first === p1.first && p2.second === p1.second) return p2;
        if (p2.first === p1.second && p2.second === p1.first) return p2;
    }
    return false;
}

function insideGrid(grid, pos) {
    if (pos.x > grid.xMin+5 &&
        pos.x < grid.xMax-5 &&
        pos.y > grid.yMin+5 &&
        pos.y < grid.yMax-5) return -1
    return 1;
}

function getPortal(grid, pos) {
    const first = grid.get(pos.x, pos.y);
    for (let dir of dirs) {
        const second = grid.get(pos.x + dir.x, pos.y + dir.y, '#');
        if (second < 'A' || second > 'Z') continue;
        const type = grid.get(pos.x + (-1) * dir.x, pos.y + (-1) * dir.y, '#');
        if (type !== '.') continue;

        return {
            first,
            second,
            entrance: {
                x: pos.x + (-1) * dir.x,
                y: pos.y + (-1) * dir.y,
            },
            levelDif: insideGrid(grid, pos)
        };
    }
    return false;
}

function teleport(grid, pos) {
    const portal = getPortal(grid, pos);
    const portalExit = getPortalExit(grid, portal);

    return portalExit;
}

function findShortestPath(grid, pos, levels=false, been=new Set(), depth=0, route=[], level=0) {
    let shortest = {
        dist: Infinity,
        route: []
    };

    if (depth > 6000) return shortest
    
    let newlevel = level;

    let current = grid.get(pos.x, pos.y, '#');

    if (current === 'Z') {
        const portal = getPortal(grid, pos);
        if (portal.first === portal.second) {
            if (levels && level !== 0) return false;
            return {
                dist: depth-1,
                route: route,
            };
        }
    }

    if (current >= 'A' && current <= 'Z') {
        portal = teleport(grid, pos);
        if (portal) {
            const exit = portal.entrance;
           
            if (been.has(`${exit.x},${exit.y},${level+portal.levelDif}`)) return false;
            
            if (levels) newlevel += portal.levelDif;
            if (newlevel < 0) return false;
            if (levels && newlevel < 0) return false; 
            
            route.push(`${portal.first}${portal.second}`)

            pos = portal.entrance;
        }
    }

    for (let dir of dirs) {
        const x = pos.x+dir.x;
        const y = pos.y+dir.y;
        const type = grid.get(x, y, '#');

        if (been.has(`${x},${y},${newlevel}`)) continue;
        if (type === '#' || type === ' ') continue;

        been.add(`${x},${y},${newlevel}`);

        const result = findShortestPath(grid, {x, y}, levels, new Set(been), depth+1, [...route], newlevel);
        if (!result) continue;

        if (result.dist < shortest.dist) shortest = result;
    }

    return shortest
}

async function part1(grid) {
    const portal = getPortalExit(grid, {first: 'A', second: 'A'});
    return findShortestPath(grid, portal.entrance, false);
}

/************/
/** PART 2 **/
/************/

function part2(grid) {
    const portal = getPortalExit(grid, {first: 'A', second: 'A'});
    return findShortestPath(grid, portal.entrance, true);
}

/************/
/*** MAIN ***/
/************/

function eliminateDeadEnds(grid, pos, been=new Set()) {
    let result = false;
    
    for (let dir of dirs) {
        const x = pos.x+dir.x;
        const y = pos.y+dir.y;
        const type = grid.get(x, y, '#');

        if (been.has(`${x},${y}`)) continue;

        if (type === '#') continue;
        if (type >= 'A' && type <= 'Z') {
            result = true;
        };

        if (type === '.') {
            been.add(`${x},${y}`);
            result_temp = eliminateDeadEnds(grid, {x, y}, been);
            if (result_temp) result = true;
        }
    }

    if (!result) {
        grid.set(pos.x, pos.y, '#');
    }

    return result;
}

function deadEnds(grid) {
    list = [
        ['V', 'B'], ['W', 'T'], ['P', 'U'], ['Y', 'I'],
        ['P', 'O'], ['Q', 'G'], ['H', 'M'], ['J', 'R'], ['F', 'R'],
        ['J', 'J'], ['K', 'B'], ['L', 'D'], ['B', 'B'], ['J', 'N'],
        ['Y', 'B'], ['D', 'U'], ['S', 'G'], ['T', 'S'], ['U', 'H'],
        ['R', 'X'], ['B', 'I'], ['L', 'H'], ['N', 'S']
    ];

    for (let portal of list) {
        const start = getPortalExit(grid, {first: portal[0], second: portal[1]});
        const end = getPortalExit(grid, start) || false;
        start && eliminateDeadEnds(grid, start.entrance);
        end && eliminateDeadEnds(grid, end.entrance);
    }
}

async function main() {
    const input = await Input(2019, 20).fetch();
    const parsed = input.lines.map(x => x.split('')).get;
    const grid = new GridMap();

    for (let y = 0; y < parsed.length; y++) {
        for (let x = 0; x < parsed[y].length; x++) {
            grid.set(x, y, parsed[y][x]);
        }
    }
    
    deadEnds(grid);

    console.log('result 1:', part1(grid));
    console.log('result 2:', part2(grid));
}

main();
