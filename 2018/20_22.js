const getInput = require("../importInput");

function parse(string) {
    const match = string.match(/(\w*)\|(\w*)(?=[\|\)])/);
    if (match) {
        let path = "";
        if (match[1].length === 0 || match[2].length === 0) {
            path = (match[1].length < match[2].length) ? match[1] : match[2];
        } else {
            path = (match[1].length > match[2].length) ? match[1] : match[2];
        }
        string = string.slice(0, match.index) + path + string.slice(match.index+match[0].length, string.length);
        return parse(string);
    }
    const match1 = string.match(/\((\w*)\)/);
    if (match1) {
        string = string.slice(0, match1.index) + match1[1] + string.slice(match1.index+match1[0].length, string.length); 
        return parse(string);
    }
    return string;
}

async function main() {
    const input = (await getInput("./input_20.txt")).raw.replace("^", "").replace("$", "");
    const string = parse(input);
    console.log(string.length, string);
}

main();
