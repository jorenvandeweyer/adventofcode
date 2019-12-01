const Input = require('../tools/input');

/************/
/** PART 1 **/
/************/

function fuel(number) {
    return Math.floor(number/3)-2;
}

async function part1(input) {
    const parsed = input.trim.lines.numbers.get;
    return parsed.reduce((sum, next) => {
        return sum + fuel(next);
    },0);
}

/************/
/** PART 2 **/
/************/

function fuelRecursive(number) {
    const x = fuel(number);
    if (x < 0) return 0;

    return x + fuelRecursive(x);
}

async function part2(input) {
    const parsed = input.trim.lines.numbers.get;
    return parsed.reduce((sum, next) => {
        return sum + fuelRecursive(next);
    }, 0);
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2019, 1).fetch();
    const input_2 = await Input(2019, 1).fetch();
    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
