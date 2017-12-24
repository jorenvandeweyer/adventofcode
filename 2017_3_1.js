let dir = ["right", "up", "left", "down"];
let map = [{
    x: 0,
    y: 0
}];

let steps = 0;
let switched = true;
let stepCounter = 0;

let limit = 289326;

for(let i = 1; i < limit; i++){

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
    // console.log(i+1, direction, map[i], steps, stepCounter);

    if(steps == stepCounter){
        dir.push(dir.shift());
        stepCounter = 0;
    }
}


console.log(Math.abs(map[limit-1].x) + Math.abs(map[limit-1].y));
