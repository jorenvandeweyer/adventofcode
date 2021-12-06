const Input = require('../tools/input')

class Board {
  constructor (input) {
    this.numbers = input
    this.marked = []
    this.last = null
  }

  play (number) {
    this.last = number
    this.marked.push(number)
  }

  won () {
    const rows = this.numbers
    const columns = this.numbers.map((_, i, arr) => arr.map(row => row[i]))

    return rows.some(row => row.every(n => this.marked.includes(n))) ||
      columns.some(column => column.every(n => this.marked.includes(n)))
  }

  score () {
    const numbers = this.numbers.flat().filter(n => !this.marked.includes(n))

    return this.last * numbers.reduce((acc, n) => acc + n, 0)
  }

}

async function part1 (input, numbers) {
  const boards = input.map(board => new Board(board))

  for (const number of numbers) {
    boards.forEach(board => board.play(number))

    const won = boards.filter(board => board.won())

    if (won.length) {
      console.log(won[0])
      return won.map(board => board.score())
    }
  }
}

async function part2 (input, numbers) {
  let boards = input.map(board => new Board(board))

  for (const number of numbers) {
    boards.forEach(board => board.play(number))

    if (boards.length > 1) {
      boards = boards.filter(board => !board.won())
    }

    if (boards.length === 1 && boards[0].won()) {
      return boards.map(board => board.score())
    }
  }
}

async function main () {
  const input = await Input(2021, 4).fetch()

  const blocks = input.result.trim().split('\n\n')
  const numbers = blocks.shift().split(',').map(Number)

  const boards = blocks.map(block => {
    return block
      .split('\n')
      .map(row => row.trim().split(/\s+/).map(Number))
  })

  await part1(boards, numbers).then(result => console.log('result 1:', result))
  await part2(boards, numbers).then(result => console.log('result 2:', result))
}

main()
