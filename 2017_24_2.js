let x = `14/42
2/3
6/44
4/10
23/49
35/39
46/46
5/29
13/20
33/9
24/50
0/30
9/10
41/44
35/50
44/50
5/11
21/24
7/39
46/31
38/38
22/26
8/9
16/4
23/39
26/5
40/40
29/29
5/20
3/32
42/11
16/14
27/49
36/20
18/39
49/41
16/6
24/46
44/48
36/4
6/6
13/6
42/12
29/41
39/39
9/3
30/2
25/20
15/6
15/23
28/40
8/7
26/23
48/10
28/28
2/13
48/14`;

// x = `0/2
// 2/2
// 2/3
// 3/4
// 3/5
// 0/1
// 10/1
// 9/10`;

x = x.split("\n").map((part) => {
    return part.split("/").map((x) => parseInt(x));
});

console.log(weight(match(x)));

function match(parts, connection=0, bridge=[]){
    let totalBridge = bridge;
    for(let i = 0; i < parts.length; i++){
        if(parts[i].includes(connection)){
            let aParts = parts.slice(0);
            let b = bridge.slice(0);

            let con = aParts.splice(i, 1)[0].slice(0);
            b.push(con.slice(0));

            let index = con.indexOf(connection);
            con.splice(index, 1);

            let newBridge = match(aParts, con[0], b);
            totalBridge = isLonger(totalBridge, newBridge);
        }
    }
    return totalBridge;
}

function isHeavier(bridge1, bridge2){
    if(weight(bridge1) > weight(bridge2)){
        return bridge1;
    } else {
        return bridge2;
    }
}

function isLonger(bridge1, bridge2){
    if(bridge1.length > bridge2.length){
        return bridge1;
    } else if (bridge1 < bridge2.length){
        return bridge2;
    } else {
        return isHeavier(bridge1, bridge2);
    }
}

function weight(bridge){
    let weight = 0;
    for(let i = 0; i < bridge.length; i++){
        let connection = bridge[i];
        weight += connection[0] + connection[1];
    }
    return weight;
}
