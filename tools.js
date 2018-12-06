module.exports.grid = (x, y) => {
    const grid = new Array(y);
    for (let i = 0; i < y; i++) {
        grid[i] = new Array(x);
    }
    return grid;
}

module.exports.printGrid = (grid) => {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x]) {
                if (grid[y][x] === ".") {
                    process.stdout.write(".");
                } else {
                    capital = grid[y][x].it === 0 ? 0 : 32;
                    process.stdout.write(String.fromCharCode(65+capital+grid[y][x].index));
                }
            } else {
                process.stdout.write("null");
            }
            process.stdout.write("\t");
        }
        console.log("\n");
    }
    console.log("\n");
}
