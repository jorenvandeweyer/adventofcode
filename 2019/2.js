const Input = require('../tools/input');

/************/
/** PART 1 **/
/************/
async function part1(input) {
    const inputt = input.trim.split(',').numbers.get;

    let i = 0;

    inputt[1] = 12;
    inputt[2] = 2;

    loop:
    while (true) {
        switch(inputt[i]) {
            case 99:
                break loop;
            case 1:
                inputt[inputt[i+3]] = inputt[inputt[i+1]] + inputt[inputt[i+2]];
                break
            case 2:
                inputt[inputt[i+3]] = inputt[inputt[i+1]] * inputt[inputt[i+2]];
                break
            default:
                console.log(inputt[i]);
        }
        i+=4;
    }
    return inputt[0];

}

/************/
/** PART 2 **/
/************/

async function part2(input) {
    const parsed = input.trim.split(',').numbers.get;

    for (let first = 0; first <= 99; first++) {
        for (let second = 0; second <= 99; second++) {
            const inputt = [...parsed];

            inputt[1] = first;
            inputt[2] = second;
            let i = 0;

            loop:
            while (true) {
                switch(inputt[i]) {
                    case 99:
                        break loop;
                    case 1:
                        inputt[inputt[i+3]] = inputt[inputt[i+1]] + inputt[inputt[i+2]];
                        break
                    case 2:
                        inputt[inputt[i+3]] = inputt[inputt[i+1]] * inputt[inputt[i+2]];
                        break
                    default:
                        console.log(inputt[i]);
                }
                i+=4;
            }

            if (inputt[0] === 19690720) return 100*first+second;
        }
    }
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2019, 2).fetch();
    const input_2 = await Input(2019, 2).fetch();
    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
