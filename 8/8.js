const fs = require('fs')
const Image = require('./Image')

function readInput() {
    return fs.readFileSync('./input.txt', 'utf8').split('').map(Number)
}
const imageData = readInput()

const image = new Image()
image.build(imageData)
const part1Ans = image.validate()
console.log("Part 1 answer is " + part1Ans)
image.decode()
