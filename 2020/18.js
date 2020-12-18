const Input = require('../tools/input');
const v8 = require('v8')

class WeirdCalculator {
  constructor (string, pos, order) {
    this.string = string
    this.pos = pos
    this.order = order
    this.number = null
    this.operation = null
  }

  solve () {
    const arr = []

    while (this.pos < this.string.length) {
      const value = this.string[this.pos]

      this.pos++

      if (value === ' ') continue
      if (value.match(/\d/)) arr.push(Number(value))
      if (value.match(/\+|\*/)) arr.push(value)
      if (value === ')') return this.calculate(arr)
      if (value === '(') {
        const calculator = new WeirdCalculator(this.string, this.pos, this.order)

        arr.push(calculator.solve())

        this.pos = calculator.pos
      }
    }

    return this.calculate(arr)
  }

  calculate (arr) {
    while (arr.length > 1) {
      if (this.order) {
        const sum = arr.findIndex(v => v === '+')
        const mul = arr.findIndex(v => v === '*')

        if (sum >= 0) {
          arr = [...arr.slice(0, sum - 1), arr[sum - 1] + arr[sum + 1], ...arr.slice(sum + 2)]
        } else {
          arr = [...arr.slice(0, mul - 1), arr[mul - 1] * arr[mul + 1], ...arr.slice(mul + 2)]
        }
      } else {
        if (arr[1] === '+') {
          arr = [arr[0] + arr[2], ...arr.slice(3)]
        } else {
          arr = [arr[0] * arr[2], ...arr.slice(3)]
        }
      }
    }

    return arr[0]
  }
}

async function part1 (input) {
  return input.reduce((sum, line) => {
    const calculator = new WeirdCalculator(line, 0, false)

    const r = calculator.solve()

    return sum + r
  }, 0)
}

async function part2 (input) {
  return input.reduce((sum, line) => {
    const calculator = new WeirdCalculator(line, 0, true)

    const r = calculator.solve()

    return sum + r
  }, 0)
}

async function main() {
  const input = await Input(2020, 18).fetch()

  const parts = input.trim.lines

  await part1(parts.get).then(result => console.log('result 1:', result))
  await part2(parts.get).then(result => console.log('result 2:', result))
}

main();
