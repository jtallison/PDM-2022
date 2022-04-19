// Serial Example

let serialPDM;
let portName = "/dev/tty.usbmodem1301";

let sensor;

// Tone 
let synth = new Tone.Synth().toDestination();

function setup() {
  serialPDM = new PDMSerial(portName);
  sensor= serialPDM.sensorData;
  sensor.a0 = 200;

  createCanvas(600,400);
}

function draw() {
  background([sensor.a0,0,0])

  // console.log(sensor.a0)
}

function mousePressed(){
  serialPDM.transmit('mouse', mouseY);
  console.log(mouseY);
  synth.triggerAttackRelease('C4', '4n');
}

