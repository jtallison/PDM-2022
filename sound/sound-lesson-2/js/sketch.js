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
// making an array of all of the sound names...
let soundsInOrder = ['shot','through','theHeart','andYoure','to','blame','darlin','you','give','love','a','bad','nameClip'];
let nextSoundPlayed = 0;

var delay = new Tone.FeedbackDelay("8n", 0.5);
var gain = new Tone.Gain().toDestination();
// notice that we connect the sound player source to the delay _after_ it was created.
sounds.connect(delay);
delay.connect(gain);
sounds.connect(gain); // to have the direct sound as well as the delayed sound. Could also adjust the delay dry/wet parameter

// UI elements
let button1;  // using p5.dom
let button2;  // using p5.dom
let button3;  // button created by using a normal dom element

let slider1;  // using p5.dom
// NexusUI elements
let nxSlider;
let nxDial;
let nxButtons = [];

function preload() {
  // Create/setup NexusUI elements here
  nxSlider = new Nexus.Slider('#slider');

  nxDial = Nexus.Add.Dial('#dial',{
    'size': [100,100]
  });

  soundsInOrder.forEach((sound,index) => {
    nxButtons[index] = Nexus.Add.TextButton('#instrument',{
      'size': [80,30],
      'state': false,
      'text': sound
    })
  })
}

function setup() {
  createCanvas(400, 400);

  // Example of p5.dom button calling a function and having it execute (notice nothing is sent to the function)
  button1 = createButton("Shot", 'shot');
  button1.position(200, 300);
  button1.mousePressed(buttonSound);
  
  // Example of p5.dom button where we use an
  button2 = createButton("through");
  button2.position(200, 340);
  button2.mousePressed( () => buttonSound('through') );

  button3 = document.getElementById('heartDiv');
  button3.onclick = () => buttonSound('theHeart');

  slider1 = createSlider(0,1,0,0.1);
  slider1.mouseReleased(()=>{
    let delayTime = slider1.value();

    // Use one of the next two.
    delay.delayTime.value = delayTime; // set the delay time immediately
    // delay.delayTime.rampTo(delayTime, 1); // or ramp to the new delay time over 1 second producing pitch shifting effects.
  });

  nxSlider.on('change', function (v){
    delay.delayTime.value = v;
  })

  nxDial.on('change', (v)=>{
    console.log(v)
    gain.gain.value = v;
  })

  soundsInOrder.forEach((sound,index) => {
    nxButtons[index].on('change', function (v){
      console.log(v);
      sounds.player(soundsInOrder[index]).start();
    })
  });
}

function draw() {
  background(220);
}

function keyPressed(){
  console.log(key, keyCode);
  if(key==="1"){
    sounds.player("shot").start();
  } else if (key === "2"){
    sounds.player("through").start();
  } else if (key === "3") {
    sounds.player("theHeart").start();
  }
    // using the spacebar to cycle through the soundfiles
  if(keyCode === 32) {
    sounds.player(soundsInOrder[nextSoundPlayed]).start();
    ++nextSoundPlayed;
    if(nextSoundPlayed >= soundsInOrder.length) nextSoundPlayed = 0;
  }
}

function buttonSound(sound='shot') {
  sounds.player(sound).start();
}

