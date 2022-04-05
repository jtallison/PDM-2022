/*
  PDMSerial.cpp - DDEM Library for transmit/receive with p5
  Created by Jesse Allisln 2019
*/

#include "Arduino.h"
#include "PDMSerial.h"

PDMSerial::PDMSerial()
{
  _startingTransmit = true;
  _name = "default";
  _value = 0;
}

String PDMSerial::getName() {
  return _name;
}

int PDMSerial::getValue() {
  return _value;
}

boolean PDMSerial::checkSerial() {
     // Receiving transmissions – cool.  
  if (Serial.available() > 0) {
    // read the oldest byte in the serial buffer
    String data = String(Serial.readStringUntil(','));
    if(data!= "\n") {
      // Serial.write(("\nrx:" + data).c_str());
      
      int sep = data.indexOf(":");
      if(sep != -1) {
      
        // Serial.write(sep);
        // Serial.write(("\nindex:" + String(sep)).c_str());
        _name = data.substring(0,sep);
        // Serial.write(("\nname:" + _name).c_str());
        _value = data.substring(sep+1).toInt();
        // Serial.write(("\nvalue:" + String(value)).c_str());
        if(_name && _value >= 0) {
            // new data was received!
          return true;
        }
      }
    }
  } 
    return false; // no new data or the data wasn't good.
}

// **********************************************
// ********* LSU DDEM Data Transmission ********* 
// **********************************************
//
// Transmit as many sensors as you like then send end before looping.
// transmitSensor(string name, int/float value);
  // transmitSensor("a0", sensorValue);
  // transmitSensor("float0", sensorFloatValue);
  // transmitSensor("b7", buttonState);
  // transmitSensor("end");

void PDMSerial::transmitSensor(String name, int value) {
  if (name == "end") {
      Serial.write(";\n");
      _startingTransmit = true;
  } else {
          // Only put a comma on after the first transmitted data.
      if(_startingTransmit) {
        _startingTransmit = false;
      } else {
        Serial.write(",");
      }
      
        // Prep the data 
    String xmitData = name + ":" + String(value);
      // Transmission to the computer
    Serial.write(xmitData.c_str());
  }
}

void PDMSerial::transmitSensor(String name, float value) {
  if (name == "end") {
      Serial.write(";\n");
      _startingTransmit = true;
  } else {
          // Only put a comma on after the first transmitted data.
      if(_startingTransmit) {
        _startingTransmit = false;
      } else {
        Serial.write(",");
      }
      
        // Prep the data 
    String xmitData = name + ":" + String(value);
      // Transmission to the computer
    Serial.write(xmitData.c_str());
  }
}

void PDMSerial::transmitSensor(String name) {
  if (name == "end") {
      Serial.write(";\n");
      _startingTransmit = true;
  } else {
        // Prep the data 
    String xmitData = name + "\n";
      // Transmission to the computer
    Serial.write(xmitData.c_str());
  }
}