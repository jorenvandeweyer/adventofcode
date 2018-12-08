const getInput = require("../importInput");

function tree(numbers, index=0, output=[]) {
    const nodeLength = numbers[index];
    const metadataLength = numbers[index+1];

    const node = {
        nodes: [],
        metadata: [],
    };

    index += 2;

    for (let i = 0; i < nodeLength; i++) {
        const [n, ind, out] = tree(numbers, index, output);
        index = ind;
        node.nodes.push(n);
    }

    for (let i = 0; i < metadataLength; i++) {
        const meta = numbers[index+i];
        node.metadata.push(meta);
    }

    index += metadataLength;
    output.push(node);

    return [node, index, output];
}

async function main() {
    const input = (await getInput("./input_8.txt")).raw.split(" ").map(num => parseInt(num));
    const [node, index, output] = tree(input);

    const result = output.map(node => {
        console.log(node);
        return node.metadata.reduce((sum, curr) => sum + curr);
    }).reduce((sum, curr) => sum+curr);

    console.log(result);
}

main();
