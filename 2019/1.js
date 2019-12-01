const importInput = require('../importInput');
const input = importInput('./input_1.txt');

/************/
/** PART 1 **/
/************/

function fuel(number) {
    return Math.floor(number/3)-2;
}

const parsed = input.trim.lines.numbers.get;
const result_1 = parsed.reduce((sum, next) => {
    return sum + fuel(next);
},0);

console.log('result 1:', result_1);

/************/
/** PART 2 **/
/************/

function fuelRecursive(number) {
    const x = fuel(number);
    if (x < 0) return 0;

    return x + fuelRecursive(x);
}

const result_2 = parsed.reduce((sum, next) => {
    return sum + fuelRecursive(next);
}, 0);

console.log('result 2:', result_2);
