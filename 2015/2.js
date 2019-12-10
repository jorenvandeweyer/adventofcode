const Input = require('../tools/input');

/************/
/** PART 1 **/
/************/

async function part1(input) {
    input = input.get.trim().split('\n').map(string => string.split('x').map(string => parseInt(string)));
    
    let totalArea = 0;

    for (let i = 0; i < input.length; i++) {
        const present = input[i];

        const plane_1 = present[0] * present[1];
        const plane_2 = present[1] * present[2];
        const plane_3 = present[2] * present[0];
        
        let smallest = plane_1; 
        if (plane_2 < smallest) smallest = plane_2;
        if (plane_3 < smallest) smallest = plane_3;

        const area = 2*plane_1 + 2*plane_2 + 2*plane_3 + smallest;

        totalArea += area;
    }

    return totalArea;
}

/************/
/** PART 2 **/
/************/

async function part2(input) {
    input = input.get.trim().split('\n').map(string => string.split('x').map(string => parseInt(string)));
    
    let totalRibbon = 0;

    for (let i = 0; i < input.length; i++) {
        const present = input[i];

        const perimeter_1 = 2 * (present[0] + present[1]);
        const perimeter_2 = 2 * (present[1] + present[2]);
        const perimeter_3 = 2 * (present[2] + present[0]);
        
        let smallest = perimeter_1; 
        if (perimeter_2 < smallest) smallest = perimeter_2;
        if (perimeter_3 < smallest) smallest = perimeter_3;

        const ribbon = present[0] * present[1] * present[2] + smallest;

        totalRibbon += ribbon;
    }

    return totalRibbon;
}

/************/
/*** MAIN ***/
/************/

async function main() {
    const input_1 = await Input(2015, 2).fetch();
    const input_2 = await Input(2015, 2).fetch();
    await part1(input_1).then(result => console.log('result 1:', result));
    await part2(input_2).then(result => console.log('result 2:', result));    
}

main();
