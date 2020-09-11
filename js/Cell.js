class Cell {

    /*
    val
    disabled
    obj
    */

    constructor(val, x, y) {
        this.val = val;
        // this.x = x;
        // this.y = y;
        this.obj = $('input[data-x="' + x + '"][data-y="' + y + '"]');

        if (val == 0)
            this.disabled = false;
        else 
            this.disabled = true;
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