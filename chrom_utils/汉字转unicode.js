String.prototype.toUnicode = function () {
    let s = this;
    let out = [];
    for (let i = 0; i < s.length; i++) {
        out.push(s.charCodeAt(i).toString(16));
    }
    return "\\u" + out.join("\\u");
};