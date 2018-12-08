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

function sumNode(node) {
    if (!node) return 0;

    if (node.nodes.length === 0) {
        return node.metadata.reduce((sum, curr) => sum+curr);
    }

    let sum = 0; 

    for(let i = 0; i < node.metadata.length; i++) {
        const meta = node.metadata[i];
        sum += sumNode(node.nodes[meta-1]);
    }

    return sum;
}

async function main() {
    const input = (await getInput("./input_8.txt")).raw.split(" ").map(num => parseInt(num));
    const [node, index, output] = tree(input);
    const result = sumNode(node);

    console.log(result);
}

main();
