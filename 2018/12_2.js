const getInput = require("../importInput");

class FIFO {
    constructor(size) {
        this.fifo = new Array(size);
        this.size = size;
    }

    insert(value) {
        const result = this.fifo.shift();
        this.fifo.push(value);
        return result;
    }

    toString() {
        return this.fifo.join("");
    }

    fill(value) {
        this.fifo.fill(value);
    }
}

class Node {
    constructor(value, index, next, previous) {
        this.value = value;
        this.index = index;
        this.next = next || this;
        this.previous = previous || this;        
    }
}

class Linked_List {
    constructor(value, index) {
        this.current = new Node(value, index);
        this.length = 1;
        this.first = this.current;
        this.last = this.current;
    }

    next(amount=1) {
        while (amount > 0) {
            this.current = this.current.next;
            amount--;
        }
        return this.current;
    }

    previous(amount=1) {
        while (amount > 0) {
            this.current = this.current.previous;
            amount--;
        }
        return this.current;
    }

    insert(value, index) {
        const node = new Node(value, index, this.current, this.current.previous);

        this.current.previous.next = node;
        this.current.previous = node;

        this.current = node;
        this.length++;
    }

    append(value) {
        const node = new Node(value, this.last.index+1, this.first, this.last);
        this.first.previous = node;
        this.last.next = node;
        this.last = node;
        this.length++;
    }

    prepend(value) {
        const node = new Node(value, this.first.index-1, this.first, this.last);
        this.first.previous = node;
        this.last.next =node;
        this.first = node;
        this.length++;
    }

    shift() {
        const node = this.first;
        this.last.next = this.first.next;
        this.first.next.previous = this.last;
        if (this.current === this.first) this.current = this.first.next;
        this.first = this.first.next;
        this.length--;
        return node;
    }

    pop() {
        const node = this.last;
        this.first.previous = this.last.previous;
        this.last.previous.next = this.first;
        if (this.current === this.last) this.current = this.last.next;
        this.last = this.last.previous;
        this.length--;
        return node;
    }

    reset() {
        this.current = this.first;
    }

    print() {
        let node = this.first;
        let string = "";
        for (let i = 0; i < this.length; i++) {
            string+=node.value;
            node = node.next;
        }
        return string;
    }
}

function sumOf(string, index) {
    let sum = 0;

    for (let i = 0; i < string.length; i++) {
        if (string[i] === "#") {
            sum+=i+index;
        }
    }

    return sum;
}

function plantsAfter(time, state, lookupTable, ) {
    if (time === 0) return sumOf(state, index);

    const Fifo = new FIFO(5);
    const linkedList = new Linked_List(".", -1);
    linkedList.prepend(".");

    for (let i = 0; i < state.length; i++) {
        linkedList.append(state[i]);
    }


    while (time > 0) {
        if (time < 50000000000-1000) {
            return sumOf(linkedList.print(), linkedList.first.index+time);
        }
        Fifo.fill(".");

        linkedList.prepend(".")
        linkedList.prepend(".")
        linkedList.prepend(".")
        linkedList.prepend(".")
        linkedList.prepend(".")

        linkedList.append(".")
        linkedList.append(".")
        linkedList.append(".")
        linkedList.append(".")
        linkedList.append(".")

        linkedList.reset();

        Fifo.insert(linkedList.current.value);
        Fifo.insert(linkedList.current.next.value);

        for (let i = 0; i < linkedList.length; i++) {
            Fifo.insert(linkedList.current.next.next.value);
            const nextState = lookupTable[Fifo.toString()];
            if (nextState) {
                linkedList.current.value = nextState;
            } else {
                linkedList.current.value = ".";
            }
            linkedList.next();

        }

        while (linkedList.first.value === ".") linkedList.shift();
        while (linkedList.last.value === ".") linkedList.pop();

        time--;
    }
    return sumOf(linkedList.print(), linkedList.first.index);
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
    const result = plantsAfter(50000000000, initial, patterns);

    console.log(result);
}

main();
