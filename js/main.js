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
    
    var sudoku = new Sudoku();

    $("td input").click((e) => {

        const x = e.target.getAttribute('data-x');
        const y = e.target.getAttribute('data-y');
        
        sudoku.select_field(y, x);

    });

    $("td input").keyup(() => {
        const val = sudoku.get_value();

        if (val > 0 && val <= 9) {
            sudoku.set_value(val);
            if (sudoku.is_valid()) {
                sudoku.set_final();
                sudoku.remove_error();
            } else {
                sudoku.set_error(); 
            }             
        } else {
            sudoku.set_value(0);
            sudoku.remove_error();
        }

    });

});