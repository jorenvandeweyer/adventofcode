let x = "0	5	10	0	11	14	13	4	11	8	8	7	1	4	12	11";

x = x.split("\t");
x = x.map(a => parseInt(a));

let lastComb = "";
let allCombinations = [];
let cycle = 0;

function check(){
    while(!allCombinations.includes(lastComb)){
        cycle++;
        let max = x.reduce((a, b) => {
            return Math.max(a, b);
        });
        let index = x.indexOf(max);
        x[index] = 0;

        while(max > 0){
            index++;
            if(index >= x.length){
                index-= x.length;
            }
            x[index]++;
            max--;
        }

        allCombinations.push(lastComb);
        lastComb = x.join(",");

    }
}

check()
allCombinations = [];
cycle = 0;
check();

console.log(cycle);
