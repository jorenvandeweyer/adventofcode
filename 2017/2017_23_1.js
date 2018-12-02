let x = `set a 1
set b 57
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23`;

x = x.split("\n");

let register = {};
let sound = [];
let mul = 0;

for(let i = 0; i < x.length; i++){
    i = instruction(x[i], i);
    console.log(register)
}

console.log(register);

function instruction(instr, pc){
    instr = instr.split(" ");

    switch (instr[0]) {
        case "snd":
            sound.push(getRegister(instr[1]));
            break;
        case "set":
            register[instr[1]] = getRegister(instr[2]);
            break;
        case "add":
            register[instr[1]] += getRegister(instr[2]);
            break;
        case "sub":
            register[instr[1]] -= getRegister(instr[2]);
            break;
        case "mul":
            register[instr[1]] *= getRegister(instr[2]);
            break;
        case "mod":
            register[instr[1]] %= getRegister(instr[2]);
            break;
        case "rcv":
            if(getRegister(instr[1]) !== 0){
                console.log(sound[sound.length-1]);
            }
            break;
        case "jgz":
            if(getRegister(instr[1]) > 0){
                pc += getRegister(instr[2]) - 1;
            }
        case "jnz":
            if(getRegister(instr[1]) !== 0){
                pc += getRegister(instr[2]) - 1;
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
