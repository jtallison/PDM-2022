// In class serial example

#include "PDMSerial.h"

PDMSerial pdm;

int sensorPin = A0;
int sensorData = 0;
int scaledSensor;

int ledPin = 10;

void setup() {
  pinMode(sensorPin, INPUT);

  Serial.begin(9600);
}

void loop() {
  sensorData = analogRead(sensorPin);
  scaledSensor = map(sensorData, 0, 1023, 0, 255);
  
  pdm.transmitSensor("a0", scaledSensor);
  pdm.transmitSensor("end");
  
  // Serial.println(sensorData);

  boolean newData = pdm.checkSerial();
  
  if(newData) {
    if(pdm.getName().equals(String("mouse"))) {
      int ledBrightness = map(pdm.getValue(), 0, 600, 0, 255);
      analogWrite(ledPin, ledBrightness);
    }
  }
  
}
