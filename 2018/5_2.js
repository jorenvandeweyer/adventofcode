const getInput = require("../importInput");

function isReactive(x, y) {
    return Math.abs(x.charCodeAt(0)-y.charCodeAt(0)) === 32;
}

function reaction(s) {
    let string = s;
    for (let i = 0; i < string.length-1; i++) {
        if (isReactive(string[i], string[i+1])) {
            string = string.substr(0, i) + string.substr(i+2, string.length);
            i-=2;
            if (i<0) i=-1;
        }
    }
    return string;
}

function remove(string, index) {
    const reg1 = new RegExp(String.fromCharCode(65+32+index), "g");
    const reg2 = new RegExp(String.fromCharCode(65+index), "g");
    return string.replace(reg1, "").replace(reg2, "");
}

function shortestReaction(string) {
    let shortest = Infinity;

    for (i = 0; i < 26; i++) {
        const result = reaction(remove(string, i));
        if (result.length < shortest) {
            shortest = result.length;
        }

    }
    return shortest;
}

async function main() {
    const input = (await getInput("./input_5.txt")).raw;
    const result = shortestReaction(input);
    console.log(result);
}

main();
