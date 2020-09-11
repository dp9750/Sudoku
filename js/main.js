$(document).ready(() => {
    
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

    $("#restart").click(() => {
        sudoku = new Sudoku();
    });

});