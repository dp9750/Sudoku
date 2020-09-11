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
        this.treshhold = (this.size * this.size) / 2;   // Number of empty numbers
        this.possibilities = [1,2,3,4,5,6,7,8,9];       // Possible numbers to place

        this.create_empty();            // Create a board of 0's
        this.generate();                // Generate a unique sudoku

        this.solved = this.copy();      // Copy and save solution

        this.harden();                  // Remove random numbers from board
        this.print();                   // Show board
    }

    create_empty() {
        this.board = [];

        for (var y = 0; y < this.size; y++) {
            this.board[y] = [];
            for (var x = 0; x < this.size; x++)
                this.board[y][x] = new Cell(0);
        }
    }

    possible(x, y, n) {

        // row
        for (var i = 0; i < this.size; i++)
            if (this.board[y][i].val == n)
                return false;

        // column
        for (var i = 0; i < this.size; i++)
            if (this.board[i][x].val == n)
                return false;

        // box
        var sx = Math.floor(x / 3) * 3;
        var sy = Math.floor(y / 3) * 3;

        for (var j = 0; j < 3; j++) 
            for (var i = 0; i < 3; i++) 
                if (this.board[sy + j][sx + i].val == n)
                    return false;

        return true;
    }

    generate() {

        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {

                var moznosti = [...this.possibilities]
                for (var i = 0; i < moznosti.length; i++)
                    if (!this.possible(x, y, moznosti[i]))
                        moznosti.splice(i, 1);

                var index = Math.floor(Math.random() * moznosti.length);
                var n = moznosti[index];
                moznosti.splice(index, 1);

                var error = false;

                while (!this.possible(x, y, n)) {
                    if (moznosti.length > 0) {
                        index = Math.floor(Math.random() * moznosti.length);
                        n = moznosti[index];
                        moznosti.splice(index, 1);
                    } else {
                        x = -1;
                        for (var i = 0; i < this.size; i++)
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
        var str = "";

        for (var y = 0; y < this.size; y++) {
            str += "<tr>";
            for (var x = 0; x < this.size; x++) 
                if (this.board[y][x].val != 0)
                    str += "<td><input type='number' data-y='" + y + "' data-x='" + x + "' value='" + this.board[y][x].val + "' disabled></td>";
                else 
                    str += "<td><input type='number' data-y='" + y + "' data-x='" + x + "'></td>";
            str += "</tr>";
        }

        $("#field").html(str);
    }

    harden() {
        var empty = 1;
        var copy = this.copy();

        while (this.solve(copy) && empty <= this.treshhold) {

            var x = Math.floor(Math.random() * this.size);
            var y = Math.floor(Math.random() * this.size);

            while (this.board[y][x].val == 0) {
                x = Math.floor(Math.random() * this.size);
                y = Math.floor(Math.random() * this.size);
            }

            this.board[y][x].set_val(0);
            copy = this.copy();
            empty++;

        }
    }

    is_possible(board, row, col, k) {
        for (var i = 0; i < 9; i++) {
            const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const n = 3 * Math.floor(col / 3) + i % 3;
            if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
              return false;
            }
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
        var copy = [];
        for (var y = 0; y < this.size; y++) {
            copy[y] = [];
            for (var x = 0; x < this.size; x++) 
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