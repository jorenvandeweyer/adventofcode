const getInput = require("../importInput");
const tools = require("../tools");

function grow(grid, coordinates, edges, iteration=0) {
    let recursion = false;
    for (let i = 0; i < coordinates.length; i++) {
        const list = coordinates[i].next;
        if (list.length === 0) continue;
        const list_next = [];

        for (let j = 0; j < list.length; j++) {
            const x = list[j].x;
            const y = list[j].y;

            if (x > edges.xMax || x < 0) {
                coordinates[i].valid = false;
                continue;
            }
            if (y > edges.yMax || y < 0) {
                coordinates[i].valid = false;
                continue;
            }

            const spot = grid[y][x];

            if (spot === ".") continue;

            if (spot) {
                if (spot.it === iteration && spot.index !== i) {
                    coordinates[spot.index].size--;
                    grid[y][x] = ".";
                } else {
                    continue;
                }
            } else {
                grid[y][x] = {
                    it: iteration,
                    index: i,
                };
                coordinates[i].size++;
                list_next.push({
                    x: x,
                    y: y+1,
                });
                list_next.push({
                    x: x+1,
                    y: y,
                });
                list_next.push({
                    x: x,
                    y: y-1,
                });
                list_next.push({
                    x: x-1,
                    y: y,
                });
            }
        }

        if (list_next.length) recursion = true;
        coordinates[i].next = list_next;
    }
    if (recursion) {
        return grow(grid, coordinates, edges, iteration+1);
    }

    return coordinates;
}

function largestSize(coordinates) {
    const parsed_coordinates = coordinates.map((line, index) => {
        const [x, y] = line.split(",").map(int => parseInt(int));
        return {
            id: index,
            x,
            y,
            next: [{
                x,
                y,
            }],
            size: 0,
            valid: true,
        }
    });
    let xMin = parsed_coordinates.reduce((curr, next) => (curr.x < next.x) ? curr : next).x;
    let yMin = parsed_coordinates.reduce((curr, next) => (curr.y < next.y) ? curr : next).y;
    let xMax = parsed_coordinates.reduce((curr, next) => (curr.x > next.x) ? curr : next).x;
    let yMax = parsed_coordinates.reduce((curr, next) => (curr.y > next.y) ? curr : next).y;

    const grid = tools.grid(xMax+1, yMax+1);

    const coords = grow(grid, parsed_coordinates, {
        xMin,
        yMin,
        xMax,
        yMax,
    });
    return coords.reduce((a, b) => {
        return (b.valid && a.size < b.size) ? b : a;
    }, {
        valid: true,
        size: 0,
    });
}

async function main() {
    const time = Date.now();
    const input = (await getInput("./input_6.txt")).lines;
    const result = largestSize(input);
    console.log(Date.now()-time + "ms",result);
}

main();
