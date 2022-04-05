/* PDM - Communication between P5 and Arduino
Code by Jesse Allison -2019
*/
//Add p5.serialport.js library and include src line to it in index.html
//You must also be running the p5.serialControl app in the background

// Serial port global variables

let serialPDM;                             // Variable to hold instance of serialport library
let portName = '/dev/tty.usbmodem1401';    // Fill in your serial port name here

let sensors;

// In this example we are receiving:
// .a0  // the analogRead value of pin a0 0-1023
// .float0  // the analogRead value of a0 divided by 1023 giving us a normalized range of 0.0-1.0
// .pressure  // the analogRead value of pin a1 (probably with a pressure sensor attached)
// p7  // the digitalRead state of pin 7

function setup() {
    // Setup the serial port for communication
  serialPDM = new PDMSerial(portName);
  console.log(serialPDM.inData);
  
    // Alias for the sensor Data . You can also just use serialPDM.sensorData...
  sensors = serialPDM.sensorData;
  
  createCanvas(800,600);
  
}

// Send information via .transmit(name,value)

function keyPressed() {
  serialPDM.transmit('led',1);
  
  console.log(serialPDM.sensorsConnected());
}

function keyReleased() {
  serialPDM.transmit('led',0);  
}

function mouseDragged() {
  ellipse(mouseX, mouseY, 15, 15);
  let fade = Math.floor(map(mouseY,0,height,0,255, true));
  
  serialPDM.transmit('fade',fade);
  
  // prevent default
  return false;
}



function draw(){
  background(255);
  textSize(32);
  fill(32, 140, 110);
  text("a0: "+ sensors.a0, 10, 30);
  text("p7: "+ sensors.p7, 10, 80);
  text("pressure: "+ sensors.pressure, 10, 120);
  
  let circlePosition = map(sensors.float0, 0, 1, 30, width-30);
  drawCircle(circlePosition, 300, sensors.pressure + 2);
}


function drawCircle(x,y,size){
  fill("purple");
  ellipse(x, y, size);
}
