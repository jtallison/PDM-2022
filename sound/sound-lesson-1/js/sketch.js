// Jesse Allison 2022
// global variables

const sounds = new Tone.Players({
  shot: "media/02-shot.mp3",
  through: "media/03-through.mp3",
  theHeart: "media/04-theHeart.mp3"
})
let button1;
let button2;
let button3;

let slider1;

sounds.toDestination();

function preload() {

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

