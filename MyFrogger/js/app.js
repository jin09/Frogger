// x directions = columns
var width = 505;
var numCols = 5;
var colStep = 101;

// y directions = rows
var height = 606;
var numRows = 6;
var rowStep = 83;
var minEnemyRow = 1;
var maxEnemyRow = 3;

// speed
var speed = 30;

// Enemies our player must avoid
var Enemy = function(col, row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = col * colStep;
    this.y = row * rowStep;
    this.speed = speed;
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed * speed;
    if (this.x >= width) this.x = 0;
    player.checkCollision(this.x, this.y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.reset();
    this.sprite = 'images/char-boy.png';
};

Player.prototype.reset = function() {
    this.x = 2 * colStep;
    this.y = 5 * rowStep;
    this.direction = 'up';
};

Player.prototype.update = function(dt) {
    switch(this.direction) {
        case 'left':  this.x -= dt * speed; break;
        case 'right': this.x += dt * speed; break;
        case 'up':    this.y -= dt * speed; break;
        case 'down':  this.y += dt * speed; break;
    }
    if (this.x < 0) this.x = 0;
    else if (this.x >= width - colStep) this.x = width - colStep - 1;
    if (this.y < 0) this.reset();
    else if (this.y >= 5 * rowStep) this.y = 5 * rowStep;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    this.direction = direction;
};

Player.prototype.checkCollision = function(x, y) {
    enemyCenterX = x + colStep / 2;
    enemyCenterY = y + rowStep / 2;
    playerCenterX = this.x + colStep / 2;
    playerCenterY = this.y + rowStep / 2;
    
    dx = playerCenterX - enemyCenterX;
    dy = playerCenterY - enemyCenterY;
    
    distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    collisionDistance = Math.sqrt(Math.pow(colStep, 2) + Math.pow(rowStep, 2));
    
    if (distance - collisionDistance < -50) {
        this.reset();
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0,1,2), new Enemy(2,2,1), new Enemy(4,3,2)];
var player = new Player(2,5);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
