class Sudoku {

    /*
    size
    board
    possibilities
    solved
    x
    y
    obj
    cor
    */

    constructor() {
        this.cor = 0;                   // Correctly placed
        this.size = 9;                  // Size of the board
        this.treshhold = 40;            // Number of empty numbers
        this.possibilities = [1,2,3,4,5,6,7,8,9];       // Possible numbers to place

        this.create_empty();            // Create a board of 0's
        this.generate();                // Generate a unique sudoku

        this.solved = this.copy();      // Copy and save solution

        this.harden();                  // Remove random numbers from board
        this.print();                   // Show board
    }

    create_empty() {
        this.board = [];

        for (let y = 0; y < 9; y++) {
            this.board[y] = [];
            for (let x = 0; x < 9; x++)
                this.board[y][x] = new Cell(0);
        }
    }

    possible(x, y, n) {
        // row
        for (let i = 0; i < 9; i++)
            if (this.board[y][i].val == n)
                return false;

        // column
        for (let i = 0; i < 9; i++)
            if (this.board[i][x].val == n)
                return false;

        // box
        let sx = Math.floor(x / 3) * 3;
        let sy = Math.floor(y / 3) * 3;

        for (let j = 0; j < 3; j++)
            for (let i = 0; i < 3; i++)
                if (this.board[sy + j][sx + i].val == n)
                    return false;

        return true;
    }

    generate() {

        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {

                let possibilities = [...this.possibilities]
                for (let i = 0; i < possibilities.length; i++)
                    if (!this.possible(x, y, possibilities[i]))
                        possibilities.splice(i, 1);

                let index = Math.floor(Math.random() * possibilities.length);
                let n = possibilities[index];
                possibilities.splice(index, 1);

                let error = false;

                while (!this.possible(x, y, n)) {
                    if (possibilities.length > 0) {
                        index = Math.floor(Math.random() * possibilities.length);
                        n = possibilities[index];
                        possibilities.splice(index, 1);
                    } else {
                        x = -1;
                        for (let i = 0; i < 9; i++)
                            this.board[y][i].set_val(0);
                        error = true;
                        break;
                    }
                }

                if (!error)
                    this.board[y][x].set_val(n);

            }
        }

    }

    print() {
        let str = "";

        for (let y = 0; y < 9; y++) {
            str += "<tr>";
            for (let x = 0; x < 9; x++)
                if (this.board[y][x].val != 0)
                    str += "<td><input type='number' data-y='" + y + "' data-x='" + x + "' value='" + this.board[y][x].val + "' disabled></td>";
                else
                    str += "<td><input type='number' data-y='" + y + "' data-x='" + x + "'></td>";
            str += "</tr>";
        }

        $("#field").html(str);
    }

    rnd() {
        return Math.floor(Math.random() * 9)
    }

    harden() {
        let empty = 1;
        let copy = this.copy();

        while (this.solve(copy) && empty <= this.treshhold) {

            let x = this.rnd()
            let y = this.rnd()

            while (this.board[y][x].val == 0) {
                x = this.rnd()
                y = this.rnd()
            }

            this.board[y][x].set_val(0);
            copy = this.copy();
            empty++;

        }
    }

    is_possible(board, row, col, k) {
        for (let i = 0; i < 9; i++) {
            const v = 3 * Math.floor(row / 3)
            const m = v + Math.floor(i / 3);
            const n = v + i % 3;
            if (board[row][i] == k || board[i][col] == k || board[m][n] == k)
                return false;
        }
        return true;
    }

    solve(board) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j].val == 0) {
                    for (let k = 1; k <= 9; k++) {
                        if (this.is_possible(board, i, j, k)) {
                            board[i][j].set_val(k);
                            if (this.solve(board)) {
                                return true;
                            } else {
                                board[i][j].set_val(0);
                            }
                        }
                    }
                    return false;
                }
            }
       }
       return true;
    }

    copy() {
        let copy = [];
        for (let y = 0; y < 9; y++) {
            copy[y] = [];
            for (let x = 0; x < 9; x++)
                copy[y][x] = new Cell(this.board[y][x].val);
        }
        return copy;
    }

    select_field(y, x) {
        this.y = y;
        this.x = x;
        this.obj = $('input[data-x="' + this.x + '"][data-y="' + this.y + '"]');
    }

    get_value() {
        return this.obj.val();
    }

    set_value(val) {
        this.board[this.y][this.x].set_val(parseInt(val));
    }

    is_valid() {
        return this.board[this.y][this.x].val == this.solved[this.y][this.x].val;
    }

    set_final() {
        this.cor++;
        this.obj.prop('disabled', true);

        if (this.cor == this.treshhold) {
            alert("Gotovo!!!");
        }
    }

    set_error() {
        this.obj.addClass("border border-danger");
    }

    remove_error() {
        this.obj.removeClass("border border-danger");
    }

}
