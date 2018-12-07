const getInput = require("../importInput");

const modules = {};

const installableModules = [];
const installed = [];
let installingTime = 0;

function installOrder(instructions) {
    for (let i = 0; i < instructions.length; i++) {
        const inst = instructions[i];
        if (!(inst.module in modules)) {
            modules[inst.module] = {
                name: inst.module,
                dependencies: [],
                dependant: [],
                installTime : inst.module.charCodeAt(0)-4,
            };
        }
        modules[inst.module].dependencies.push(inst.dependecy);

        if (!(inst.dependecy in modules)) {
            modules[inst.dependecy] = {
                name: inst.dependecy,
                dependencies: [],
                dependant: [],
                installTime : inst.dependecy.charCodeAt(0)-4,
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
        const shortestInstallTime = installableModules.reduce((x, y) => (x.installTime < y.installTime) ? x : y).installTime;
        for (let i = 0; i < 5; i++) {
            if (installableModules.length > i) {
                const module = installableModules[i];
                module.installTime -= shortestInstallTime;
                if (module.installTime === 0) {
                    installed.push(installableModules.splice(i, 1)[0]);
                    i--;
                }
            }
        }
        installingTime += shortestInstallTime;
    }
    return installingTime;
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
    console.log(result);
}

main();
