const getInput = require("../importInput");
const tools = require("../tools");

const maxDistance = 10000;

function totalDistanceTo(coord, coords) {
    let total = 0;

    for (let i = 0; i < coords.length; i++) {
        total += Math.abs(coords[i].x - coord.x) + Math.abs(coords[i].y - coord.y);
    }

    return total;
}

function safeSurface(coordinates) {    
    const parsed_coordinates = coordinates.map((line, index) => {
        const [x, y] = line.split(",").map(int => parseInt(int));
        return {
            id: index,
            x,
            y,
        };
    });

    let xMin = parsed_coordinates.reduce((curr, next) => (curr.x < next.x) ? curr : next).x;
    let yMin = parsed_coordinates.reduce((curr, next) => (curr.y < next.y) ? curr : next).y;
    let xMax = parsed_coordinates.reduce((curr, next) => (curr.x > next.x) ? curr : next).x;
    let yMax = parsed_coordinates.reduce((curr, next) => (curr.y > next.y) ? curr : next).y;

    let surface = 0;

    for (let y = 0; y < yMax; y++) {
        for (let x = 0; x < xMax; x++) {
            const dist = totalDistanceTo({x, y}, parsed_coordinates);
            if (dist < maxDistance) surface++;
        }
    }

    return surface;
}

async function main() {
    const time = Date.now();
    const input = (await getInput("./input_6.txt")).lines;
    const result = safeSurface(input);
    console.log(time - Date.now() + "ms",result);
}


main();
