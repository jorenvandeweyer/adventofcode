const getInput = require("../importInput");
const tools = require("../tools");

module = {
    name: "",
    dependencies: [],
    dependant: []
}

const modules = {};

const installableModules = [];
const installed = [];

function installOrder(instructions) {
    for (let i = 0; i < instructions.length; i++) {
        const inst = instructions[i];
        if (!(inst.module in modules)) {
            modules[inst.module] = {
                name: inst.module,
                dependencies: [],
                dependant: [],
            };
        }
        modules[inst.module].dependencies.push(inst.dependecy);

        if (!(inst.dependecy in modules)) {
            modules[inst.dependecy] = {
                name: inst.dependecy,
                dependencies: [],
                dependant: [],
            };
        } 
        modules[inst.dependecy].dependant.push(inst.module);
    }
    const list = Object.values(modules);
    
    while (list.length > 0) {
        skip_marker:
        for (let i = 0; i < list.length; i++) {
            const deps = list[i].dependencies;
            for (let j = 0; j < deps.length; j++) {
                const result = installed.find(el => el.name === deps[j]);
                if (!result) {
                    continue skip_marker
                };
            }
            installableModules.push(list.splice(i, 1)[0]);
            i--;
        }
        installableModules.sort((a, b) => {
            return a.name < b.name ? -1: 1;
        });
        installed.push(installableModules.shift());
    }
    return installed;
    // console.log(list);
}

async function main() {
    const input = (await getInput("./input_7.txt")).lines.map(instruction => {
        const match = instruction.match(/Step (\w) must be finished before step (\w) can begin./);
        return {
            module: match[2],
            dependecy: match[1],
        }
    });
    const result = installOrder(input);
    console.log(result.map(module => module.name).join(""));
    // console.log(installed, installableModules);
}

main();
