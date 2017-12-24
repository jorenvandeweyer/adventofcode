const genA = 16807;
const genB = 48271;
const div = 2147483647;

let a = 277;
let b = 349;
// let a = 65;
// let b = 8921;
let count = 0;

for(let i = 0; i < 40000000; i++){

    a = (a * genA) % div;
    b = (b * genB) % div;;

    if((a & 0xffff) == (b & 0xffff)){
        count++;
        console.log(i, count);
    }

}

console.log(count);
