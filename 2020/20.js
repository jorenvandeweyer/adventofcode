const Input = require('../tools/input');
const v8 = require('v8')

function rotate(matrix) {
  let result = []
  for(let i = 0; i < matrix[0].length; i++) {
      let row = matrix.map(e => e[i]).reverse()
      result.push(row)
  }
  return result
}

function sequenceToBin (sequence) {
  const bin = sequence.join('').replace(/#/g, '1').replace(/\./g, '0')
  return parseInt(bin, 2)
}

class Tile {
  constructor (id, content) {
    this.id = id
    this.content = content

    this.x = null
    this.y = null
  }

  get isUsed () {
    return this.x !== null || this.y !== null
  }

  print () {
    console.log(this.content.map(x => x.join('')).join('\n'))
  }

  flip () {
    this.content = this.content.map(x => x.reverse())
  }

  //clockwise
  rotate () {
    this.content = rotate(this.content)
  }

  getBorder (dir) {
    // top
    if (dir.x === 0 && dir.y === 1) return this.content[0]

    // bottom
    if (dir.x === 0 && dir.y === -1) return this.content[this.content.length - 1]

    // left
    if (dir.x === -1 && dir.y === 0) return this.content.map(x => x[0])

    // right
    if (dir.x === 1 && dir.y === 0) return this.content.map(x => x[x.length - 1])
  }

  getBorderCode (dir) {
    const border = this.getBorder(dir)

    return sequenceToBin(border)
  }

  get inner () {
    const arr = []

    for (let y = 1; y < this.content.length - 1; y++) {
      const row = []

      for (let x = 1; x < this.content[y].length - 1; x++) {
        row.push(this.content[y][x])
      }

      arr.push(row)
    }

    return arr
  }
}

function matchTile (borderCode, tile, dir) {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 4; j++) {
      tile.rotate()
      const code = tile.getBorderCode(dir)

      if (code === borderCode) return true
    }

    tile.flip()
  }

  return false
}

function connectTiles (tile, tiles) {
  const dirs = [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: 0, y: -1},
    {x: -1, y: 0}
  ]

  for (const dir of dirs) {
    const inverseDir = { x: -dir.x, y: -dir.y }

    const borderCode = tile.getBorderCode(dir)

    for (const t of tiles) {
      if (t.isUsed) continue

      const match = matchTile(borderCode, t, inverseDir)

      if (match) {
        t.x = tile.x + dir.x
        t.y = tile.y + dir.y

        connectTiles(t, tiles)
        break
      }
    }
  }
}

async function part1 (tiles) {
  const minx = Math.min(...tiles.map(tile => tile.x))
  const miny = Math.min(...tiles.map(tile => tile.y))
  const maxx = Math.max(...tiles.map(tile => tile.x))
  const maxy = Math.max(...tiles.map(tile => tile.y))

  const h1 = tiles.find(tile => tile.x === minx && tile.y === miny)
  const h2 = tiles.find(tile => tile.x === maxx && tile.y === miny)
  const h3 = tiles.find(tile => tile.x === minx && tile.y === maxy)
  const h4 = tiles.find(tile => tile.x === maxx && tile.y === maxy)

  return h1.id * h2.id * h3.id * h4.id
}

function findOccurences (tile, monster) {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 4; j++) {
      const sea = v8.deserialize(v8.serialize(tile.content))
      let occurences = 0

      for (let y = 0; y < sea.length - monster.length; y++) {
        moveMonster:
        for (let x = 0; x < sea[0].length - monster[0].length; x++) {
          for (let yM = 0; yM < monster.length; yM++) {
            for (let xM = 0; xM < monster[0].length; xM++) {
              if (monster[yM][xM] !== '#') continue
              if (sea[y + yM][x + xM] !== monster[yM][xM]) continue moveMonster
            }
          }

          occurences++
        }
      }

      if (occurences > 0) return occurences

      tile.rotate()
    }

    tile.flip()
  }
}

async function part2 (tiles) {
  const test = []
  for (const tile of tiles) {
    if (!test[tile.y]) {
      test[tile.y] = []
    }
    test[tile.y][tile.x] = '#'
  }

  const minx = Math.min(...tiles.map(tile => tile.x))
  const miny = Math.min(...tiles.map(tile => tile.y))
  const maxx = Math.max(...tiles.map(tile => tile.x))
  const maxy = Math.max(...tiles.map(tile => tile.y))

  const sea = []

  for (let y = miny; y <= maxy; y++) {
    for (let x = minx; x <= maxx; x++) {
      const tile = tiles.find(tile => tile.x === x && tile.y === y)
      const content = tile.inner.reverse()

      for (let innerY = 0; innerY < content.length; innerY++) {
        for (let innerX = 0; innerX < content[innerY].length; innerX++) {
          const seaY = (y - miny) * content.length + innerY
          const seaX = (x - minx) * content[innerY].length + innerX

          if (!sea[seaY]) {
            sea[seaY] = []
          }

          sea[seaY][seaX] = content[innerY][innerX]
        }
      }
    }
  }

  const bigTile = new Tile(0, sea)

  const monster = `
..................#.
#....##....##....###
.#..#..#..#..#..#...`.trim().split('\n').map(x => x.split(''))

  const occurences = findOccurences(bigTile, monster)

  const customReduce = (count, field) => field === '#' ? count + 1 : count

  const monsterSize = monster.flat().reduce(customReduce, 0)
  const seaStorm = bigTile.content.flat().reduce(customReduce, 0)
  return seaStorm - occurences * monsterSize
}

async function main() {
  const input = await Input(2020, 20).fetch()

  const tiles = input.trim.get.split('\n\n').map(x => {
    const [part0, ...parts] = x.split('\n')

    const tilenr = Number(part0.replace(':', '').replace('Tile ', ''))

    return new Tile(
      tilenr,
      parts.map(line => line.split(''))
    )
  })

  tiles[0].x = 0
  tiles[0].y = 0

  connectTiles(tiles[0], tiles)


  await part1(tiles).then(result => console.log('result 1:', result))
  await part2(tiles).then(result => console.log('result 2:', result))
}

main();
