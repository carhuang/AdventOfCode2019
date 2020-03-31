const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').split(',').map(Number)
}

class IntcodeComputer {
    constructor(program) {
        this.program = program
        this.input = 0
        this.PC = 0
    }

    run(input) {
        this.input = input
        while (this.PC >= 0 && this.PC < this.program.length) {
            this.processOpcode()
        }
    }

    processOpcode() {
        const opcode = this.program[this.PC] % 100
        const index = this.program[this.PC+1]
        let modes = 0

        switch (opcode) {
            case 99:
                //halt
                this.PC = -1
                break;
            case 1:
                // compute
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
                this.program[index] = this.input
                this.PC += 2
                return;
            case 4:
                // output
                this.output(this.program[index])
                this.PC += 2
                break;
            case 5:
                this.doConditionalJump(5)
                break;
            case 6:
                this.doConditionalJump(6)
                break;
            case 7:
                this.compute(7, modes)
                this.PC += 4
                break;
            case 8:
                this.compute(8, modes)
                this.PC += 4
                break;
            default:
                // invalid opcode
                this.PC++
        }
    }

    output(value) {
        console.log(value)
    }

    doConditionalJump(condition) {
        const modes = (this.program[this.PC] / 100) | 0
        const mode_1 = modes % 10
        const mode_2 = Math.floor((modes / 10) % 10)
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
                if (value_1 == 0) {
                    return this.PC = value_2
                }
                break;
            default:    
        }
        this.PC += 3;
    }

    compute(operation) {
        const modes = (this.program[this.PC] / 100) | 0
        const mode_1 = modes % 10
        const mode_2 = Math.floor((modes / 10) % 10)
        const param_1 = this.program[this.PC+1]
        const param_2 = this.program[this.PC+2]
        const ans_index = this.program[this.PC+3]

        const value_1 = this.getValue(mode_1, param_1)
        const value_2 = this.getValue(mode_2, param_2)
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
                this.program[ans_index] = (value_1 == value_2) ? 1 : 0
                break;
            default:
                return;
        }       
    }

    getValue(mode, param) {
        return mode ? param : this.program[param]
    }
}

function ans() {
    const program = readInput()
    const TEST = new IntcodeComputer(program)
    const input1 = 1
    const input2 = 5
    TEST.run(input2)
}

ans()
