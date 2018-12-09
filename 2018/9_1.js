const marbles = 71058;
const players = 491;

class Node {
    constructor(value, next, previous) {
        this.value = value;
        this.next = next || this;
        this.previous = previous || this;
    }
}

class Linked_List {
    constructor(node) {
        this.current = node;
    }

    next(amount=1) {
        while (amount > 0) {
            this.current = this.current.next;
            amount--;
        }
    }

    previous(amount=1) {
        while (amount > 0) {
            this.current = this.current.previous;
            amount--;
        }
    }

    insert(value) {
        const node = new Node(value, this.current, this.current.previous);

        this.current.previous.next = node;
        this.current.previous = node;

        this.current = node;
    }

    remove() {
        const node = this.current;
        const next = node.next;
        const previous = node.previous;

        next.previous = previous;
        previous.next = next;
        this.current = next;

        return node;
    }
}

function game(players, marbles) {
    let current = 1;
    let playerPoints = new Array(players).fill(0);
    const List = new Linked_List(new Node(0));


    while (current <= marbles) {
        for (let i = 0; i < players; i++) {
            if (current > marbles) break;
            if (current%23===0) {
                List.previous(7);
                const node = List.remove();
                playerPoints[i] += current + node.value;
            } else {
                List.next(2);
                List.insert(current);
            }
            current++;
        }
    }

    return playerPoints;
}


function main() {
    const time = Date.now();
    const result = game(players, marbles*100);
    console.log(Date.now() - time+"ms", Math.max(...result));
}

main();
