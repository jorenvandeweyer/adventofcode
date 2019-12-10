const Input = require('../tools/input');

function asteroidMap(grid, base) {
    const asteroids = new Map();

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '.') continue;
            if (base[0] === x && base[1] === y) continue;

            const angle = Math.atan2(base[1]-y, x-base[0]) * 180 / Math.PI;
            const distance = Math.sqrt((y-base[1])**2 + (x-base[0])**2);
            
            asteroids.set(`${x},${y}`, {
                angle,
                distance,
                x,
                y,
            });
        }
    }

    return asteroids;
}

/************/
/** PART 1 **/
/************/

async function part1(input) {
    const parsed = input.trim.lines.map((x) => x.split('')).get;

    let max = 0;
    let coords = {};

    for (let y = 0; y < parsed.length; y++) {
        for (let x = 0; x < parsed[y].length; x++) {
            if (parsed[y][x] === '.') continue;
            const asteroids = asteroidMap(parsed, [x, y]);

            const sum = new Set(Array.from(asteroids.values()).map(asteroid => asteroid.angle)).size;

            if (sum < max) continue;

            max = sum;
            coords = [x, y];
        }
    }

    return [max, coords];
}

/************/
/** PART 2 **/
/************/

async function part2(input, base) {
    const parsed = input.trim.lines.map((x) => x.split('')).get;

    const asteroids = asteroidMap(parsed, base);

    let current_angle = 90;
    const shot = [];

    while(asteroids.size) {
        const asteroid = [...asteroids].reduce((asteroid, [key, value]) => {
            const first_angle = (current_angle + 360 - value.angle) % 360;
            const second_angle = (current_angle + 360 - asteroid.angle) % 360;

            if (first_angle === second_angle) 
                return (asteroid.distance < value.distance) ? asteroid : value;
            
            return (first_angle < second_angle) ? value : asteroid;

        }, {angle:0, distance: Infinity});

        shot.push(asteroid);
        asteroids.delete(`${asteroid.x},${asteroid.y}`);

        current_angle = asteroid.angle - 0.000001;
    }

    return shot[199].x*100 + shot[199].y;
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2019, 10).fetch();
    const input_2 = await Input(2019, 10).fetch();

    const [asteroids, base] = await part1(input_1);
    const result_2 = await part2(input_2, base);   

    console.log('result 1:', asteroids);
    console.log('result 2:', result_2);
}

main();
