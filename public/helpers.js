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