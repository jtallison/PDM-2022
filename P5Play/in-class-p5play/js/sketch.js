
let sprites;
let ship;
let photons;

let meteors;
let meteorSpawnTimer;

let photonSynth = new Tone.MetalSynth().toDestination();
let meteorExplosion = new Tone.Player('data/meteorExplosion.wav').toDestination();

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
  sprites = new Group();
  photons = new Group();
  ship = createSprite(width/2, height-25, 25, 25);
  // meteorSpawnTimer = setInterval( ()=> {spawnMeteor()}, 2000);
  meteorSpawnTimer = setInterval( spawnMeteor, 2000);
}

function draw() {
  background(255,255,255); 
  
  if(ship.position.x >= width || ship.position.x <= 0) {
    ship.setSpeed(0);
  }
  sprites.overlap(photons, meteorHit);
  drawSprites();
}

function mousePressed() {
  spawnMeteor();
}

function keyPressed() {
  if(keyCode == LEFT_ARROW) {
    ship.addSpeed(1, 180)
  } else if (keyCode == RIGHT_ARROW) {
    ship.addSpeed(1, 0)
  }
  if(key == " "){
    shootPhoton();
  }
}

function moveDown(distance=2) {
  sprites.forEach( (spr)=>{
    spr.setVelocity(0,distance);
  })
}

function shootPhoton() {
  let photon = createSprite(ship.position.x, ship.position.y, 5,5);
  photon.setSpeed(10, 270);
  photon.life = 30;
  photons.add(photon);
  photonSynth.triggerAttackRelease('G3', '4n');
  photonSynth.frequency.rampTo('G4','4n');
}

function spawnMeteor() {
    // sprites[sprites.length] = createSprite(random(width), random(height), 10,10)
    let met = meteors[sprites.length];
    let metX = map(met.reclat, -180, 180, 0, width);
    let metY = map(met.reclong, -180, 180, 0, height);
    let metMass;
    if(met.mass) {
      metMass = map(met.mass, 0, 15000, 10, 100);
      if(metMass > 100){
        metMass = 100;
      }
    } else {
      metMass = map(5, 0, 15000, 10, 100);
    }
    let newMeteor = createSprite(metX, metY, metMass, metMass)
    newMeteor.setSpeed((101-metMass)*0.02, random(360) );
    newMeteor.rotationSpeed = random(1, 15);
    sprites[sprites.length] = newMeteor;
}

function meteorHit(meteor, photon) {
  photon.remove();
  meteor.remove();
  meteorExplosion.start();
}
