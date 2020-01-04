const range_start = 206938
const range_end = 679128

// Check given password from left to right to see if it satisfies the criteria in part one
function isValidOne(password) {
    let hasDouble = false
    let ptr = 0
    for (let i = 1; i < 6; i++) {
        if (password[i] < password[ptr]) {
            return false
        }
        else if (password[i] === password[ptr]) {
            hasDouble = true
        }
        ptr++
    }
    console.log(password + "is" + hasDouble + '\n')
    return hasDouble
}

// Check given password from left to right to see if it satisfies the criteria in part two
function isValidTwo(password) {
    let hasDouble = false
    let digitCount = 1
    let ptr = 0
    for (let i = 1; i < 6; i++) {
        if (password[i] < password[ptr]) {
            return false
        }
        else if (password[i] === password[ptr]) {
            digitCount++
        }
        else {
            if ((digitCount == 2)) {
                hasDouble = true
            }
            digitCount = 1
        }
        ptr++
    }
    if (!hasDouble) {
        hasDouble = (digitCount == 2)
    }
    return hasDouble
}

// Computer the number of potential passwords within the given range
function findPotentialPasswords(start, end) {
    let counter = 0;
    for (let i = start; i <= end; i++) {
        // Part one
        // if (isValidOne(i.toString())) {
        //     counter++
        // }
        // Part two
        if (isValidTwo(i.toString())) {
            counter++
        }
    }
    return counter
}

const number = findPotentialPasswords(range_start, range_end)
console.log(number + " passwords meet the given critera.")