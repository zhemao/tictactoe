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
