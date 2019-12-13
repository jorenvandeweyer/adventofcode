const Input = require('../tools/input');

/************/
/** PART 1 **/
/************/
  
async function part1(input) {
    const parsed = input.trim.lines.get;

    return parsed.filter((ip) => {
        let mode = 0;
        let abba = false;

        for (let i = 0; i < ip.length-3; i++) {
            if (ip[i] === '[') {
                mode = 1;
                continue;
            }
            if (ip[i] === ']') {
                mode = 0;
                continue;
            }

            if (ip[i] === ip[i+3] && ip[i+1] === ip[i+2] && ip[i] !== ip[i+1]) {
                if (mode === 1) {
                    return false;
                }
                abba = true;
            }
        }

        return abba;
    }).length;
}

/************/
/** PART 2 **/
/************/

async function part2(input) {
    const parsed = input.trim.lines.get;

    return parsed.filter((ip) => {
        let mode = 0;

        const aba = new Set();
        const bab = new Set();

        for (let i = 0; i < ip.length-2; i++) {
            if (ip[i] === '[') {
                mode = 1;
                continue;
            }
            if (ip[i] === ']') {
                mode = 0;
                continue;
            }

            if (ip[i] === ip[i+2] && ip[i] !== ip[i+1]) {
                let first = mode ? aba : bab;
                let second = mode ? bab : aba

                if (first.has([ip[i+1], ip[i]].join(','))) return true;

                second.add([ip[i], ip[i+1]].join(','))
            }
        }
        return false;
    }).length;
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2016, 7).fetch();
    const input_2 = await Input(2016, 7).fetch();

    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
