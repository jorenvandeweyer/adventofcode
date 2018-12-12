const getInput = require("../importInput");

function sumOf(string, index) {
    let sum = 0;

    for (let i = 0; i < string.length; i++) {
        if (string[i] === "#") {
            sum+=i+index;
        }
    }

    return sum;
}

function plantsAfter(time, state, patterns, index=0) {
    if (time === 0) return sumOf(state, index);

    if (state.slice(0, 5).includes("#")) {
        return plantsAfter(time, "."+state, patterns, index-1);
    }

    if (state.slice(-5).includes("#")) {
        return plantsAfter(time, state+".", patterns, index);
    }

    const arr = new Array(state.length);

    arr.push(".");
    arr.push(".");

    for (let i = 2; i < state.length-3; i++) {
        const substr = state.slice(i-2, i+3);
        const nextState = patterns[substr];
        if (nextState) {
            arr.push(nextState);
        } else {
            arr.push(".");
        }
    }
    arr.push(".");
    arr.push(".");
    arr.push(".");


    return plantsAfter(time-1, arr.join(""), patterns, index);
}

async function main() {
    const input = (await getInput("./input_12.txt")).lines;

    const initial = input.shift().split(": ")[1];
    input.shift();
    const patterns = input.reduce((result, curr) => {
        const data = curr.split(" => ");
        result[data[0]] = data[1];
        return result;
    }, {});
    const result = plantsAfter(20, initial, patterns);

    console.log(result);
}

main();
