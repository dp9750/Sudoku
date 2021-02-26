class Cell {

    constructor(val, x, y) {
        this.val = val;
        this.obj = $('input[data-x="' + x + '"][data-y="' + y + '"]');
        this.disabled = val != 0
    }

    print() {
        if (this.val == 0)
            return "";
        return this.val + "";
    }

    set_val(val) {
        if (val == 0)
            this.disabled = false;

        if (!this.disabled) {
            this.val = val;
            this.obj.val(val);
        }
    }

}
