var player = {
    x: 0, y: 0, radius: 14, vx: 0, speed: 320,
};
function resetPlayer(canvas){
    player.x = canvas.width / 2;
    player.y = canvas.height * 0.35;
    player.vx = 0;
}
function updatePlayer(dt, canvas){
var dir = 0;
if (keys['ArrowLeft'] || keys['a']) dir -= 1;
if (keys['ArrowRight'] || keys['d']) dir += 1;
player.vx = dir * player.speed;
player.x += player.vx * dt;
var margin = player.radius;
if (player.x < margin) player.x = margin;
if (player.x > canvas.width - margin) {
    player.x = canvas.width - margin;
}
}

function drawPlayer(ctx){
    ctx.save();
    ctx.fillStyle = '#ffd166';
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(player.x, player.y + 200);
    ctx.stroke();
    ctx.restore();
}