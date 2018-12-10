const getInput = require("../importInput");
const tools = require("../tools");

class Star {
    constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }

    getPosAt(time) {
        return {
            x: this.x + this.dx*time,
            y: this.y + this.dy*time,
        };
    }
}

function starsAt(stars, seconds) {
    return stars.map(star => star.getPosAt(seconds));
}

function median(stars) {
    let sum = 0;

    const y = stars.map(star => star.y);
    const x = stars.map(star => star.x);

    const xMin = Math.min(...x);
    const xMax = Math.max(...x);
    const yMin = Math.min(...y);
    const yMax = Math.max(...y);

    sum += (xMax-xMin) + (yMax-yMin);

    return sum;
}

function findText(stars) {
    let smallestMedian = Infinity;
    let second = 0;

    for (let i = 5000; i < 15000; i ++) {
        const calculatedStars = starsAt(stars, i);
        const med = median(calculatedStars);
        if (med < smallestMedian) {
            second = i;
            smallestMedian = med;
        }
    }
    return second;
}

function draw(stars) {
    const y = stars.map(star => star.y);
    const x = stars.map(star => star.x);

    const xMin = Math.min(...x);
    const xMax = Math.max(...x);
    const yMin = Math.min(...y);
    const yMax = Math.max(...y);

    const grid = tools.grid(1+xMax-xMin, 1+yMax-yMin);

    for (let i = 0; i < stars.length; i++) {
        grid[stars[i].y-yMin][stars[i].x-xMin] = "#";
    }

    console.log(grid.map(arr => arr.join(" ")).join("\n"));
}

async function main() {
    const input = (await getInput("./input_10.txt")).lines.map(line => {
        const match = line.match(/position=<(.+?)> velocity=<(.+?)>/);
        const [x, y] = match[1].split(",").map(number => parseInt(number));
        const [dx, dy] = match[2].split(",").map(number => parseInt(number));
        return new Star(x, y, dx, dy);
    });

    const second = findText(input);
    const stars = starsAt(input, second);

    console.log(second);
    draw(stars);
}

main();
