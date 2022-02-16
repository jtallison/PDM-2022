// Jesse Allison 2022

let sound1 = new Tone.Player('media/FamilyFeud-Buzzer3.mp3')
let sounds = new Tone.Players({
  'shot': 'media/02-shot.mp3',
  'through': 'media/03-through.mp3',
  'theHeart': 'media/04-theHeart.mp3'
})

let button;


function setup() {
  createCanvas(400, 400);
  sound1.toDestination();
  sounds.toDestination();

  button = createButton('through');
  button.position(200, 400);
  button.mousePressed(  ()=>playSound('theHeart')   );
}

function draw() {
  background(220);
}

function keyPressed() {
  console.log("key is: ", key);
  if(key === "1"){
    sounds.player('shot').start();
    // sound1.start();
  } 
  
  // sound1.playbackRate = (mouseY /200)+0.01;
  // sound1.start();
}

function playSound(whichSound) {
  if (whichSound === 'through'){
    sounds.player('through').start();
  } else if (whichSound === 'theHeart') {
    sounds.player('theHeart').start();
  }
}
