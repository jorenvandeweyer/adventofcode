let input = `..##.##.######...#.######
##...#...###....##.#.#.##
###.#.#.#..#.##.####.#.#.
..##.##...#..#.##.....##.
##.##...#.....#.#..#.####
.###...#.........###.####
#..##....###...#######..#
###..#.####.###.#.#......
.#....##..##...###..###.#
###.#..#.##.###.#..###...
####.#..##.#.#.#.#.#...##
##.#####.#......#.#.#.#.#
..##..####...#..#.#.####.
.####.####.####...##.#.##
#####....#...#.####.#..#.
.#..###..........#..#.#..
.#.##.#.#.##.##.#..#.#...
..##...#..#.....##.####..
..#.#...######..##..##.#.
.####.###....##...####.#.
.#####..#####....####.#..
###..#..##.#......##.###.
.########...#.#...###....
...##.#.##.#####.###.####
.....##.#.#....#..#....#.`;

// input = `..#
// #..
// ...`;

input = input.split("\n");

let obj = {};

for(let y = 0; y < input.length; y++){
    for(let x = 0; x <input[y].length; x++){
        obj[x + "|" + y] = input[y][x];
    }
}

let x = 12;
let y = 12;
let pos = "up";
let infected = 0;

const dir = ["up", "right", "down", "left"];

for (let i = 0; i < 10000; i++){
    let currentPos = obj[x+ "|" + y];

    let index = dir.indexOf(pos);
    console.log(currentPos, pos);

    if(currentPos == "#"){
        pos = dir[(index+1)%4];
        obj[x + "|" + y] = ".";
    } else {
        infected++;
        pos = dir[(index+3)%4];
        obj[x + "|" + y] = "#";
    }
    console.log(pos, x, y);
    switch (pos) {
        case "up":
            y--;
            break;
        case "right":
            x++;
            break;
        case "down":
            y++;
            break;
        case "left":
            x--;
            break;
        default:
    }
    console.log(x, y);
}

console.log(infected);
