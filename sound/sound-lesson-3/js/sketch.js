// Jesse Allison 2022
// declare variables

// Set up Tone
let osc = new Tone.AMOscillator(600,'sine','sine').start()
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(pan);
osc.connect(ampEnv);

// Effects for us to insert into the signal chain and modulate
let delay = new Tone.FeedbackDelay("8n", 0.5);


let panLFO = new Tone.LFO(1, -1, 1).start();
panLFO.type = 'sine';
panLFO.connect(pan.pan);

let freqLFO = new Tone.LFO(0.1, 400, 4000).start();
freqLFO.type = 'triangle';
freqLFO.connect(osc.frequency);


let noise = new Tone.Noise('pink').start();
let noiseEnv = new Tone.AmplitudeEnvelope({
  attack: 0.05,
  decay: 0.05,
  sustain: 0.8,
  release: 0.1
});
let noiseFilter = new Tone.Filter({
  type: "lowpass",
  frequency: 200
});
noise.connect(noiseEnv);
noiseEnv.connect(noiseFilter);
noiseFilter.connect(gain);


// UI elements
let button1;  // using p5.dom
let button2;  // using p5.dom

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
  nxButtons[0] = Nexus.Add.Button('#dial');
}

function setup() {
  createCanvas(400, 400);

  // Example of p5.dom button calling a function and having it execute (notice nothing is sent to the function)
  button1 = createButton("Ping", 'ping');
  button1.position(200, 300);
  button1.mousePressed(ping);
  
  // Example of p5.dom button where we use an
  button2 = createButton("multiPing");
  button2.position(200, 340);
  button2.mousePressed( () => multiPing(5) );

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
  nxButtons[0].on('change', (v)=>{
    if(v.state === true){
      console.log(v)
      noiseEnv.triggerAttackRelease(0.5);
      noiseFilter.frequency.setValueAtTime(200);
      // noiseFilter.frequency.linearRampToValueAtTime(1000,'+1');
      noiseFilter.frequency.exponentialRampToValueAtTime(1000,'+0.5');
    }

  })
}

function draw() {
  background(220);
  text("Press Space to start audio", 10, 40);
}

function keyPressed(){
  console.log(key, keyCode);
  if(key==="1"){
    
  } else if (key === "2"){

  } else if (key === "3") {

  }
  if(key===32){
    Tone.start();
    ampEnv.triggerAttackRelease('8n')
  }
}

function ping(number=1) {
  ampEnv.triggerAttackRelease('8n')
}

function multiPing(number=1) {
  for(let i=0; i<number; i++) {
    ampEnv.triggerAttackRelease('8n', "+"+i/2);
  }
}
