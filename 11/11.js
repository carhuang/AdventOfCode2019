const fs = require('fs')
const PaintingRobot = require('./PaintingRobot')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').split(',').map(Number)
}

const input = readInput()
const robot = new PaintingRobot(input)
robot.paint()
const num_painted_panels = robot.getNumOfPaintedPanels()
console.log("Part 1 answer is " + num_painted_panels)
