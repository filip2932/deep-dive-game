var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var hud = document.getElementById('hud');
var startScreen = document.getElementById('start-screen');
var deathScreen = document.getElementById('death-screen');
var deathMsg = document.getElementById('death-msg');
var startBtn = document.getElementById('start-btn');
var retryBtn = document.getElementById('retry-btn');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

var gameState = 'ready';
var depth = 0;
var lastTime = 0;
var scrollSpeed = 120;

var keys = {};

startBtn.addEventListener('click', function(){
    startGame();
});

retryBtn.addEventListener('click', function(){
    startGame();
});

window.addEventListener('keydown', function(e){
    keys[e.key] = true;
    if (e.key === ' ' && gameState !== 'playing') startGame();
});

window.addEventListener('keyup', function(e){
     keys[e.key] = false;
});

function updateScroll(dt){
    depth += (scrollSpeed * dt) / 20;
    scrollSpeed = 120 + depth * 0.6;
    hud.textContent = 'Depth: ' + Math.floor(depth) + 'm';
}
function startGame(){
    gameState = 'playing';
    depth = 0;
    scrollSpeed = 120;
    obstacles = [];
    spawnTimer = 0;
    resetPlayer(canvas);
    startScreen.style.display = 'none';
    deathScreen.style.display = 'none';
}

function gameOver(){
    gameState = 'dead';
    deathMsg.textContent = 'You sank ' + Math.floor(depth) + 'm';
    deathScreen.style.display = 'flex';
}

function loop(timestamp){
var dt = Math.min((timestamp - lastTime) / 1000, 0.05);
lastTime = timestamp;
ctx.fillStyle = getBackgroundColor(depth);
ctx.fillRect(0, 0, canvas.width, canvas.height);
if (gameState === 'playing'){
    updatePlayer(dt, canvas);
    updateScroll(dt);
    updateObstacles(dt, canvas, depth);
    checkCollisions();
}
drawObstacles(ctx);
drawPlayer(ctx);
requestAnimationFrame(loop);
}
requestAnimationFrame(loop);