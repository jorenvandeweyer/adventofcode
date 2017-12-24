const step = 344;

let pos = 0;
let path = [0];

for(let i = 1; i < 2018; i++){
    pos = ((pos+step)%i)+1;
    path.splice(pos, 0, i);
}
console.log(path[pos], path[pos+1]);
