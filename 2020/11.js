const Input = require('../tools/input');
const v8 = require('v8')

function getKernel (x, y, grid) {
  const kernel = []

  for (let i = y-1; i <= y+1; i++) {
    if (i < 0 || i >= grid.length) continue

    const row = []

    for (let j = x-1; j <= x+1; j++) {
      if (j < 0 || j >= grid[i].length) continue

      if (i === y && x === j) row.push('X')
      else row.push(grid[i][j])
    }

    kernel.push(row)
  }

  return kernel
}

function checkAdjacent (x, y, grid, value) {
  const kernel = getKernel(x, y, grid)

  return kernel.flat().reduce((carry, next) => {
    return next === value ? carry + 1 : carry
  }, 0)
}

async function part1 (input) {
  let state = ''

  while (true) {
    const clone = v8.deserialize(v8.serialize(input))

    for (let y = 0; y < clone.length; y++) {
      for (let x = 0; x < clone[y].length; x++) {
        if (clone[y][x] === '.') continue
        if (clone[y][x] === 'L' && checkAdjacent(x, y, clone, '#') === 0) input[y][x] = '#'
        if (clone[y][x] === '#' && checkAdjacent(x, y, clone, '#') >= 4 ) input[y][x] = 'L'
      }
    }

    const newState = input.flat().join('')

    if (newState === state) break
    state = newState
  }


  return input.flat().reduce((carry, value) => {
    if (value === '#') return carry + 1
    else return carry
  }, 0)
}

const DIRS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1], [1, 0], [1, 1]
]

function findSeat(x, y, grid, dir) {
  let offset = 1
  while (true) {
    const dy = dir[0] * offset
    const dx = dir[1] * offset

    offset++

    if (y + dy < 0 || y + dy >= grid.length) return false
    if (x + dx < 0 || x + dx >= grid[0].length) return false

    const pos = grid[y + dy][x + dx]

    if (pos === '.') continue

    return pos
  }
}

function seatsInLineOfSeight (x, y, grid, type) {
  const seats = []

  for (const dir of DIRS) {
    seats.push(findSeat(x, y, grid, dir))
  }

  return seats.reduce((carry, seat) => {
    return seat === type ? carry + 1 : carry
  }, 0)
}

async function part2 (input) {
  let state = null

  while (true) {
    const clone = v8.deserialize(v8.serialize(input))

    for (let y = 0; y < clone.length; y++) {
      for (let x = 0; x < clone[y].length; x++) {
        if (clone[y][x] === '.') continue

        const seats = seatsInLineOfSeight(x, y, clone, '#')

        if (clone[y][x] === 'L' && seats === 0) input[y][x] = '#'
        if (clone[y][x] === '#' && seats >= 5 ) input[y][x] = 'L'
      }
    }

    const newState = input.flat().join('')

    if (newState === state) break
    state = newState
  }

  return input.flat().reduce((carry, value) => {
    if (value === '#') return carry + 1
    else return carry
  }, 0)
}

async function main() {
  const input = await Input(2020, 11).fetch()

  const parsed = input.trim.lines.map(x => x.split(''))

  await part1(parsed.clone).then(result => console.log('result 1:', result))
  await part2(parsed.clone).then(result => console.log('result 2:', result))
}

main();
