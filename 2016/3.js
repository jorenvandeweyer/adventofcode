const Input = require('../tools/input');

function triangle(numbers) {
    numbers.sort((a,b) => a-b);

    return numbers[0]+numbers[1] > numbers[2];
}

/************/
/** PART 1 **/
/************/

async function part1(input) {
    return input.trim.lines.map(line => line.trim().split(/\s+/).map(n => parseInt(n))).get.filter(triangle).length;
}

/************/
/** PART 2 **/
/************/

async function part2(input) {
    let array = input.trim.lines.map(line => line.trim().split(/\s+/).map(n => parseInt(n))).get;

    array = array[0].map((col, i) => array.map(row => row[i])).flatMap(x => x);

    let result = 0;
    for (let i = 0; i < array.length; i+=3) {
        const valid = triangle([array[i], array[i+1], array[i+2]]);
        if (valid) result++;
    }

    return result;
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2016, 3).fetch();
    const input_2 = await Input(2016, 3).fetch();

    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
