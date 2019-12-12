const Input = require('../tools/input');

class Moon {
    constructor(input) {
        const result = /<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/.exec(input);
        this.x = parseInt(result[1]);
        this.y = parseInt(result[2]);
        this.z = parseInt(result[3]);

        this.vx = 0, this.vy = 0, this.vz = 0;
    }
}

function step(moons) {
    for (const m1 of moons) {
        for (const m2 of moons) {
            if (m1 === m2) continue;

            if (m1.x !== m2.x) m1.vx += (m1.x < m2.x) ? 1 : -1;
            if (m1.y !== m2.y) m1.vy += (m1.y < m2.y) ? 1 : -1;
            if (m1.z !== m2.z) m1.vz += (m1.z < m2.z) ? 1 : -1;
        }
    }

    for (const moon of moons) {
        moon.x += moon.vx;
        moon.y += moon.vy;
        moon.z += moon.vz;
    }
}

const gcd = (a, b) => (!b ? a : gcd(b, a % b));
const lcm = (a, b) => a * b / gcd(a, b);

/************/
/** PART 1 **/
/************/

async function part1(input) {
    const moons = input.trim.lines.get.map(string => new Moon(string));

    for (let i = 0; i < 1000; i++) {
        step(moons);
    }

    const energy = moons.reduce((sum, moon) => {
        const pot = Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z);
        const kin = Math.abs(moon.vx) + Math.abs(moon.vy) + Math.abs(moon.vz);
        return sum + pot * kin;
    }, 0);

    return energy; 
}

/************/
/** PART 2 **/
/************/

async function part2(input) {
    const moons = input.trim.lines.get.map(string => new Moon(string));

    xSet = new Set();
    ySet = new Set();
    zSet = new Set();

    const seen = [];

    for (let i = 0; true; i++) {
        step(moons);

        const key = dim => moons.map(moon => `${moon[dim]},${moon[`v${dim}`]}`).join(';');

        // if (xSet.has(key('x'))) console.log('x', i, Array.from(xSet).findIndex(v => v===key('x')));
        // if (ySet.has(key('y'))) console.log('y', i, Array.from(ySet).findIndex(v => v===key('y')));
        // if (zSet.has(key('z'))) console.log('z', i, Array.from(zSet).findIndex(v => v===key('z')));

        (!seen[0] && xSet.has(key('x'))) ? seen[0] = i : xSet.add(key('x'));
        (!seen[1] && ySet.has(key('y'))) ? seen[1] = i : ySet.add(key('y'));
        (!seen[2] && zSet.has(key('z'))) ? seen[2] = i : zSet.add(key('z'));

        if (seen[0] && seen[1] && seen[2]) break;
    }

    return seen.reduce(lcm);
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2019, 12).fetch();
    const input_2 = await Input(2019, 12).fetch();

    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
