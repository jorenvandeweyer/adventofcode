const Input = require('../tools/input');
const v8 = require('v8')

function getOverlap (ingredientsList) {
  const ingredients = ingredientsList[0]
  const common = []

  for (const ingredient of ingredients) {
    const match = ingredientsList.every(list => list.includes(ingredient))

    if (match) {
      common.push(ingredient)
    }
  }

  return common
}

function createAllergenList (recipes) {
  const list = []

  for (const recipe of recipes) {
    for (const allergen of recipe.allergens) {
      if (!(allergen in list)) {
        list[allergen] = []
      }

      list[allergen].push(recipe.ingredients)
    }
  }

  return list
}

function resolveAllergens (input) {
  const allergenList = createAllergenList(input)

  const optionMap = {}
  const resultMap = {}

  for (const allergen in allergenList) {
    const list = allergenList[allergen]

    optionMap[allergen] = getOverlap(list)
  }

  while(Object.values(optionMap).length) {
    for (const key in optionMap) {
      const options = optionMap[key]

      if (options.length > 1) continue

      resultMap[key] = options[0]

      delete optionMap[key]

      Object.values(optionMap).forEach(options => {
        const index = options.indexOf(resultMap[key])
        if (index <= -1) return
        options.splice(index, 1)
      })
    }
  }

  return resultMap
}

async function part1 (input) {
  const map = resolveAllergens(input)

  const values = Object.values(map)

  return input.map(recipe => recipe.ingredients)
    .flat()
    .reduce((count, ingredient) => {
      return values.includes(ingredient) ? count : count + 1
    }, 0)
}

async function part2 (input) {
  const map = resolveAllergens(input)

  return Object.keys(map)
    .sort()
    .map(key => map[key])
    .join(',')
}

async function main() {
  const input = await Input(2020, 21).fetch()

  const recipes = input.trim.lines.get.map(line => {
    const parts = line.replace(')', '').split(' (contains ')

    return {
      ingredients: parts[0].split(' '),
      allergens: parts[1].split(', ')
    }
  })

  await part1(recipes).then(result => console.log('result 1:', result))
  await part2(recipes).then(result => console.log('result 2:', result))
}

main();
