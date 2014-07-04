var EasyAI = {};

function pickRandomly(grid) {
    var move = {};

    do {
        var num = Math.floor(9 * Math.random());
        move.r = num % 3;
        move.c = Math.floor(num / 3);
    } while (grid[move.r][move.c] != E);

    return move;
}

EasyAI.makeMove = function (grid, player) {
    return pickRandomly;
}
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

IntermediateAI.makeMove = function (grid, player) {
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
var AdvancedAI = {};

AdvancedAI.makeMove = function (grid, player) {
    var pos = findTwoInARow(grid, player);

    if (pos != null) {
        return pos;
    }

    pos = findTwoInARow(grid, -player);

    if (pos != null) {
        return pos;
    }

    if (grid[1][1] === E) {
        return {"r": 1, "c": 1};
    }

    for (var r = 0; r < 3; r += 2) {
        for (var c = 0; c < 3; c += 2) {
            if (grid[r][c] === E) {
                return {"r": r, "c": c};
            }
        }
    }

    return pickRandomly(grid);
}
/*
 * This is the main javascript file. The code for your Tic-Tac-Toe program
 * should go in here.
 */

var X = -1;
var O = 1;
var E = 0;

var grid = [[E, E, E], [E, E, E], [E, E, E]];

var player = X;
var gameover = false;

var AI = AdvancedAI;

function playerString(val) {
    if (val === X) {
        return "X";
    }
    if (val === O) {
        return "O";
    }
    return "";
}

function hasWon(r, c) {
    // check the row
    if (grid[r][0] === grid[r][1] && grid[r][1] === grid[r][2]) {
        return true;
    }

    // check the column
    if (grid[0][c] === grid[1][c] && grid[1][c] === grid[2][c]) {
        return true;
    }

    // check the diagonal starting at top left
    if (r === c && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
        return true;
    }

    // check that the cell is in the other diagonal
    if ((2 - r) != c) {
        return false;
    }

    // check the other diagonal
    return grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0];
}

function isDraw() {
    for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === E) {
                return false;
            }
        }
    }
    return true;
}

function fillCell(r, c, val) {
    // fill the cell
    grid[r][c] = val;
    $("#" + r + "" + c).text(playerString(val));

    if (hasWon(r, c)) {
        $("#status-message").text(
                "Player " + playerString(val) + " has won");
        gameover = true;
        return true;
    }
    if (isDraw()) {
        $("#status-message").text("It's a draw");
        gameover = true;
        return true;
    }
    return false
}

function handleClick(ev) {
    if (gameover) {
        return;
    }

    // clear the error message
    $("#error-message").text("");

    // get the row and column out of the id
    var id = ev.target.id;
    var r = parseInt(id[0]);
    var c = parseInt(id[1]);

    // make sure that the cell is empty
    if (grid[r][c] != E) {
        $("#error-message").text("Cell is not empty");
        return;
    }

    // fill the cell
    if (fillCell(r, c, player))
        return;

    var move = AI.makeMove(grid, -player);
    fillCell(move.r, move.c, -player);
}

function setup() {
    // This function will be run once at the beginning
    // Put any one-time setup code here.
    $("td").click(handleClick);
}

// This tells the browser to run the "setup" function once the HTML document
// is finished loading.
$(document).ready(setup);
