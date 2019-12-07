const Input = require('../tools/input');

class Node {
    constructor(instr) {
        this.instr = instr;
        this.name = instr[1];
        this.parent = null,
        this.children = [];
    }

    add(child) {
        this.children.push(child);
        child.parent = this;
    }

    get depth() {
        if (!this.parent) return 0;
        return 1 + this.parent.depth;
    }

    get parentTree() {
        if (!this.parent) return [this.name];
        return [...this.parent.parentTree, this.name];
    }
}

async function setup(input) {
    const parsed = input.trim.lines.map(x => x.split(')')).get;

    const nodes = parsed.map(orbit => new Node(orbit));

    for (let node of nodes) {
        if (!node.instr[0]) continue;
        let parent = nodes.find(x => x.name === node.instr[0]);

        if (!parent) {
            parent = new Node([null, node.instr[0]]);
            nodes.push(parent);
        }

        parent.add(node);
    }

    return nodes;
}

/************/
/** PART 1 **/
/************/

async function part1(nodes) {
    return nodes.reduce((sum, node) => sum + node.depth, 0);
}

/************/
/** PART 2 **/
/************/

async function part2(nodes) {
    const you = nodes.find(node => node.name === 'YOU');
    const san = nodes.find(node => node.name === 'SAN');

    const you_tree = you.parentTree;
    const san_tree = san.parentTree;

    for (let i = 0; true; i++) {
        if (you_tree[i] === san_tree[i]) continue;
        return (you_tree.length - i) + (san_tree.length - i) - 2;
    }
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input = await Input(2019, 6).fetch();
    const nodes = await setup(input);
    await part1(nodes).then(result => console.log('result 1:', result));
    await part2(nodes).then(result => console.log('result 2:', result));
}

main();
