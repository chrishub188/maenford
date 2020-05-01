#include "BeaconMQTT.h"

void setup() {
  Serial.begin(115200);

  //Initialize Wifi
  setup_wifi();
}

void loop() {
  //Check WiFi Connection
  CheckConnection();
}
