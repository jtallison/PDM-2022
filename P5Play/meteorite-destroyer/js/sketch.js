
let sprites;

let meteors;
let ship;
let photons;
let photonLife = 60;

let spawnSpeed = 2000;
let spawnTimer;

let noise = new Tone.NoiseSynth().toDestination();
let synth = new Tone.Synth().toDestination();

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
  ship = createSprite(width/2, height-25, 25, 25);
  ship.maxSpeed = 5;
  
  sprites = new Group();
  photons = new Group();

  spawnTimer = setInterval(()=>{
    spawnMeteor();
  }, spawnSpeed);

  noise.triggerAttackRelease('4n', 0.1);
  synth.triggerAttackRelease('C3','8n');
}

function draw() {
  background(255,255,255);  
  sprites.overlap(photons, meteorHit);
  if(ship.position.x >= width || ship.position.x <=0) {
    ship.setSpeed(0);
  }
  drawSprites();
}

function mousePressed() {
  spawnMeteor();
  noise.triggerAttackRelease('4n', 0.1);
  synth.triggerAttackRelease('C3','8n');
}

function moveDown(distance=2) {
  sprites.forEach( (spr)=>{
    spr.setVelocity(0,distance);
  })
}

function keyPressed() {
  if(key == " ") {
    console.log("the final frontier")
    let newPhot = createSprite(ship.position.x, ship.position.y, 5,5)
    newPhot.setSpeed(5,270);
    newPhot.life = photonLife;
    photons.add(newPhot);
    synth.triggerAttackRelease('G4',1.0);
    synth.frequency.rampTo('G3', 1.0)
  } else if(keyCode == LEFT_ARROW) {
    ship.addSpeed(0.2, 180);
  } else if(keyCode == RIGHT_ARROW) {
    ship.addSpeed(0.2, 0);
  }
}

function meteorHit(photon, meteor) {
  console.log('explode')
  noise.triggerAttackRelease('4n', 0.1);
  synth.triggerAttackRelease('C3','8n');
  photon.remove();
  meteor.remove();
}

function spawnMeteor() {
  let newSpriteNum = sprites.length
  let met = meteors[newSpriteNum];
  let metX = map(met.reclat, -180, 180, 0, width);
  let metY = map(met.reclong, -180, 180, 0, height);
  let metMass;
  if(met.mass) {
    metMass = map(met.mass, 0, 10000, 10, 100);
    if (metMass > 100){
      metMass = 100
    }
  } else {
    metMass = map(5, 0, 10000, 10, 100);
  }
  let newMeteor = createSprite(metX, metY, metMass, metMass)
  newMeteor.setSpeed((101-metMass)/50,random(360))
  newMeteor.rotationSpeed = random(0.2,0.8);
  sprites.add(newMeteor);
}
