const getInput = require("../importInput");

const Dirs = Object.freeze({
    "north": [0, -1, 0, 1],
    "east": [1, 0, -1, 0],
    "south": [0, 1, 0, -1],
    "west":  [-1, 0, 1, 0],
});

const lookupTable = {
    "-": 1, //horizontal
    "|": 1, //vertical
    "/": 2, //edge
    "\\": 3, //edge
    "+": 4, //intersection
    ">": Dirs.east,
    "v": Dirs.south,
    "<": Dirs.west,
    "^": Dirs.north,
};

class Directions {
    constructor(dir) {
        this.fn = this.left;
        this.logic = dir;
        this.logicOld = null;
    }

    left(cross=false) {
        this.logicOld = this.logic.slice();
        this.logic.push(this.logic.shift());
        if(cross) this.fn = this.straight;
    }

    right(cross=false) {
        this.logicOld = this.logic.slice();
        this.logic.unshift(this.logic.pop());
        if(cross) this.fn = this.left;
    }

    straight(cross=false) {
        this.logicOld = this.logic.slice();
        if (cross) this.fn = this.right;
    }

    next() {
        this.fn(true);
    }

    get x() {
        return this.logic[0];
    }

    get y() {
        return this.logic[1];
    }
}

class Cart {
    constructor(x, y, dir, grid) {
        this.x = x;
        this.y = y;
        this.delete =false;
        this.grid = grid;
        this.dir = new Directions(dir);
        this.previous = {
            x: null,
            y: null,
        };
    }

    move() {
        if (this.grid[this.y][this.x] == 1) {
            //keep going straight
        } else if (this.grid[this.y][this.x] == 2) {
            if (this.dir.x === 0) {
                this.dir.right();
            } else if (this.dir.y === 0) {
                this.dir.left();
            } else {
                console.log("ERROR BIG PROBLEM NOT MOVING");
            }
        } else if (this.grid[this.y][this.x] == 3) {
            if (this.dir.x === 0) {
                this.dir.left();
            } else if (this.dir.y === 0) {
                this.dir.right();
            } else {
                console.log("ERROR BIG PROBLEM NOT MOVING");
            }
        } else if (this.grid[this.y][this.x] == 4) {
            this.dir.next();
        } else {
            console.log("ERROR OUT OF TRAIL");
            
        }
        this.previous.x = this.x;
        this.previous.y = this.y;
        this.x += this.dir.x;
        this.y += this.dir.y;

        return
    }
    
    collision(cart) {
        // if (this.x === cart.previous.x && this.y === cart.previous.y && this.previous.x === cart.x && this.previous.y === cart.y) return true;
        return this.x === cart.x && this.y === cart.y;
    }
}

function create(input) {
    const arr = new Array(input.length);
    const carts = [];
    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        arr[i] = new Array(input[0].length).fill(0);

        for (let j = 0; j < line.length; j++) {
            const type = lookupTable[line[j]];
            if (typeof type === "object") {
                arr[i][j] = 1;
                carts.push(new Cart(j, i, type.slice(), arr));
            } else if (typeof type=== "number") {
                arr[i][j] = type;
            } 
        }
    }

    return [carts, arr];
}

function collision(carts) {
    for (let i = 0; i < carts.length; i++) {
        const cart = carts[i];
        for (let j = i+1; j < carts.length; j++) {
            if(cart.collision(carts[j])) {
                cart.delete = true;
                carts[j].delete =true;
            }
        }
    }
    return false;
}

function simulate(carts, grid) {
    let j = 0;
    while (true) {
        for (let i = 0; i < carts.length; i++) {
            carts[i].move();
            collision(carts, grid)
        }

        carts = carts.filter(cart => {
            if (cart.delete) {
                console.log("iteration:", j, cart.x, cart.y);
            }
            return !cart.delete
        }).sort((a, b) => a.x < b.x || a.y < b.y);

        if (carts.length === 1) {
            return {
                x: carts[0].x,
                y: carts[0].y,
            };
        }
        j++;
    }
}

async function main() {
    const input = (await getInput("./input_13.txt")).rraw.split("\n");

    const result = create(input);
    const coll = simulate(result[0], result[1]);

    console.log(coll);
}

main();
