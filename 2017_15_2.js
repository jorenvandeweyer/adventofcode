const genA = 16807;
const genB = 48271;
const div = 2147483647;

let a = 277;
let b = 349;
let count = 0;

for(let i = 0; i < 5000000; i++){

    a = get(a, genA, 4);
    b = get(b, genB, 8);
    if((a & 0xffff) == (b & 0xffff)){
        count++;
    }

}

console.log(count);

function get(value, gen, cond){
    value = (value * gen) % div;
    if(value % cond == 0){
        return value;
    } else {
        return get(value, gen, cond);
    }
}
