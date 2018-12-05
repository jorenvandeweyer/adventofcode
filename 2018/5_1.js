const getInput = require("../importInput");

function isReactive(x, y) {
    return Math.abs(x.charCodeAt(0)-y.charCodeAt(0)) === 32;
}

function reaction(s) {
    let string = s;
    for (let i = 0; i < string.length-1; i++) {
        console.log(string[i], string[i+1]);
        if (isReactive(string[i], string[i+1])) {
            string = string.substr(0, i) + string.substr(i+2, string.length);
            i-=2;
            if (i<0) i=-1;
        }
    }
    return string;
}

async function main() {
    const input = (await getInput("./input_5.txt")).raw;
    result = reaction(input);
    console.log(result, result.length);
}

main();
