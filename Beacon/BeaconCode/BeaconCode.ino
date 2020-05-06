//#include <MPU6050.h>
//#include <I2Cdev.h>

//include "BeaconMQTT.h"

//Pin defines
#define ADC_Input 13
#define Accel_SCL 2 //gpio5 d1
#define Accel_SDA 14 //gpio4 d2
#define Accel_Int 15  //gpio15 d8
#define Light_1   4
#define Light_2   12
#define Button    16

//Global variables
uint16_t BatteryLevel = 0;
uint8_t ButtonStatus = 0;


void setup() {
  Serial.begin(115200);

  //Initialize ports
  pinMode(Light_1, OUTPUT);
  pinMode(Light_2, OUTPUT);
  pinMode(Button, INPUT_PULLUP);

  //Initialize Wifi
  //setup_wifi();
}

void loop() {
  //Check WiFi Connection
  //CheckConnection();
  Serial.println("Hello");
  BatteryLevel = analogRead(ADC_Input);
  Serial.println(BatteryLevel);
  ButtonStatus = digitalRead(Button);
  Serial.println(ButtonStatus);
  
  digitalWrite(Light_1, HIGH);
  digitalWrite(Light_2, LOW);
  delay(500);
  digitalWrite(Light_1, LOW);
  digitalWrite(Light_2, HIGH);
  delay(500);
}
