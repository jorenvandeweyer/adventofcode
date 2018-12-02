let x = "197,97,204,108,1,29,5,71,0,50,2,255,248,78,254,63";

let strArr = [];

for(let i = 0; i<x.length; i++){
    strArr.push(x.charCodeAt(i));
}
strArr.push.apply(strArr, [17, 31, 73, 47, 23]);

let list = [];
for(let i = 0; i<256; i++){
    list[i] = i;
}

let pos = 0;
let skip = 0;

for(let round = 0; round < 64; round++){
    for(let i = 0; i<strArr.length; i++){
        getReverseList(list, pos, strArr[i]);

        pos+=skip+parseInt(strArr[i]);
        while(pos >= list.length){
            pos-=list.length;
        }
        skip++;
    }
}
console.log(getHash(list));

function getReverseList(arr, pos, length){
    let list = [];
    for(let i = 0; i<length; i++){
        let index = pos+i;
        if(index >= arr.length) index-=arr.length;
        if(index > 255) console.log(index > 255);
        list.push(arr[index]);
    }
    list.reverse();

    for(let i = 0; i <length; i++){
        let index = pos+i;
        if(index >= arr.length) index-=arr.length;
        arr[index] = list[i];
    }

}

function getHash(arr){
    let x = [];
    for(let i = 0; i < 16; i++){
        let result = 0;
        for(let j = 0; j < 16; j++){
            let index = i*16 + j;
            result = result ^ arr[index];
        }
        x.push(result);
    }

    x = x.map(y => y.toString(16));

    let result = "";
    for(let i = 0; i < x.length; i++){
        if(x[i].length == 1){
            result += "0" + x[i];
        } else {
            result += x[i];
        }
    }

    return result;
}
