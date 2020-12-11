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
                break;
            case 2:
                // multiplication
                this.compute(2)
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
                this.running = false
                break;
            case 5:
                // jump if true
                this.doConditionalJump(5)
                break;
            case 6:
                // jump if false
                this.doConditionalJump(6)
                break;
            case 7:
                // less than
                this.compute(7)
                break;
            case 8:
                // equals
                this.compute(8)
                break;
            case 9:
                // change relative base
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
        if (mode === 1) {
            this.output = address
        } else {
            this.output = this.program[this.getIndex(address, mode)]
        }
        this.PC += 2
    }

    getMode() {
        return (this.program[this.PC] / 100) | 0
    }

    getDigitFromRight(number, position) {
        return Math.floor((number / Math.pow(10, position - 1)) % 10)
    }

    /**
     * Add to relative base by the value of param
     * @param param
     */
    adjustRelativeBase(param) {
        const mode = this.getMode()
        const offset = this.getValue(mode, param)

        this.relativeBase += offset
    }

    /**
     * Update PC by 3 if no jump occurs
     * Opcode 5: update PC to value of param2 if param1 != 0
     * Opcode 6: update PC to value of param2 if param1 == 0
     * @param condition opcode 5 or 6
     */
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

    /**
     * Upgrade PC after completing one of the operations below.
     * Opcode 1: Store result of addition of param1 and param2 to position[param3]
     * Opcode 2: Store result of multiplication of param1 and param2 to position[param3]
     * Opcode 7: if param1 < param 2, position[param3] = 1; else position[param3] = 0
     * Opcode 8: if param1 == param2, position[param3] = 1; else position[param3] = 0
     * @param operation Opcode 1, 2, 7, or 8
     */
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
        this.PC += 4
    }

    getValue(mode, param) {
        switch (mode){
            case 0:
                return (typeof this.program[param] === 'undefined') ? 0 : this.program[param]
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