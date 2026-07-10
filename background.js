function getBackgroundColor(depth) {
    var t = Math.min(depth / 2000, 1);
    var r = Math.round(20 + (5 - 20) * t);
    var g = Math.round(90+ (5-90) * t);
    var b = Math.round(160 + (20 - 160) * t);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}