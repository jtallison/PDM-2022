let nxDial, nxButton;

let synth = new Tone.PolySynth().toDestination();

let pattern = new Tone.Pattern(function(time, note){
	// synth.triggerAttackRelease(note, 0.25, time);
}, ["C4", "D4", "E4", "G4", "A4"]);


let melody = new Tone.Sequence((time, note)=>{
  if(note!=null){
    synth.triggerAttackRelease(note,'8n',time);
  }
}, ['G4','A4',null,'B4','C5',null,'F4']);

let chords = [
  {"time": "0:0", "note": ["C4", "E3", "G4"]},
  {"time": "0:3", "note": ["F4", "A4", "C4"]}, 
  {"time": "1:1", "note": ["G4", "A3", "D4"]},
  {"time": "1:2", "note": ["G4", "B4", "F4"]}
]

let chord = new Tone.Part((time, notes)=>{
  synth.triggerAttackRelease(notes.note, "2n", time);
}, chords )
chord.loop = 8;
chord.loopEnd = '2m';

// create two monophonic synths
const synthA = new Tone.FMSynth().toDestination();
const synthB = new Tone.AMSynth().toDestination();
//play a note every quarter-note
const loopA = new Tone.Loop(time => {
	synthA.triggerAttackRelease("C2", "8n", time);
}, "4n").start(0);
//play another note every off quarter-note, by starting it "8n"
const loopB = new Tone.Loop(time => {
	synthB.triggerAttackRelease("C4", "8n", time);
}, "4n").start('8n');

Tone.Transport.bpm.value = 90;

function setup() {
  createCanvas(400, 400);

  nxDial = Nexus.Add.Dial('#nxUI',{
    'size': [100,100]
  });
  nxButton = Nexus.Add.Button('#nxUI');
  nxButton.on('change', ()=>{
    Tone.start();
    // pattern.start(0);
    melody.start('1m');
    chord.start('0:0')
    Tone.Transport.start();
  })
}

function draw() {
  background(220);
}