// dave4math.com/mathematics/chinese-remainder-theorem/

const Input = require('../tools/input');

async function part1 (timestamp, busses) {
  busses = busses.filter(b => b !== 'x').map(b => Number(b))

  const cicles = busses.map(bus => {
    return {
      id: bus,
      wait: Math.ceil(timestamp / bus) * bus - timestamp
    }
  })

  const first = cicles.reduce((fastest, bus) => {
    return fastest.wait < bus.wait ? fastest : bus
  })

  return first.wait * first.id
}

async function part2 (input) {
  const busses = input.map((bus, index) => {
    if (bus === 'x') return false

    const mod = BigInt(bus)

    return {
      mod,
      a: mod - BigInt(index),
      n: null,
      u: null
    }
  }).filter(x => x)

  const N = busses.reduce((carry, bus) => carry * bus.mod, 1n)

  const solve = (n, mod) => {
    let u = 1n

    while (true) {
      if ((n * u - 1n) % mod === 0n) return u
      u++
    }
  }

  busses.forEach(bus => {
    bus.n = N / bus.mod
    bus.u = solve(bus.n, bus.mod)
  })

  return busses.reduce((sum, bus) => sum + bus.a * bus.n * bus.u, 0n) % N
}

async function main() {
  const input = await Input(2020, 13).fetch()

  const parts = input.trim.get.split('\n')

  const timestamp = Number(parts[0])
  const busses = parts[1].split(',')

  await part1(timestamp, busses).then(result => console.log('result 1:', result))
  await part2(busses).then(result => console.log('result 2:', result))
}

main();
