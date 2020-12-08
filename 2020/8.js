const Input = require('../tools/input');

class GameConsole {
  constructor (mem) {
    this.mem = mem
    this.pc = 0
    this.accumulator = 0
    this.history = new Set()
  }

  get finished () {
    return this.pc >= this.mem.length
  }

  get loop () {
    return this.history.has(this.pc)
  }

  step () {
    this.history.add(this.pc)

    const op = this.mem[this.pc]

    switch (op[0]) {
      case 'acc':
        this.accumulator += Number(op[1])
        this.pc += 1
        break

      case 'jmp':
        this.pc += Number(op[1])
        break

      case 'nop':
        this.pc += 1
        break
    }
  }
}

async function part1 (input) {
  const gc = new GameConsole(input)

  while (!gc.loop) {
    gc.step()
  }

  return gc.accumulator
}

async function part2 (input) {
  for (let i = 0; i < input.length; i++) {
    const copy = JSON.parse(JSON.stringify(input))
    const instr = copy[i][0]

    if (instr !== 'nop' && instr !== 'jmp') continue

    copy[i][0] = instr === 'nop' ? 'jmp' : 'nop'

    const gc = new GameConsole(copy)

    while (!gc.loop && !gc.finished) {
      gc.step()
    }

    if (gc.finished) return gc.accumulator
  }
}

async function main() {
  const input = await Input(2020, 8).fetch()

  const parsed = input.trim.lines.map(l => l.split(' '))

  await part1(parsed.get).then(result => console.log('result 1:', result))
  await part2(parsed.get).then(result => console.log('result 2:', result))
}

main();
