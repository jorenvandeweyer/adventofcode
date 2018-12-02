let x = `set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 316
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19`;

x = x.split("\n");

let register = {};
let sound = [];

for(let i = 0; i < x.length; i++){
    i = instruction(x[i], i);
}


function instruction(instr, pc){
    instr = instr.split(" ");

    switch (instr[0]) {
        case "snd":
            sound.push(getRegister(instr[1]));
            break;
        case "set":
            setRegister(instr[1], getRegister(instr[2]));
            break;
        case "add":
            setRegister(instr[1], getRegister(instr[1]) + getRegister(instr[2]));
            break;
        case "mul":
            setRegister(instr[1], getRegister(instr[1]) * getRegister(instr[2]));
            break;
        case "mod":
            setRegister(instr[1], getRegister(instr[1]) % getRegister(instr[2]));
            break;
        case "rcv":
            if(getRegister(instr[1]) !== 0){
                console.log(sound[sound.length-1]);
            }
            break;
        case "jgz":
            if(getRegister(instr[1]) > 0){
                pc += getRegister(instr[2]) - 1;
                return Infinity;
            }
            break;
        default:

    }
    return pc;
}

function getRegister(reg){
    if(Number.isInteger(parseInt(reg))){
        return parseInt(reg);
    } else {
        if(register[reg] == undefined) register[reg] = 0;
        return register[reg];
    }
}

function setRegister(reg, value){
    register[reg] = value;
}
