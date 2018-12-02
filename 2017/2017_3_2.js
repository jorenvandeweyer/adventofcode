let dir = ["right", "up", "left", "down"];
let map = [{
    x: 0,
    y: 0
}];

let steps = 0;
let switched = true;
let stepCounter = 0;

let limit = 289326;

let grid = {
    "0|0": {
        value: 1,
        x: 0,
        y: 0
    }
};

for(let i = 1; i < Infinity; i++){

    stepCounter++;

    let last = map[i-1];
    let direction = dir[0];

    map[i] = {
        x: last.x,
        y: last.y
    }

    switch (direction) {
        case "right":
            map[i].x++;
            if(switched == true){
                switched = false;
                steps++;
            }
            break
        case "up":
            map[i].y++;
            switched = true;
            break;
        case "left":
            map[i].x--;
            if(switched == true){
                switched = false;
                steps++;
            }
            break;
        case "down":
            map[i].y--;
            switched = true;
            break;
        default:

    }

    grid[map[i].x + "|" + map[i].y] = {
        value: sum(map[i].x, map[i].y),
        x: map[i].x,
        y: map[i].y
    };

    if(grid[map[i].x + "|" + map[i].y].value > limit){
        console.log(grid[map[i].x + "|" + map[i].y].value);
        break;
    }
    // console.log(i+1, direction, map[i], steps, stepCounter);

    if(steps == stepCounter){
        dir.push(dir.shift());
        stepCounter = 0;
    }
}

function sum(x, y){
    let value = 0;
    value += getValue(x-1, y);
    value += getValue(x-1, y-1);
    value += getValue(x, y-1);
    value += getValue(x+1, y-1);
    value += getValue(x+1, y);
    value += getValue(x+1, y+1);
    value += getValue(x, y+1);
    value += getValue(x-1, y+1);
    return value;
}

function getValue(x, y){
    if(grid[x + "|" + y] == undefined) return 0;
    return grid[x + "|" + y].value;
}
