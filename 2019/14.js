const Input = require('../tools/input');

function getFuel(key, amount, formulas, usages=new Map(), stop='ORE', depth=0) {
    if (!usages.has(key)) usages.set(key, {
        required: 0,
        produced: 0,
    });

    const usage = usages.get(key);
    usage.required += amount;

    if (key === 'ORE') return;
    if (usage.produced >= usage.required) return;

    const required = usage.required - usage.produced;
    const formula = formulas.get(key);
    const times = Math.ceil(required / formula.out[0]);

    for (let ins of formula.in) {
        getFuel(ins[1], times*ins[0], formulas, usages, stop, depth+1);
    }

    usage.produced += times * formula.out[0];

    return usages;
}

/************/
/** PART 1 **/
/************/

async function part1(formulas) {
    const usages = getFuel('FUEL', 1, formulas,);
    return usages.get('ORE').required;
}

/************/
/** PART 2 **/
/************/

async function part2(formulas) {
    let start = 1;
    let end = 10E11;

    while(start <= end) {
        const i = Math.floor((start + end) / 2);
  
        const usages = getFuel('FUEL', i, formulas);
        let ores = usages.get('ORE').required;

        const usages_c = getFuel('FUEL', i+1, formulas);
        let ores_c = usages_c.get('ORE').required;

        if (ores <= 10E11 && ores_c > 10E11) return i;

        if(10E11 > ores) {
            start = i + 1;
        } else {
            end = i - 1;
        }
    }
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input = await Input(2019, 14).fetch()
    
    const pair = ([number, string]) => [parseInt(number), string];
    const parsed = input.trim.lines.map(line => line.split(' => ')).get.map(formula => {
        const rIn = formula[0].split(', ').map(pair => pair.split(' ')).map(pair);
        const rOut = pair(formula[1].split(' '));

        return [rOut[1], {
            out: rOut,
            in: rIn
        }];
    });

    const formulas = new Map(parsed);

    await part1(formulas).then(result => console.log('result 1:', result));
    await part2(formulas).then(result => console.log('result 2:', result));    
}

main();
