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
