const Input = require('../tools/input');

/************/
/** PART 1 **/
/************/

function shuffle(instrs, size, index) {
    for (let instr of instrs) {
        const instr_p = instr.split(' ');
        if (instr === 'deal into new stack') {
            index = size - (index+1);
        } else if (instr_p[0] === 'cut') {
            const n = parseInt(instr_p[1]);
            index = ((index - n)+size) % size;
        } else if (instr_p[0] === 'deal') {
            const incr = parseInt(instr_p[3]);
            index = index*incr % size;
        }
    }
    return index;
}

/************/
/** PART 2 **/
/************/

const trampoline = fn => (...args) => {
    let result = fn(...args)
    while (typeof result === 'function') {
        result = result()
    }
    return result
}

function egcdRec(a, b) {
    if (a === 0) return [b, 0, 1];
    return [egcdRec(b%a, a)].flatmap((g, y, x) => (
        [g, x - Math.floor(b / a) * y, y]
    ));

}

const egcd = trampoline(egcdRec);

function modinv(a, m) {
    const [g, x, y] = egcd(a, m);
    if (g !== 1) return 'false';
    return x % m;
}

 function shuffleReverse(instrs, size, index) {
    for (let instr of instrs.reverse()) {
        const instr_p = instr.split(' ');
        if (instr === 'deal into new stack') {
            index = size - (index-1);
        } else if (instr_p[0] === 'cut') {
            const n = parseInt(instr_p[1]);
            index = (index + n+size) % size;
        } else if (instr_p[0] === 'deal') {
            const incr = parseInt(instr_p[3]);
            index = modinv(index)*incr % size;
        }
    }

    return index;
}

function part2(instrs, size, index, repeat) {
    return shuffleReverse(instrs, size, index);
}
/************/
/*** MAIN ***/
/************/

async function main() {
    const input = await Input(2019, 22).fetch();
    const instrs = input.trim.lines.get;

    console.log('result 1:', shuffle(instrs, 10007, 2019));
    console.log('result 2:', part2(instrs, 119315717514047, 2020, 101741));    
    // console.log('result 2:', await part2(input_2, 119315717514047, 2019));    
}

main();
