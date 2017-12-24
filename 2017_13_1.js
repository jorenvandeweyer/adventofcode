let x = `0: 4
1: 2
2: 3
4: 5
6: 8
8: 6
10: 4
12: 6
14: 6
16: 8
18: 8
20: 6
22: 8
24: 8
26: 8
28: 12
30: 12
32: 9
34: 14
36: 12
38: 12
40: 12
42: 12
44: 10
46: 12
48: 12
50: 10
52: 14
56: 12
58: 14
62: 14
64: 14
66: 12
68: 14
70: 14
72: 17
74: 14
76: 14
80: 20
82: 14
90: 24
92: 14
98: 14`;

let obj = {};
let severity = 0;

x = x.split("\n");
for(let i = 0; i < x.length; i++){
    let str = x[i].split(": ");
    obj[str[0]] = str[1];
}

for(let key in obj){
    if(parseInt(key) % ((obj[key]-1)*2) == 0){
        severity+= parseInt(key) * obj[key];
    }
}

console.log(severity);
