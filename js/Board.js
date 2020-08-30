class Board {

    constructor(field) {
        this.field = field;         // The game field
        this.size = field.length;   // Size of the field
        
        this.solved = [];           // The solved field
        this.copy();                // Copy field
        this.solve(this.solved);    // Solve the copied field
    }

    print_field() {
        var str = "";

        for (var y = 0; y < this.size; y++) {
            str += "<tr>";
            for (var x = 0; x < this.size; x++) 
                if (this.field[y][x] != 0)
                    str += "<td><input type='number' data-y='" + y + "' data-x='" + x + "' value='" + this.field[y][x] + "'></td>";
                else 
                    str += "<td><input type='number' data-y='" + y + "' data-x='" + x + "'></td>";
            str += "</tr>";
        }

        $("#field").html(str);
    }

    is_possible(board, row, col, k) {
        for (let i = 0; i < 9; i++) {
            const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const n = 3 * Math.floor(col / 3) + i % 3;
            if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
              return false;
            }
        }
        return true;
    }

    copy() {
        for (var i = 0; i < this.size; i++)
            this.solved[i] = this.field[i].slice();
    }
    
    solve(field) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (field[i][j] == 0) {
                    for (let k = 1; k <= 9; k++) {
                        if (this.is_possible(field, i, j, k)) {
                            field[i][j] = k;
                            if (this.solve(field)) {
                                return true;
                            } else {
                                field[i][j] = 0;
                            }
                        }
                    }
                    return false;
                }
            }
       }
       return true;
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
        this.field[this.y][this.x] = parseInt(val);

        if (val == 0)
            val = "";
        this.obj.val(val);
    }

    is_valid() {
        return this.field[this.y][this.x] == this.solved[this.y][this.x];
    }

    set_error() {
        this.obj.addClass("border border-danger");
    }

    remove_error() {
        this.obj.removeClass("border border-danger");
    }

}