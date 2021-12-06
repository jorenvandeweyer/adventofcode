const Input = require('../tools/input')

async function part1 (input, diagonal = false) {
  const lines = input.trim.lines.result
    .map(line => line.split(' -> ').map(x => x.split(',').map(Number)))

  const grid = new Map()

  for (const line of lines) {
    if (line[0][0] === line[1][0]) {
      const x = line[0][0]
      const y1 = Math.min(line[0][1], line[1][1])
      const y2 = Math.max(line[0][1], line[1][1])
      for (let y = y1; y <= y2; y++) {
        const count = grid.get(`${x},${y}`) ?? 0

        grid.set(`${x},${y}`, count + 1)
      }
    } else if (line[0][1] === line[1][1]) {
      const y = line[0][1]
      const x1 = Math.min(line[0][0], line[1][0])
      const x2 = Math.max(line[0][0], line[1][0])
      for (let x = x1; x <= x2; x++) {
        const count = grid.get(`${x},${y}`) ?? 0

        grid.set(`${x},${y}`, count + 1)
      }
    } else if (diagonal) {
      const x1 = line[0][0]
      const y1 = line[0][1]
      const x2 = line[1][0]
      const y2 = line[1][1]

      const dy = y1 < y2 ? 1 : -1
      const dx = x1 < x2 ? 1 : -1

      for (let i = 0; i < Math.abs(y2 - y1) + 1; i++) {
        let x = x1 + i * dx
        let y = y1 + i * dy

        const count = grid.get(`${x},${y}`) ?? 0

        grid.set(`${x},${y}`, count + 1)
      }
    }
  }

  return Array.from(grid.entries()).filter(x => x[1] > 1).length
}

async function main () {
  const input_1 = await Input(2021, 5).fetch()
  const input_2 = await Input(2021, 5).fetch()

  await part1(input_1).then(result => console.log('result 1:', result))
  await part1(input_2, true).then(result => console.log('result 2:', result))
}

main()
