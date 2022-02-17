// Jesse Allison 2022
// declare variables

// Set up Tone
const sounds = new Tone.Players({
  shot: "media/02-shot.mp3",
  through: "media/03-through.mp3",
  theHeart: "media/04-theHeart.mp3",
  andYoure: "media/05-andYoure.mp3",
  to: "media/06-to.mp3",
  blame: "media/07-blame.mp3",
  darlin: "media/08-darlin.mp3",
  you: "media/09-you.mp3",
  give: "media/10-give.mp3",
  love: 'media/11-love.mp3',
  a: 'media/12-a.mp3',
  bad: 'media/13-bad.mp3',
  nameClip: 'media/14-name.mp3'
})

sounds.toDestination();

// UI elements
let button1;
let button2;
let button3;

let slider1;

function preload() {
  // could load audio and setup buttons here as well...
}

function setup() {
  createCanvas(400, 400);

  button1 = createButton("Shot", 'shot');
  button1.position(200, 300);
  button1.mousePressed(buttonSound);
  
  button2 = createButton("through");
  button2.position(200, 340);
  button2.mousePressed( () => buttonSound('through') );

  button3 = document.getElementById('heartDiv');
  button3.onclick = () => buttonSound('theHeart');

  slider1 = createSlider(0,1,0,0.1);
}

function draw() {
  background(220);
}

function keyPressed(){
  if(key==="1"){
    sounds.player("shot").start();
  } else if (key === "2"){
    sounds.player("through").start();
  } else if (key === "3") {
    sounds.player("theHeart").start();
  }
}

function buttonSound(sound='shot') {
  sounds.player(sound).start();
}

