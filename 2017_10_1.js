let x = "197,97,204,108,1,29,5,71,0,50,2,255,248,78,254,63";
// let x = "3, 4, 1, 5";
x =  x.split(",");

let list = [];
for(let i = 0; i<256; i++){
    list[i] = i;
}

let pos = 0;
let skip = 0;
for(let i = 0; i<x.length; i++){
    getReverseList(list, pos, x[i]);

    pos+=skip+parseInt(x[i]);
    if(pos >= list.length) pos-=list.length;
    skip++;
}
console.log(list);
console.log(list[0]*list[1]);

function getReverseList(arr, pos, length){
    let list = [];
    for(let i = 0; i<length; i++){
        let index = pos+i;
        if(index >= arr.length) index-=arr.length;
        list.push(arr[index]);
    }
    list.reverse();

    for(let i = 0; i <length; i++){
        let index = pos+i;
        if(index >= arr.length) index-=arr.length;
        arr[index] = list[i];
    }

}
