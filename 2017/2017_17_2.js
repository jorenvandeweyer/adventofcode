const step = 344;

let pos = 0;
let numb = 0;

for(let i = 1; i < 50000001; i++){
    pos = ((pos+step)%i)+1;
    if(pos == 1) numb = i;
}
console.log(numb);
