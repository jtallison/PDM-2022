
let sprites = [];

let meteors;

function preload() {

  fetch("https://data.nasa.gov/resource/y77d-th95.json")
  .then(res => res.json())
  .then(out => {
    console.log("Got Meteorites")
    meteors = out;
  })

}

function setup() {
  createCanvas(800,400);
  createSprite(400, 200, 50, 50);
}

function draw() {
  background(255,255,255);  
  drawSprites();
}

function mousePressed() {
  // sprites[sprites.length] = createSprite(random(width), random(height), 10,10)
  let met = meteors[sprites.length];
  let metX = map(met.reclat, -180, 180, 0, width);
  let metY = map(met.reclong, -180, 180, 0, height);
  let metMass;
  if(met.mass) {
    metMass = map(met.mass, 0, 5000, 10, 100);
  } else {
    metMass = map(5, 0, 5000, 10, 100);
  }
  sprites[sprites.length] = createSprite(metX, metY, metMass, metMass);
}

function moveDown(distance=2) {
  sprites.forEach( (spr)=>{
    spr.setVelocity(0,distance);
  })
}

