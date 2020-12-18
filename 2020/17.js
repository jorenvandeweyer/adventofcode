const Input = require('../tools/input');
const v8 = require('v8')

// active: if 2-3 active ? active : inactive
// inactive: 3 active ? active : inactive

class Cube {
  constructor (x, y, z, w, active) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
    this.active = active
  }

  is (x, y, z, w) {
    return x === this.x && y === this.y && z === this.z && this.w === w
  }

  static from (o) {
    return new Cube(o.x, o.y, o.z, o.w, o.active)
  }
}

class Field {
  constructor () {
    this.cubes = []
  }

  add (cube) {
    this.cubes.push(cube)
  }

  find (x, y, z, w) {
    let cube = this.cubes.find(cube => cube.is(x, y, z, w))

    if (!cube) {
      cube = new Cube(x, y, z, w, false)
      this.cubes.push(cube)
    }

    return cube
  }

  neighbours (cube, fd) {
    const cubes = []

    let wmin = 0
    let wmax = 0

    if (fd) {
      wmin = -1
      wmax = 1
    }

    for (let z = -1; z <= 1; z++) {
      for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
          for (let w = wmin; w <= wmax; w++) {
            if (z  === 0 && y === 0 && x === 0 && w === 0) continue

            const n = this.find(
              cube.x + x,
              cube.y + y,
              cube.z + z,
              cube.w + w
            )

            cubes.push(n)
          }
        }
      }
    }

    return cubes
  }

  activeNeighbours (cube, fd) {
    return this.neighbours(cube, fd)
      .reduce((sum, neighbour) => sum + Number(neighbour.active), 0)
  }

  allActiveCubes () {
    return this.cubes.filter(cube => cube.active)
  }

  allActiveCubesAndNeighbours (fd) {
    const active = this.allActiveCubes()

    const cubes = new Set(active)

    for (const cube of active) {
      this.neighbours(cube, fd)
        .forEach(neighbour => cubes.add(neighbour))
    }

    return cubes
  }

  clone () {
    const f = new Field()
    f.cubes = v8.deserialize(v8.serialize(this.cubes)).map(cube => Cube.from(cube))
    return f
  }
}

async function part1 (input, fd = false) {
  const field = new Field()

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const cube = new Cube(x, y, 0, 0, input[y][x] === '#')
      field.add(cube)
    }
  }

  for (let i = 0; i < 6; i++) {
    const cubes = field.allActiveCubesAndNeighbours(fd)
    const clone = field.clone()

    for (const cube of cubes) {
      const active = clone.activeNeighbours(cube, fd)

      if (cube.active) {
        cube.active = active === 3 || active === 2
      } else {
        cube.active = active === 3
      }
    }
  }

  return field.cubes.reduce((sum, cube) => sum + Number(cube.active), 0)
}

async function main() {
  const input = await Input(2020, 17).fetch()

  const parts = input.trim.lines.map(x => x.split(''))

  await part1(parts.get, false).then(result => console.log('result 1:', result))
  await part1(parts.get, true).then(result => console.log('result 2:', result))
}

main();
