let obj = {};
let cursor = 0;
let state = "A";

for(let i = 0; i < 12919244; i++){
    switch (state) {
        case "A":
            if(obj[cursor] == 1){
                obj[cursor] = 0;
                cursor--;
                state = "C";
            } else {
                obj[cursor] = 1;
                cursor++;
                state = "B";
            }
            break;
        case "B":
            if(obj[cursor] == 1){
                obj[cursor] = 1;
                cursor++;
                state = "D";
            } else {
                obj[cursor] = 1;
                cursor--;
                state = "A";
            }
            break;
        case "C":
            if(obj[cursor] == 1){
                obj[cursor] = 0;
                cursor--;
                state = "E";
            } else {
                obj[cursor] = 1;
                cursor++;
                state = "A";
            }
            break;
        case "D":
            if(obj[cursor] == 1){
                obj[cursor] = 0;
                cursor++;
                state = "B";
            } else {
                obj[cursor] = 1;
                cursor++;
                state = "A";
            }
            break;
        case "E":
            if(obj[cursor] == 1){
                obj[cursor] = 1;
                cursor--;
                state = "C";
            } else {
                obj[cursor] = 1;
                cursor--;
                state = "F";
            }
            break;
        case "F":
            if(obj[cursor] == 1){
                obj[cursor] = 1;
                cursor++;
                state = "A";
            } else {
                obj[cursor] = 1;
                cursor++;
                state = "D";
            }
            break;
        default:

    }
}

let checksum = 0;

for(key in obj){
    if(obj[key]) checksum++;
}

console.log(checksum);
