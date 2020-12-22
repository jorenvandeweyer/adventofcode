const Input = require('../tools/input');
const v8 = require('v8')

class Deck {
  constructor (cards) {
    this.history = new Set()

    this.cards = cards
  }

  getCards () {
    return this.cards
  }

  createSubdeck (count) {
    return new Deck(this.cards.slice(0, count))
  }

  getCard () {
    return this.cards.shift()
  }

  addCards (...cards) {
    this.cards.push(...cards)
  }

  remember () {
    this.history.add(this.cards.join(','))
  }

  get hasOccured () {
    return this.history.has(this.cards.join(','))
  }

  get isEmpty () {
    return !this.cards.length
  }

  get size () {
    return this.cards.length
  }

  get score () {
    return this.cards.reduce((carry, value, index, arr) => carry + value * (arr.length - index), 0)
  }
}

async function part1 (decks) {
  while (decks.every(deck => !deck.isEmpty)) {
    const card1 = decks[0].getCard()
    const card2 = decks[1].getCard()

    if (card1 > card2) {
      decks[0].addCards(card1, card2)
    } else {
      decks[1].addCards(card2, card1)
    }
  }

  return decks
    .find(deck => !deck.isEmpty)
    .score
}

function playRound (deck1, deck2, game, round) {
  const card1 = deck1.getCard()
  const card2 = deck2.getCard()

  let winner = null

  if (deck1.size >= card1 && deck2.size >= card2) {

    const subdeck1 = deck1.createSubdeck(card1)
    const subdeck2 = deck2.createSubdeck(card2)

    winner = playGame(subdeck1, subdeck2, game + 1)
  } else {
    winner = card1 > card2
  }

  if (winner) {
    deck1.addCards(card1, card2)
  } else {
    deck2.addCards(card2, card1)
  }
}

function playGame (deck1, deck2, game = 1) {

  let round = 1

  while (true) {
    if (deck1.hasOccured || deck2.hasOccured) return true
    if (deck2.isEmpty) return true
    if (deck1.isEmpty) return false

    deck1.remember()
    deck2.remember()

    playRound(deck1, deck2, game, round)

    round++
  }
}

async function part2 (decks) {
  const deck1 = decks[0]
  const deck2 = decks[1]

  if (playGame(deck1, deck2)) {
    return deck1.score
  } else {
    return deck2.score
  }
}

async function main() {
  const input = await Input(2020, 22).fetch()

  const decks1 = input.trim.get.split('\n\n').map(part => {
    const split = part.split('\n')

    split.shift()

    return new Deck(split.map(Number))
  })

  const decks2 = input.trim.get.split('\n\n').map(part => {
    const split = part.split('\n')

    split.shift()

    return new Deck(split.map(Number))
  })


  await part1(decks1).then(result => console.log('result 1:', result))
  await part2(decks2).then(result => console.log('result 2:', result))
}

main();
