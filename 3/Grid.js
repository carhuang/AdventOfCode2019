const Wire = require('./Wire')

class Grid {
    constructor(input) {
        this.wire1 = new Wire(input[0].split(','))
        this.wire2 = new Wire(input[1].split(','))
        this.intersections = []
    }

    findDistanceToIntersectionClosestToOrigin() {
        let minDistance = Number.MAX_SAFE_INTEGER
        const wire1Points = this.wire1.points
        const wire2Points = this.wire2.points
        for (let point of wire1Points.keys()){
            if (wire2Points.has(point)){
                this.intersections.push(point)
                minDistance = Math.min(this.calcManhattanDistance(point), minDistance)
            }
        }
        return minDistance
    }

    calcManhattanDistance(point) {
        point = point.split(',')
        const x = point[0]
        const y = point[1]
        return Math.abs(x) + Math.abs(y)
    }

    findMinSignalDelay() {
        let minSignalDelay = Number.MAX_SAFE_INTEGER
        const wire1Points = this.wire1.points
        const wire2Points = this.wire2.points
        for (let intersection of this.intersections){
            const signalDelay = wire1Points.get(intersection) + wire2Points.get(intersection)
            minSignalDelay = Math.min(signalDelay, minSignalDelay)
        }
        return minSignalDelay
    }
}

module.exports = Grid