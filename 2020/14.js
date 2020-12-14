const Input = require('../tools/input');

class Memory {
  constructor () {
    this.mem = []
    this.mask = ''
  }

  setMask (mask) {
    this.mask = mask
  }

  write (address, value) {
    const bin = value.toString(2).padStart(36, '0').split('')

    for (let i = 0; i < this.mask.length; i++) {
      const letter = this.mask[i]

      if (letter === 'X') continue
      bin[i] = letter
    }

    this.mem[address] = parseInt(bin.join(''), 2)
  }

  computeAddresses (address) {
    const result = []

    for (let i = 0; i < address.length; i++) {
      if (address[i] !== 'X') continue

      const c1 = [...address]
      const c2 = [...address]

      c1[i] = '1'
      c2[i] = '0'

      result.push(...this.computeAddresses(c1))
      result.push(...this.computeAddresses(c2))

      return result
    }

    result.push(address)

    return result
  }

  write2 (address, value) {
    const addressBin = address.toString(2).padStart(36, '0').split('')

    for (let i = 0 ; i < this.mask.length; i++) {
      const letter = this.mask[i]

      if (letter === '0') continue
      addressBin[i] = letter
    }

    const addresses = this.computeAddresses(addressBin).map(address => address.join(''))

    for (const bin of addresses) {
      const address = parseInt(bin, 2)
      this.mem[address] = value
    }
  }
}

async function part1 (input) {
  const memory = new Memory()

  for (const instr of input) {
    if (instr[0] === 'mask') {
      memory.setMask(instr[1])
    } else {
      const address = Number(instr[0].match(/mem\[(\d+)\]/)[1])
      const value = Number(instr[1])

      memory.write(address, value)
    }
  }

  return memory.mem.reduce((sum, value) => sum + value, 0)
}

async function part2 (input) {
  const memory = new Memory()

  for (const instr of input) {
    if (instr[0] === 'mask') {
      memory.setMask(instr[1])
    } else {
      const address = Number(instr[0].match(/mem\[(\d+)\]/)[1])
      const value = Number(instr[1])

      memory.write2(address, value)
    }
  }

  return Object.values(memory.mem).reduce((sum, value) => sum + value, 0)
}

async function main() {
  const input = await Input(2020, 14).fetch()

  const parsed = input.trim.lines.map(line => line.split(' = '))

  await part1(parsed.get).then(result => console.log('result 1:', result))
  await part2(parsed.get).then(result => console.log('result 2:', result))
}

main();
