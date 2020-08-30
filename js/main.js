$(document).ready(() => {

    var field = [
        [9,7,0, 0,0,8, 0,0,0],
        [6,0,0, 0,0,0, 0,8,0],
        [5,8,0, 0,9,0, 0,0,0],
        [0,0,0, 8,5,0, 1,0,0],
        [0,5,6, 7,0,9, 8,3,0],
        [0,0,8, 0,4,6, 0,0,0],
        [0,0,0, 0,1,0, 0,2,8],
        [0,2,0, 0,0,0, 0,0,7],
        [0,0,0, 5,0,0, 0,6,3]
    ];
    
    var board = new Board(field);
    board.print_field();

    $("td input").click((e) => {

        const x = e.target.getAttribute('data-x');
        const y = e.target.getAttribute('data-y');
        
        board.select_field(y, x);

    });

    $("td input").keyup(() => {
        const val = board.get_value();
        
        if (val > 0 && val < 10) {
            board.set_value(val);
            if (board.is_valid()) 
                board.remove_error();
            else 
                board.set_error();
        } else {
            board.set_value(0);
            board.remove_error();
        }

    });

});
































/*
function possible(y, x, n) {

    // Check row
    for (var i = 0; i < size; i++)
        if (field[y][i] == n)
            return false;

    // Check column
    for (var i = 0; i < size; i++)
        if (field[i][x] == n)
            return false;

    var sx = Math.floor(x / 3) * 3;
    var sy = Math.floor(y / 3) * 3;

    // Check the square
    for (var j = 0; j < 3; j++)
        for (var i = 0; i < 3; i++)
            if (field[sy + j][sx + i] == n)
                return false;
    
    return true;
}

function solve() {

    for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
            if (field[y][x] == 0) {
                for (var n = 1; n <= size; n++) {
                    if (possible(y, x, n)) {
                        field[y][x] = n;
                        solve();
                        field[y][x] = 0;
                    }
                }
                return;
            }
        }
    }
    
    field[1][1] = 4;
    console.log("done " + field);
    console.log(field);
}
*/