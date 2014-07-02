var IntermediateAI = {};

function countInRow(grid, r) {
    var counts = {};
    counts[X] = 0;
    counts[O] = 0;
    counts[E] = 0;

    for (var c = 0; c < 3; c++) {
        counts[grid[r][c]]++;
    }

    return counts;
}

function findEmptyInRow(grid, r) {
    for (var c = 0; c < 3; c++) {
        if (grid[r][c] === E) {
            return c;
        }
    }
    return -1;
}

function countInColumn(grid, c) {
    var counts = {};
    counts[X] = 0;
    counts[O] = 0;
    counts[E] = 0;

    for (var r = 0; r < 3; r++) {
        counts[grid[r][c]]++;
    }

    return counts;
}

function findEmptyInColumn(grid, c) {
    for (var r = 0; r < 3; r++) {
        if (grid[r][c] === E) {
            return r;
        }
    }
    return -1;
}

function countInLeftDiagonal(grid, player) {
    var counts = {};
    counts[X] = 0;
    counts[O] = 0;
    counts[E] = 0;

    for (var i = 0; i < 3; i++) {
        counts[grid[i][i]]++;
    }

    return counts;
}

function findEmptyInLeftDiagonal(grid) {
    for (var i = 0; i < 3; i++) {
        if (grid[i][i] === E) {
            return {r: i, c: i};
        }
    }
    return null;
}

function countInRightDiagonal(grid, player) {
    var counts = {};
    counts[X] = 0;
    counts[O] = 0;
    counts[E] = 0;

    for (var i = 0; i < 3; i++) {
        counts[grid[2 - i][i]]++;
    }

    return counts;
}

function findEmptyInRightDiagonal(grid) {
    for (var i = 0; i < 3; i++) {
        if (grid[2 - i][i] === E) {
            return {r: 2 - i, c: i};
        }
    }
    return null;
}

function findTwoInARow (grid, player) {
    for (var r = 0; r < 3; r++) {
        var counts = countInRow(grid, r);
        if (counts[player] === 2 && counts[E] === 1) {
            return {"r": r, "c": findEmptyInRow(grid, r)};
        }
    }

    for (var c = 0; c < 3; c++) {
        var counts = countInColumn(grid, c);
        if (counts[player] === 2 && counts[E] === 1) {
            return {"r": findEmptyInColumn(grid, c), "c": c};
        }
    }

    var counts = countInLeftDiagonal(grid);
    if (counts[player] === 2 && counts[E] === 1) {
        return findEmptyInLeftDiagonal(grid);
    }

    var counts = countInRightDiagonal(grid);
    if (counts[player] === 2 && counts[E] === 1) {
        return findEmptyInRightDiagonal(grid);
    }

    return null;
}

IntermediateAI.makeMove = function (grid, player, opr, opc) {
    var pos = findTwoInARow(grid, player);

    if (pos != null) {
        return pos; 
    }

    pos = findTwoInARow(grid, -player);

    if (pos != null) {
        return pos;
    }

    return pickRandomly(grid);
}
