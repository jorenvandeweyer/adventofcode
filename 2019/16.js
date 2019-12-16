const Input = require('../tools/input');

const pattern = [0, 1, 0, -1];
const multiplier = (n, index) => pattern[(Math.floor((index+1)/(n+1)))%4];

/************/
/** PART 1 **/
/************/

async function part1(input) {
    let parsed = input.trim.split('').numbers.get;
    for (let i = 0; i < 100; i++) {
        parsed = parsed.map((_value, index_m, array) => {
            const computed = array.reduce((sum, current, index_r) => {
                return sum + multiplier(index_m, index_r)*current;
            }, 0);
            return Math.abs(computed%10);
        });
    }

    return parsed.slice(0, 8).join('');
}

/************/
/** PART 2 **/
/************/

function repeat(arr, offset, times) {
    const repeated = [];
    for (let i = offset; i < times*arr.length; i++) {
        repeated.push(arr[i%arr.length]);
    }
    return repeated;
}

async function part2(input) {
    let parsed = input.trim.split('').numbers.get;

    const offset = parsed.slice(0, 7).reduce((a, b) => a*10+b);
    parsed = repeat(parsed, offset, 10000);

    for (let i = 0; i < 100; i++) {
        parsed = parsed.map((_value, index, array) => {
            let computed = 0;
            for (let j = array.length-1; j >= index; j--) computed += array[j];
            return Math.abs(computed%10);
        });
    }

    return parsed.slice(0, 8).join('');
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2019, 16, '80871224585914546619083218645595');
    const input_2 = await Input(2019, 16, '03036732577212944063491565474664');

    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
