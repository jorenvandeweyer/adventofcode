const Input = require('../tools/input');

class List {
  constructor () {
    this.value = null
    this.index = 0

    this.history = new Map()
  }

  get (value) {
    return this.history.get(value)
  }

  add (value) {
    this.history.set(this.value, this.index)

    this.index++
    this.value = value
  }
}

async function memory (input, until) {
  const list = new List()

  for (let i = 0; i < input.length; i++) {
    list.add(input[i], i + 1)
  }

  while (list.index !== until) {
    const index = list.get(list.value)

    if (index) list.add(list.index - index)
    else list.add(0)
  }

  return list.value
}

async function main() {
  const input = await Input(2020, 15).fetch()

  const parsed = input.trim.split(',').map(Number)

  await memory(parsed.get, 2020).then(result => console.log('result 1:', result))
  await memory(parsed.get, 30000000).then(result => console.log('result 2:', result))
}

main();
