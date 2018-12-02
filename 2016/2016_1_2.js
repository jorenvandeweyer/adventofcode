let x = "L5, R1, R4, L5, L4, R3, R1, L1, R4, R5, L1, L3, R4, L2, L4, R2, L4, L1, R3, R1, R1, L1, R1, L5, R5, R2, L5, R2, R1, L2, L4, L4, R191, R2, R5, R1, L1, L2, R5, L2, L3, R4, L1, L1, R1, R50, L1, R1, R76, R5, R4, R2, L5, L3, L5, R2, R1, L1, R2, L3, R4, R2, L1, L1, R4, L1, L1, R185, R1, L5, L4, L5, L3, R2, R3, R1, L5, R1, L3, L2, L2, R5, L1, L1, L3, R1, R4, L2, L1, L1, L3, L4, R5, L2, R3, R5, R1, L4, R5, L3, R3, R3, R1, R1, R5, R2, L2, R5, L5, L4, R4, R3, R5, R1, L3, R1, L2, L2, R3, R4, L1, R4, L1, R4, R3, L1, L4, L1, L5, L2, R2, L1, R1, L5, L3, R4, L1, R5, L5, L5, L1, L3, R1, R5, L2, L4, L5, L1, L1, L2, R5, R5, L4, R3, L2, L1, L3, L4, L5, L5, L2, R4, R3, L5, R4, R2, R1, L5";

x = x.split(", ");

let directions = ["N", "E", "S", "W"];

let places = [];

let pos = {
    x: 0,
    y: 0,
    dir: "N"
};

for(let i = 0; i < x.length; i++){
    let go = x[i].slice(0, 1);
    let steps = parseInt(x[i].slice(1));

    switch (go) {
        case "L":
            pos.dir = getDirection(-1);
            break;
        case "R":
            pos.dir = getDirection(1);
            break;
        default:

    }

    switch (pos.dir) {
        case "N":
            for(let j = 0; j < steps; j++){
                pos.y++;
                check();
            }
            break;
        case "E":
            for(let j = 0; j < steps; j++){
                pos.x++;
                check();
            }
            break;
        case "S":
            for(let j = 0; j < steps; j++){
                pos.y--;
                check();
            }
            break;
        case "W":
            for(let j = 0; j < steps; j++){
                pos.x--;
                check();
            }
            break;
        default:

    }
}

console.log(places);

function check(){
    let index = places.indexOf(pos.x + "|" + pos.y);
    places.push(pos.x + "|" + pos.y);
    if(index >= 0){
        console.log(Math.abs(pos.x) + Math.abs(pos.y));
    }
}

function getDirection(x){
    let index = directions.indexOf(pos.dir) + x;

    if(index < 0){
        index+=directions.length;
    } else if(index >= directions.length){
        index-=directions.length;
    }

    return directions[index];
}

function doSteps(dx, ref){

}
