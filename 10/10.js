const fs = require('fs')
const { Asteroid, AsteroidMap } = require('./AsteroidMap')

function readInput() {
    return fs.readFileSync('./input.txt', 'utf8').split('\n')
}

const mapInput = readInput()
const map = new AsteroidMap(mapInput)
const numOfMaxAsteroids = map.getNumOfMaximumDetectableAsteroids()
console.log("Part 1 answer is " + numOfMaxAsteroids)