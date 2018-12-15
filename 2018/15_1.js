const getInput = require("../importInput");

class Element {
    constructor(x, y, content) {
        this.x = x;
        this.y = y;
        this.content = content;
        this.empty = (this.content === ".") ? true : false;
    }
}

class Creature extends Element {
    constructor(x, y, content) {
        super(x, y, content);
        this.hp = 200;
        this.ap = 3;
    }

    hit(ap) {
        this.hp -= ap;
        return this.alive;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    get alive() {
        return this.hp > 0;
    }
}

function searchEnemyRecursive(grid, coords, dist, enemy) {
    const coordsNew = [];
    const Enemies = [];
    for (let i = 0; i < coords.length; i++) {
        const coord = coords[i];
        if (grid[coord.y][coord.x] === enemy) {
            Enemies.push({
                x: coord.x,
                y: coord.y,
                it: dist,
                history: [...coord.history, {
                    x: coord.x,
                    y: coord.y,
                }]
            });
            continue;
        }
        if (grid[coord.y][coord.x]) continue;
        grid[coord.y][coord.x] = dist;
        coordsNew.push({
            x: coord.x,
            y: coord.y-1,
            history: [...coord.history, {
                x: coord.x,
                y: coord.y,
            }],
        });
        coordsNew.push({
            x: coord.x-1,
            y: coord.y,
            history: [...coord.history, {
                x: coord.x,
                y: coord.y,
            }],
        });
        coordsNew.push({
            x: coord.x+1,
            y: coord.y,
            history: [...coord.history, {
                x: coord.x,
                y: coord.y,
            }],
        });
        coordsNew.push({
            x: coord.x,
            y: coord.y+1,
            history: [...coord.history, {
                x: coord.x,
                y: coord.y,
            }],
        });
    }
    if (Enemies.length) {
        return Enemies.reduce((curr, next) => {
            if (curr.y === next.y && curr.x === next.x) return curr;
            if (curr.y === next.y) return (curr.x < next.x) ? curr : next;
            if (curr.y > next.y) return next;
            if (curr.y < next.y) return curr;
        });
    } else if (coordsNew.length === 0) {
        return false;
    } else {
        return searchEnemyRecursive(grid, coordsNew, dist+1, enemy);
    }
}

function searchEnemy(grid, xx, yy, it) {
    const creature = grid[yy][xx][1];

    if (creature.it === it) {
        return [false, false, false];
    } else {
        creature.it = it;
    }
    
    const creatures = {
        "G": 0,
        "E": 0,
    };

    const RGrid = new Array(grid.length);
    for (let y = 0; y < grid.length; y++) {
        RGrid[y] = new Array(grid[y].length);
        for (let x = 0; x < grid[y].length; x++) {
            if (x === xx && y === yy) {
                RGrid[y][x] = null;
                creatures[grid[y][x][1].content]++;
            } else if (grid[y][x][1]) {
                creatures[grid[y][x][1].content]++;
                RGrid[y][x] = grid[y][x][1].content;
            } else if (grid[y][x][0].content === "#") {
                RGrid[y][x] = "#";
            } else {
                RGrid[y][x] = null;
            }
        }
    }

    if (creatures["E"] === 0 || creatures["G"] === 0) {
        return [false, false, creatures];
    }

    const enemySymbol = (creature.content === "E") ? "G" : "E";

    const enemy =  searchEnemyRecursive(RGrid, [{
        x: xx,
        y: yy,
        history: [],
    }], 0, enemySymbol);

    if (enemy) {
        if (enemy.it === 1) {
            return [false, enemy.history[1], false];
        } else if (enemy.it === 2) {
            return [enemy.history[1], enemy.history[2], false];
        } else {
            return [enemy.history[1], false, false];
        }
    } else {
        return [false, false, false];
    }
}

function sumHitpoints(grid) {
    let hp = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x][1]) {
                hp += grid[y][x][1].hp;
            }
        }
    }
    console.log(hp);
    return hp;
}
function simulate(grid) {
    let it = 0;
    while(true) {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x][1]) {
                    const creature = grid[y][x][1];
                    const [move, attack, stop] = searchEnemy(grid, x, y, it);
                    if (stop) {
                        console.log("stop", it);
                        return sumHitpoints(grid)*it;
                    }
                    if (move) {
                        creature.x = move.x;
                        creature.y = move.y;
                        grid[move.y][move.x][1] = creature;
                        grid[y][x][1] = null;
                    } 
                    if (attack) {
                        //little hack for checking lowest neighbour HP that is enemy
                        const targets = [];
                        if (grid[creature.y-1][creature.x][1] && creature.content !== grid[creature.y-1][creature.x][1].content) {
                            targets.push(grid[creature.y-1][creature.x][1]);
                        }
                        if (grid[creature.y][creature.x-1][1] && creature.content !== grid[creature.y][creature.x-1][1].content) {
                            targets.push(grid[creature.y][creature.x-1][1]);
                        }
                        if (grid[creature.y][creature.x+1][1] && creature.content !== grid[creature.y][creature.x+1][1].content) {
                            targets.push(grid[creature.y][creature.x+1][1]);
                        }
                        if (grid[creature.y+1][creature.x][1] && creature.content !== grid[creature.y+1][creature.x][1].content) {
                            targets.push(grid[creature.y+1][creature.x][1]);
                        }

                        if (targets.length) {
                            const target = targets.sort((a, b) => {
                                return a.hp > b.hp;
                            })[0];

                            const alive = target.hit(creature.ap);

                            if (!alive) {
                                grid[target.y][target.x][1] = null;
                            }
                        }
                    }
                }
            }
        }
        it++;
    }
}

function printGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const cell = grid[i][j];
            if (cell[1]) {
                process.stdout.write(cell[1].content)
            } else {
                process.stdout.write(cell[0].content)
            }
        }
        process.stdout.write("\n");
    }
}

async function main() {
    const input = (await getInput("./input_15.txt")).lines.map((line, y) => {
        return line.split("").map((el, x) => {
            const cell = new Array(2);
            if (el === "#" || el === ".") {
                cell[0] = new Element(x, y, el);
                cell[1] = null;
            } else {
                cell[0] = new Element(x, y, ".");
                cell[1] = new Creature(x, y, el);
            }
            return cell;
        });
    });

    const result = simulate(input);

    console.log(result);
}

main();
