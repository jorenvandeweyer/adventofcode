const Input = require('../tools/input');

class Node {
  constructor (value, next, previous) {
    this.value = value
    this.next = next
    this.previous = previous
  }

  removeNext () {
    const temp = this.next

    this.next.next.previous = this
    this.next = this.next.next

    return temp
  }

  insertAfter (node) {
    node.next = this.next
    node.previous = this

    this.next.previous = node
    this.next = node
  }

  insertBefore (node) {
    node.next = this
    node.previous = this

    this.previous.next = node
    this.previous = node
  }
}

class List {
  constructor (array) {
    for (const value of array) {
      const node = new Node(value)

      if (!this.current) {
        this.current = node
      }

      this.current.insertBefore(node)
    }

    this.lookup = new Map()
  }

  createLookup () {
    let current = this.current

    while (true) {
      this.lookup.set(current.value, current)

      current = current.next

      if (current === this.current) return
    }
  }

  next (count = 1) {
    while (count > 0) {
      this.current = this.current.next
      count--
    }
  }

  previous (count =1) {
    while (count > 0) {
      this.current = this.current.previous
      count--
    }
  }

  find (value) {
    return this.lookup.get(value)
  }
}

class Game {
  constructor (array, extended = false) {
    this.list = new List(array)
    this.extended = extended
    this.max = 9

    if (this.extended) {
      for (let i = 10; i <= 1000000; i++) {
        const node = new Node(i)

        this.list.current.insertBefore(node)
      }

      this.max = 1000000
    }

    this.list.createLookup()
  }

  take (count) {
    const taken = []

    while (count > 0) {
      taken.push(this.list.current.removeNext())
      count--
    }

    return taken
  }

  findDestination (value, ignore) {
    while (true) {
      value--

      if (value < 0) value = this.max

      if (ignore.includes(value)) continue

      const destination = this.list.find(value)

      if (destination) return destination
    }
  }

  round () {
    const taken = this.take(3)
    const destination = this.findDestination(this.list.current.value, taken.map(node => node.value))

    taken.reverse()

    for (const cup of taken) {
      destination.insertAfter(cup)
    }

    this.list.next()
  }

  getResult (value, count) {
    let node = this.list.find(value)

    const values = []

    while (count > 0) {
      node = node.next
      values.push(node.value)

      count--
    }

    return values
  }
}

async function part1 (cups, rounds, extended) {
  const game = new Game(cups.slice(), extended)

  for (let i = 0; i < rounds; i++) {
    game.round()
  }

  if (!extended) {
    return game.getResult(1, 8).join('')
  } else {
    const values = game.getResult(1, 2)

    return values[0] * values[1]
  }
}

async function main() {
  const input = await Input(2020, 23).fetch()

  const cups1 = input.trim.get.split('').map(Number)
  const cups2 = input.trim.get.split('').map(Number)

  await part1(cups1, 100, false).then(result => console.log('result 1:', result))
  await part1(cups2, 10000000, true).then(result => console.log('result 2:', result))
}

main();
