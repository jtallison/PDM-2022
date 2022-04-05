// ****************************************************
// ***** LSU DDEM Pathway:                            *
// ***** Programming Digital Media                    *
// Jesse Allison & Anthony T. Marasco                 *
// PDM - Serial Communication between P5 and Arduino  *

#include "PDMSerial.h"
// #include <PDMSerial.h>   // use if PDMSerial is in your libraries folder

PDMSerial pdm;

const int analogPin = A0;  //the analog input pin sensor is attached to
const int pressurePin = A1; 
const int digitalInPin = 7;   // A digital input pin

const int outPin = 13;    // a digital output pin
const int outPWMPin = 10;  // a pwm (analog) output pin

/////////
int buttonState = LOW;

int sensorValue = 0;
int sensorTransmitValue = 0;

///////////


void setup() {
  // put your setup code here, to run once:
  
    // Input setup – add more inputs if desired
  pinMode(analogPin, INPUT);
  pinMode(pressurePin, INPUT);
  pinMode(digitalInPin, INPUT_PULLUP);
    // Output setup – add more if desired
  pinMode(outPin, OUTPUT);
  pinMode(outPWMPin, OUTPUT);

  Serial.begin(9600);

}

void loop() {
  // put your main code here, to run repeatedly:
  
    // Inputs – sample and prep the data for transmission
  sensorValue = analogRead(analogPin);//read the value from the analog sensor
  int pressureValue = analogRead(pressurePin);
  
      // resize the range of the sensor data if wanted...
  // sensorTransmitValue = map(sensorValue,0,1023,0,255);//Convert from 0-1023 proportional to the number of a number of from 0 to 255
  
      // or convert it into a floating point number. This example is normalized to a range of [0.0–1.0]
  float sensorFloatValue = sensorValue/1023.0;
  
  buttonState = digitalRead(digitalInPin);
  
    // Transmit whatever sensors you like. When you are done, transmit end for the default ";" or your own separator.
  pdm.transmitSensor("a0", sensorValue);
  pdm.transmitSensor("pressure",pressureValue);
  pdm.transmitSensor("float0", sensorFloatValue);
  pdm.transmitSensor("p7", buttonState);
  pdm.transmitSensor("end");

  boolean newData = pdm.checkSerial();
  
  if(newData) {
    if(pdm.getName().equals(String("led"))) {
      digitalWrite(outPin, pdm.getValue());
    } else if (pdm.getName().equals(String("fade"))) {
      analogWrite(outPWMPin, pdm.getValue());
    }
  }

}
