const IntcodeComputer = require('./IntcodeComputer')

class PaintingRobot {
    constructor(program) {
        this.computer = new IntcodeComputer(program)
        // The current x, y position of the robot
        this.x = 0
        this.y = 0
        this.axis = 'y'                 // 'y' means robot is facing up or down, 'x' means facing left or right
        this.orientation = 1            // 1 means up or right, 0 means left or down
        this.panels = new Map()
    }

    paint() {
        while (this.computer.PC >= 0) {
            this.paintPanel()
        }
    }

    paintPanel() {
        const input = this.getPanelColor()
        this.computer.setInput(input)
        this.computer.hasInput = true
        this.computer.running = true
        this.computer.run()
        const color = this.computer.getOutput()
        this.panels.set(`${this.x},${this.y}`, color)

        this.computer.running = true
        this.computer.run()
        const direction = this.computer.getOutput()
        console.log("Position (" + this.x + ", " + this.y + ") colored " + color + " and moved " + direction)
        this.move(direction)
    }

    /**
     * Moves robot to the next position
     * @param direction turn left 90 degrees if 0, turn right 90 degrees if 1
     */
    move(direction) {
        switch (this.axis) {
            case 'x':
                this.orientation ^= direction
                if (this.orientation) {
                    this.y++
                } else {
                    this.y--
                }
                this.axis = 'y'
                break
            case 'y':
                this.orientation = (this.orientation === direction) ? 1 : 0
                if (this.orientation) {
                    this.x++
                } else {
                    this.x--
                }
                this.axis = 'x'
                break
        }
    }

    getPanelColor() {
        const color = this.panels.get(`${this.x},${this.y}`)
        return (color === undefined) ? 0 : color
    }

    getNumOfPaintedPanels() {
        return this.panels.size
    }
}

module.exports = PaintingRobot