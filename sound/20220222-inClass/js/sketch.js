const synth = new Tone.PluckSynth();
const drum = new Tone.MembraneSynth();
const reverb = new Tone.JCReverb(0.4).toDestination();
synth.connect(reverb);
drum.connect(reverb);

let notes = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'
}

function setup() {
  createCanvas(400, 400);
  synth.release = 2;
  synth.resonance = 0.98;
  // synth.harmonicity.value = 1.25;
  //play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease("C4", "8n");
}

function draw() {
  background(220);
}

function keyPressed() {
  let toPlay = notes[key];
  console.log(toPlay);
  synth.triggerAttackRelease(toPlay, 0.5);

  drum.triggerAttackRelease("C2", "8n", '+1');
}
