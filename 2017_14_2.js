let x = "vbqugkhl";
let zeros = 0;
let array = [];
let squares = 0;


let imgC = 0;

function createImage(arr, name){
    var gd = require('node-gd');

    gd.createTrueColor(128,128, function(error, img) {
      if (error) throw error;
      img.setThickness(4);
      for(let i = 0; i < arr.length; i++){
          for(let j = 0; j < arr[i].length; j++){
              if(arr[i][j] == "1"){
                  img.setPixel(i, j, 0xffffff);
              }
          }
      }
      img.bmp('test'+ name + '.bmp', 0);
      img.destroy();
    });
}



for(let i = 0; i<128; i++){
    let line = day10(x + "-" + i);
    line = hexToBin(line);
    array.push(line);
    zeros += findInString(line);
}

console.log(findSquares(array));

function findSquares(arr, s=0){
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].length; j++){
            if(arr[i][j] == 1){
                s++;
                cleanArr(arr, i, j);
                return findSquares(arr, s);
            }
        }
    }
    return s;
}

function cleanArr(arr, x, y){
    if(x < 0 || x >= arr.length || y < 0 || y >= arr.length) return;
    if(arr[x][y] == 1){
        createImage(arr.slice(0), imgC+1);
        imgC++
        arr[x] = arr[x].slice(0, y) + "0" + arr[x].slice(y+1, arr[x].length);
        cleanArr(arr, x-1, y);
        cleanArr(arr, x+1, y);
        cleanArr(arr, x, y-1);
        cleanArr(arr, x, y+1);
    }
    return;
}

function hexToBin(str){
    let line = "";
    for(let i = 0; i <str.length; i++){
        let bin = parseInt(str[i], 16).toString(2);
        while(bin.length < 4){
            bin = "0" + bin;
        }
        line += bin;
    }

    return line;
}

function findInString(input){
    return input.replace(/[^1]/g, "").length;
}

function day10(x){
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

    return getHash(list);
}

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
