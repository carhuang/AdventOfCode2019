class IntcodeComputer {
    constructor(program) {
        this.program = program
        this.running = true
        this.hasInput = true
        this.relativeBase = 0
        this.input = 0
        this.output = 0
        this.PC = 0
    }

    setInput(input) {
        this.input = input 
    }

    getOutput() {
        return this.output
    }

    run() {
        while (this.running) {
            this.processOpcode()
        }
    }

    processOpcode() {
        const opcode = this.program[this.PC] % 100
        const index = this.program[this.PC+1]

        switch (opcode) {
            case 99:
                //halt
                this.running = false
                this.PC = -1
                break;
            case 1:
                // addition
                this.compute(1)
                this.PC += 4
                break;
            case 2:
                // multiplication
                this.compute(2)
                this.PC += 4;
                break;
            case 3:
                // input
                if (this.hasInput) {
                    const mode = this.getMode()
                    this.program[this.getIndex(index, mode)] = this.input
                    this.hasInput = false
                    this.PC += 2
                } else {
                    this.running = false
                }
                break;
            case 4:
                // output
                this.outPut(index)
                this.PC += 2
                break;
            case 5:
                this.doConditionalJump(5)
                break;
            case 6:
                this.doConditionalJump(6)
                break;
            case 7:
                this.compute(7)
                this.PC += 4
                break;
            case 8:
                this.compute(8)
                this.PC += 4
                break;
            case 9:
                this.adjustRelativeBase(index)
                this.PC += 2
                break;
            default:
                // invalid opcode
                this.PC++
        }
    }

    outPut(address) {
        const mode = this.getMode()
        this.output = this.program[this.getIndex(address, mode)]
        console.log(this.output)
    }

    getMode() {
        return (this.program[this.PC] / 100) | 0
    }

    getDigitFromRight(number, position) {
        return Math.floor((number / Math.pow(10, position - 1)) % 10)
    }

    adjustRelativeBase(param) {
        const mode = this.getMode()
        const offset = this.getValue(mode, param)

        this.relativeBase += offset
    }

    doConditionalJump(condition) {
        const modes = this.getMode()
        const mode_1 = this.getDigitFromRight(modes, 1)
        const mode_2 = this.getDigitFromRight(modes, 2)
        const param_1 = this.program[this.PC+1]
        const param_2 = this.program[this.PC+2]
        const value_1 = this.getValue(mode_1, param_1)
        const value_2 = this.getValue(mode_2, param_2)

        switch (condition) {
            case 5: 
                if (value_1) {
                    return this.PC = value_2
                } 
                break;
            case 6:
                if (value_1 === 0) {
                    return this.PC = value_2
                }
                break;
            default:    
        }
        this.PC += 3;
    }

    getIndex(index, mode) {
        return mode === 2 ? (this.relativeBase + index) : index
    }

    compute(operation) {
        const modes = this.getMode()
        const mode_1 = this.getDigitFromRight(modes, 1)
        const mode_2 = this.getDigitFromRight(modes, 2)
        const mode_3 = this.getDigitFromRight(modes, 3)
        const param_1 = this.program[this.PC+1]
        const param_2 = this.program[this.PC+2]
        const param_3 = this.program[this.PC+3]

        const value_1 = this.getValue(mode_1, param_1)
        const value_2 = this.getValue(mode_2, param_2)
        const ans_index = this.getIndex(param_3, mode_3)
        switch (operation) {
            case 1:
                this.program[ans_index] = value_1 + value_2
                break;
            case 2:
                this.program[ans_index] = value_1 * value_2
                break;
            case 7:
                this.program[ans_index] = (value_1 < value_2) ? 1 : 0
                break;
            case 8:
                this.program[ans_index] = (value_1 === value_2) ? 1 : 0
                break;
            default:
                return;
        }       
    }

    getValue(mode, param) {
        switch (mode){
            case 0:
                return (this.program[param] === undefined) ? 0 : this.program[param]
            case 1:
                return param
            case 2:
                return (this.program[this.relativeBase + param] === undefined) ?
                    0 : this.program[this.relativeBase + param]
            default:
                break
        }
    }
}

module.exports = IntcodeComputer