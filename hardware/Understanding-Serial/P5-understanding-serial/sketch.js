// Serial Example

let serialPDM;
let portName = "/dev/tty.usbmodem1401";

let sensor;

function setup() {
  serialPDM = new PDMSerial(portName);
  sensor= serialPDM.sensorData;

  createCanvas(600,400);
}

function draw() {
  background([sensor.a0,0,0])

  // console.log(sensor.a0)
}

function mousePressed(){
  serialPDM.transmit('mouse', mouseY);
  console.log(mouseY);
}

