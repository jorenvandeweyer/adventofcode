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

class Program{
    constructor(self){
        this.host = self;
        this.register = {};
        this.queue = [];
        this.sendedValues = 0;
    }

    async send(instr){
        for(let i = 0; i < instr.length; i++){
            i = await this.instruction(instr[i], i);
        };
    }

    recieveValue(value){
        this.queue.push(value);
        if(this.resolve){
            this.resolve(this.queue.shift());
            this.resolve = undefined;
        }
    }

    async instruction(instr, pc){
        instr = instr.split(" ");

        switch (instr[0]) {
            case "snd":
                this.sendedValues++;
                console.log(this.sendedValues, "# sended to:", this.getRegister("c"));
                this.host.getProgram(this.getRegister("c")).recieveValue(this.getRegister(instr[1]));
                break;
            case "set":
                this.register[instr[1]] = this.getRegister(instr[2])
                break;
            case "add":
                this.register[instr[1]] += this.getRegister(instr[2]);
                break;
            case "mul":
                this.register[instr[1]] *= this.getRegister(instr[2]);
                break;
            case "mod":
                this.register[instr[1]] %= this.getRegister(instr[2]);
                break;
            case "rcv":
                let value;
                if(this.queue.length > 0){
                    value = this.queue.shift();
                } else {
                    value = await new Promise((resolve, reject) => {
                        this.resolve = resolve;
                    });
                }
                this.register[instr[1]] = value;
                break;
            case "jgz":
                if(this.getRegister(instr[1]) > 0){
                    pc += this.getRegister(instr[2]) - 1;
                }
                break;
            default:
        }
        return pc;
    }

    getRegister(reg){
        if(Number.isInteger(parseInt(reg))){
            return parseInt(reg);
        } else {
            if(this.register[reg] == undefined) this.register[reg] = 0;
            return this.register[reg];
        }
    }
}

class Host{
    constructor(){
        this.programs = [];
        this.programs[0] = new Program(this);
        this.programs[1] = new Program(this);
    }

    getProgram(id){
        return this.programs[id];
    }

    async send(id, instr){
        await this.programs[id].send(instr);
    }
}

async function start(){
    let host = new Host();
    await host.send(0, ["set c 1", "set p 0"]);
    await host.send(1, ["set c 0", "set p 1"]);
    host.send(0, x);
    host.send(1, x);
}

start();
