
let sprites = [];

function setup() {
  createCanvas(800,400);
  createSprite(400, 200, 50, 50);
}

function draw() {
  background(255,255,255);  
  drawSprites();
}

function mousePressed() {
  sprites[sprites.length] = createSprite(random(width), random(height), 10,10)
}

function moveDown(distance=2) {
  sprites.forEach( (spr)=>{
    spr.setVelocity(0,distance);
  })
}

