
// canvas and other basic variables

const ourcanvas = document.getElementById("canvas");
const ctx = ourcanvas.getContext("2d");
const divider = 10;
const rows = ourcanvas.height / divider;
const columns = ourcanvas.width / divider;
let snake;



//snake constructor

function Snake(){
    
this.x = 0;    
this.y = 0;
    
this.xSpeed = divider;    
this.ySpeed = 0;
    
this.total =  0;
this.tail = [];    
    
this.draw = function() {
    ctx.fillStyle = "#c7b5af";
    
    for(let i=0; i<this.tail.length; i++){
       ctx.fillRect(this.tail[i].x, this.tail[i].y, divider, divider); 
        
    }
    ctx.fillRect(this.x, this.y, divider, divider);
 }


this.update = function(){
    
for (let i=0; i<this.tail.length -1; i++){
    this.tail[i] = this.tail[i+1];
    }
    this.tail[this.total-1] = {x: this.x, y: this.y};
    
    
this.x += this.xSpeed; 
this.y += this.ySpeed;
    
if (this.x > ourcanvas.width) {
    this.total=0;
        this.tail = [];
        this.x=0
        this.y=0
        this.xSpeed = divider;    
        this.ySpeed = 0;

    } 
else if (this.x < 0) {
    this.total=0;
        this.tail = [];
        this.x=0
        this.y=0
        this.xSpeed = divider;    
        this.ySpeed = 0;

    } 
else if  (this.y > ourcanvas.height) {
    this.total=0;
        this.tail = [];
        this.x=0
        this.y=0
        this.xSpeed = divider;    
        this.ySpeed = 0;

    } 
else if  (this.y < 0 ) {
    this.total=0;
        this.tail = [];
        this.x=0
        this.y=0
        this.xSpeed = divider;    
        this.ySpeed = 0;

    }    
}

this.eat = function(fruit){
    if (this.x === fruit.x && this.y === fruit.y) {
        
        this.total++;
        return true;
    }
    else {
        return false;
    }}

this.checkCollision = function(){
    for(i=0; i<this.tail.length; i++){
    if (this.x === this.tail[i].x && this.y === this.tail[i].y ) {
        
        this.total=0;
        this.tail = [];
        this.x=0
        this.y=0
        this.xSpeed = divider;    
        this.ySpeed = 0;
         
    }
    else {
        return false;
    }   
}

    }


    
//direction change
this.changeDirection = function(direction){
    
switch(direction) {
            
 case 'Up':
     if (this.ySpeed > 0){
        this.total=0;
        this.tail = [];
        this.x=0
        this.y=0
        this.xSpeed = divider;    
        this.ySpeed = 0;
     }
    this.xSpeed = 0;
    this.ySpeed = -divider;
    break;
 case 'Down':
    if (this.ySpeed < 0){
        this.total=0;
        this.tail = [];
        this.x=0
        this.y=0
        this.xSpeed = divider;    
        this.ySpeed = 0;
     }
    this.xSpeed = 0;
    this.ySpeed = divider;
    break;
 case 'Left':
    if (this.xSpeed > 0){
        this.total=0;
        this.tail = [];
        this.x=0
        this.y=0
        this.xSpeed = divider;    
        this.ySpeed = 0;
     }
    this.ySpeed = 0;
    this.xSpeed = -divider;
    break;
 case 'Right':
    if (this.xSpeed < 0){
        this.total=0;
        this.tail = [];
        this.x=0
        this.y=0
        this.xSpeed = divider;    
        this.ySpeed = 0;
     }
    this.ySpeed = 0;
    this.xSpeed = divider;
    break;
    }
}}






// fruit constructor

function Fruit () {
    this.x;
    this.y;
    
    this.pickLocation = function () {
    this.x = (Math.floor(Math.random()*columns -1)+1)*divider;
    this.y = (Math.floor(Math.random()*rows -1)+1)*divider;
    }
    
    this.draw = function () {
        
        ctx.fillStyle = "#00ff00";
        ctx.fillRect(this.x, this.y, divider, divider);
    }    
    
}



//game start setup
(function Setup (){
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();
    
      
    window.setInterval(() => {
    ctx.clearRect(0, 0, ourcanvas.width, ourcanvas.height);
    fruit.draw();    
    snake.update();
    snake.draw();
        
    if (snake.eat(fruit)){
        fruit.pickLocation();
    } 
    document.getElementById("score").innerText= "Your score is: " + snake.total;   
    snake.checkCollision();
    
    }, 150);
}());

window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
    
}))