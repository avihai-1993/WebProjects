function calcAdjacentPosIn2D(i, j, dir, step = 1) {
    if (!['U', 'D', 'R', 'L'].includes(dir)) {
        return [null, null];
    }

    if (dir === 'U') {
        return [i - step, j];
    }

    if (dir === 'D') {
        return [i + step, j];
    }

    if (dir === 'R') {
        return [i, j + step];
    }

    if (dir === 'L') {
        return [i, j - step];
    }
}

function findWordViaPathhelperBlock(matrix, visited, startI, startJ, word, pos, dir) {
    let [k, l] = calcAdjacentPosIn2D(startI, startJ, dir);
    let item = `${k},${l}`
    try {
        if (matrix[k][l] === word[pos] && !visited.has(item)) {
            //console.log( k, l, pos)
            visited.add(item)
            return findWordViaPath(matrix, visited, k, l, word, pos + 1);
        }
    } catch (error) {
        //console.log(`no way to ${k} : ${l}`)
    }
    return false
}

function findWordViaPath(matrix, visited, startI, startJ, word, pos) {

    if (pos === word.length) {
        visited.add(`${startI},${startJ}`)
        return true;
    }



    let u = findWordViaPathhelperBlock(matrix, visited, startI, startJ, word, pos, 'U')
    //console.log(`U done`)
    let d = findWordViaPathhelperBlock(matrix, visited, startI, startJ, word, pos, 'D')
    //console.log(`D done`)
    let r = findWordViaPathhelperBlock(matrix, visited, startI, startJ, word, pos, 'R')
    //console.log(`R done`)
    let l = findWordViaPathhelperBlock(matrix, visited, startI, startJ, word, pos, 'L')
    //console.log(`L done`)

    if (!(u || d || r || l)) {
        visited.delete(`${startI},${startJ}`)
    }


    return u || d || r || l

}

function searchWord(matrix, word, fn = null) {
    const head = word[0];
    const visited = new Set()
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            refresh()
            visited.clear()
            if (matrix[row][col] === head) {

                let res = findWordViaPath(matrix, visited, row, col, word, 1);
                if (res) {
                    if (fn != null) {
                        fn(row, col)
                        visited.forEach((e) => {
                            let tuple = e.split(",");
                            fn(tuple[0], tuple[1])
                        })
                    }
                    return true;
                }
            }
        }
    }

    return false;
}
