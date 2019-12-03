const Input = require('../tools/input');

async function setup(input) {
    const wires = input.trim.lines.get.map(x => x.split(','));

    const paths = [new Set(), new Set()];
    const distances = [new Map(), new Map()];

    wires.forEach((wire, index_wire) => {
        const position = [0, 0];
        let totalSteps = 0;

        wire.forEach((instr, index_instr) => {
            const steps = parseInt(instr.substr(1));

            let dx = 0, dy = 0;

            switch (instr[0]) {
                case 'U':
                    dy = 1;
                    break;
                case 'D':
                    dy = -1;
                    break;
                case 'L':
                    dx = -1;
                    break;
                case 'R':
                    dx = 1;
                    break;
            }

            for (let i = 1; i <= steps; i++) {
                totalSteps++;
                position[0] += dx, position[1] += dy;

                paths[index_wire].add(position.toString());
                distances[index_wire].set(position.toString(), totalSteps);
            }
        });
    });

    const intersections = [...paths[0]].filter(coord => paths[1].has(coord));

    return [distances, intersections];
}

/************/
/** PART 1 **/
/************/

async function part1(intersections) {
    return intersections.reduce((min, cur) => {
        const coords = cur.split(',').map(x => Math.abs(parseInt(x)));
        const distance = coords[0]+coords[1];

        if (distance < min) return distance;
        return min;
    }, Infinity);
}

/************/
/** PART 2 **/
/************/

async function part2(intersections, distances) {
    return intersections.reduce((min, cur) => {
        const distance = distances[0].get(cur) + distances[1].get(cur);

        if (distance < min) return distance;
        return min;
    }, Infinity);
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input = await Input(2019, 3).fetch();
    const [distances, intersections] = await setup(input);

    await part1(intersections).then(result => console.log('result 1:', result));
    await part2(intersections, distances).then(result => console.log('result 2:', result));    
}

main();
