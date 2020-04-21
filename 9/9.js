const fs = require('fs')
const IntcodeComputer = require('./IntcodeComputer')

function readInput() {
    return fs.readFileSync('./input.txt', 'utf8').split(',').map(Number)
}
const software = readInput()

const computer = new IntcodeComputer(software)
const part1Input = 1
const part2Input = 2
computer.setInput(part1Input)
computer.run()
