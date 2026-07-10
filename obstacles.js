var obstacles = [];
var spawnTimer = 0;
var spawnInterval = 1.1;

function spawnObstacle(canvas, scrollSpeed) {
    var w = 60 + Math.random() * 120;
    var x = Math.random() * (canvas.width - w);
    obstacles.push({
        x: x, y: -40, w: w, h: 22,
        speed: scrollSpeed * (0.9 + Math.random() * 0.3),
    });
}

function updateObstacles(dt, canvas, depth){
    spawnTimer += dt;
    spawnInterval = Math.max(0.45, 1.1 - depth * 0.002);
    if (spawnTimer > spawnInterval){
        spawnTimer = 0;
        spawnObstacle(canvas, scrollSpeed);
    }
    for(var i=0; i < obstacles.length; i++){
        obstacles[i].y +=obstacles[i].speed * dt;
    }
    obstacles = obstacles.filter(function(o) {
        return o.y < canvas.height + 60;
    })
}
function drawObstacles(ctx) {
    ctx.fillStyle = '#3a6b5c';
    for (var i = 0; i < obstacles.length; i++) {
        ctx.fillRect(obstacles[i].x, obstacles[i].y,
        obstacles[i].w, obstacles[i].h);
    }
}

function circleRectCollide(cx, cy, r, rx, ry, rw, rh){
    var closestX = Math.max(rx, Math.min(cx, rx + rw));
    var closestY = Math.max(ry, Math.min(cy, ry + rh));
    var dx = cx - closestX;
    var dy = cy - closestY;
    return (dx * dx + dy * dy) < (r * r);
}

function checkCollisions(){
    for (var i = 0; i < obstacles.length; i++){
        var o = obstacles[i];
        if (circleRectCollide(player.x, player.y,
        player.radius, o.x, o.y, o.w, o.h)){
            gameOver();
            return;
        }
    }
}