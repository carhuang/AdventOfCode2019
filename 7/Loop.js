const IntcodeComputer = require('./IntcodeComputer')

class Loop {
    constructor(software, settings) {
        this.ampQueue = []
        const ids = ['A', 'B', 'C', 'D', 'E']
        for (let i = 0; i < settings.length; i++) {
            const amp = new IntcodeComputer(Array.from(software), ids[i])
            amp.setInput(settings[i])
            amp.run()
            this.ampQueue.push(amp)
        }
    }

    thrust() {
        let input = 0
        while (this.ampQueue.length) {
            let currentAmp = this.ampQueue.shift()
            currentAmp.setInput(input)
            currentAmp.hasInput = true
            currentAmp.running = true
            currentAmp.run()
            input = currentAmp.getOutput()
            // console.log("output " + input + " from amp " + currentAmp.id)
            if (currentAmp.PC >= 0) {
                this.ampQueue.push(currentAmp)
            }
        }
        return input
    }


}

module.exports = Loop