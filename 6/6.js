const fs = require('fs')
const OrbitMap = require('./OrbitMap')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').split('\n')
}

const map = readInput()
const orbitMap = new OrbitMap(map)
const total_orbits = orbitMap.countTotalOrbits()
console.log("Part 1 answer is " + total_orbits)

const transfers = orbitMap.getMinTransfers()
console.log("Part 2 answer is " + transfers)

