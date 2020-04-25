const fs = require('fs')
const Grid = require('./Grid')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').split('\n')
}

const grid = new Grid(readInput())
const minDistance = grid.findDistanceToIntersectionClosestToOrigin()
console.log("Part 1 answer is " + minDistance)

const minSignalDelay = grid.findMinSignalDelay()
console.log("Part 2 answer is " + minSignalDelay)
