function abs(x) {
    return (x > 0 ? x : -1*x);
}

Array.prototype.remove = function(elem) {
    var index = this.indexOf(elem);

    if (index === -1) {
        alert(elem + " does not appear in " + this);
    } else {
        this.splice(index, 1);
    }
};

Array.prototype.remove_largest = function(elem) {
    let max;
    let index;
    for (let i = 0; i < this.length; ++i) {
        if (this[i] > max) {
            max = this[i];
            index = i;
        }
    }
    this.splice(index, 1);
}