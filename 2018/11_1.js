const input = 1718;

function powerLevel(x, y, serial) {
    const rackId = x+10;
    let power = rackId * y;
    power += serial;
    power *= rackId;
    return Math.floor(power%1000/100)-5;
}

function highestPower(grid) {
    let highest = 0;
    let current = 0;
    let xh, yh;

    for (let y = 0; y < grid.length-2; y++) {
        for (let x = 0; x < grid[y].length-2; x++) {
            current = 0;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    current += grid[y+i][x+j];
                }
            }
            if (current > highest) {
                highest = current;
                xh = x;
                yh = y;
            }
        }
    }
    return [xh+1, yh+1, highest];
}

function solve(serialNumber) {
    const grid = new Array(300);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(300);
    }
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            grid[y][x] = powerLevel(x+1, y+1, serialNumber);
        }
    }

    return highestPower(grid);
}

function main() {
    const start = Date.now();
    const result = solve(input);
    console.log(Date.now() - start+"ms", result);
}

main();
