const fs = require('fs')

function readInput() {
    return fs.readFileSync('input.txt', 'utf8').split(',').map(Number)
}

// Process the given opcode and returns the position of the next opcode
function processOpcode(program, index) {
    const op = program[index]
    // halt
    if (op === 99) {
        return -1
    }
    else if (op === 1 || op === 2) {
        const val1_i = program[index+1]
        const val2_i = program[index+2]
        const ans_i = program[index+3]
        // addition
        if (op === 1) {
            program[ans_i] = program[val1_i] + program[val2_i]
        } else {
            // multiplication
            program[ans_i] = program[val1_i] * program[val2_i]
        }
        return index + 4
    } 
    else {
        // invalid opcode
        return -2
    }
}

function processIntcode(noun, verb) {
    const program = readInput()
    program[1] = noun
    program[2] = verb
    let i = 0

    while (i < program.length) {
        let next_op = processOpcode(program, i)
        if (next_op < 0) {
            return program[0]
        } else {
            i = next_op
        }
    }
}

function part1Ans() {
    const answer = processIntcode(12, 2)
    console.log(answer) 
}

function part2Ans() {
    const output = 19690720
    let noun, verb
    loop:
        for (noun = 0; noun < 100; noun++) {
            for (verb = 0; verb < 100; verb++) {
                if (processIntcode(noun, verb) === output) {
                    break loop;
                }
            }
        }
    console.log('noun is ' + noun + ' and verb is ' + verb)
    const answer = 100 * noun + verb
    console.log('Answer for part 2: ' + answer)
}

// part1Ans()
part2Ans()
