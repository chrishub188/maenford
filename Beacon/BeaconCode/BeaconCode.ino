#define CAMERA_MODEL_AI_THINKER

#include <TinyGPS.h>

#include <PubSubClient.h>
#include <ESP32HTTPUpdateServer.h>
#include <EspMQTTClient.h>
#include <String.h>

//#include <MPU6050.h>
//#include <I2Cdev.h>

//Name of the beacon
const String BeaconName = "B3";
const char* RaspberryPiIP = "3.127.172.28";

//Pin defines
#define ADC_Input 13
#define Accel_SCL 2 //gpio5 d1
#define Accel_SDA 14 //gpio4 d2
#define Accel_Int 15  //gpio15 d8
#define Light_1   4
#define Light_2   12
#define Button    16

//Global variables
uint8_t ButtonStatus = 0;
String Lat = "0";
String Long = "0";
String Container = "";

//List of valid containers
//Can only store up to 200 containers
String ContainerList[200];
uint8_t ContainerListLength = 200;

//Array storing the longs and lat
//Store the last 20 values
float flon_array[30];
float flat_array[30];
uint8_t ArrayLength = 30;

//Initialize Wifi MQTT
EspMQTTClient client{
  "maenford", //SSID
  "Maenford#2020", //Password
  RaspberryPiIP //Raspberry PI IP address
};

//Initialize GPS
TinyGPS gps;

//Timing
unsigned long Interval = 1000;
  
void setup() {
  //Initialize ports
  pinMode(Light_1, OUTPUT);
  pinMode(Light_2, OUTPUT);
  digitalWrite(Light_1, LOW);
  digitalWrite(Light_2, LOW);
  pinMode(Button, INPUT_PULLUP);

  //Initialize empty container list
  for(uint8_t i = 0; i < ContainerListLength; ++i){
    ContainerList[i] = "";
  }

  //Initialize serial port for GPS
  Serial.begin(9600);
}

void loop() {
  //uint32_t currentMillis = millis();
  //static uint32_t TimeA = 1000;
  //static uint32_t TimeB = 2000;
  static bool CheckWifi = false;
  
  //Update MQTT
  client.loop();

  //Update Battery
  //UpdateBatteryLevel();

  //Check button
  ButtonStatus = digitalRead(Button);
  //Serial.println(ButtonStatus);

  //Display wifi and MQTT connection
  if(CheckWifi){
     digitalWrite(Light_1, HIGH);
    if(client.isWifiConnected()){
      digitalWrite(Light_2, HIGH);
    }
    else{
      digitalWrite(Light_2, LOW);
    }
    CheckWifi = false;
  }
  else{
    digitalWrite(Light_1, LOW);
    if(client.isMqttConnected()){
      digitalWrite(Light_2, HIGH);
    }
    else{
      digitalWrite(Light_2, LOW);
    }
    CheckWifi = true;
  }
  delay(300);
  //Update the GPS reading if available
  if(Serial.available()){
    UpdateGPS();
  }
}

//Updates the battery level
void UpdateBatteryLevel(){
  //Read the current battery level
  uint16_t BatteryLevel = analogRead(ADC_Input);
  //Convert this level to a voltage
  float Vbatt = 3.3/4095 * (float)BatteryLevel * 1.27;
  //Convert this voltage to a percent remaining
  uint8_t BatteryPercent = 0;
  if(Vbatt >= 4.2) BatteryPercent = 100;
  else if (Vbatt >= 4.15) BatteryPercent = 95;
  else if (Vbatt >= 4.11) BatteryPercent = 90;
  else if (Vbatt >= 4.08) BatteryPercent = 85;
  else if (Vbatt >= 4.02) BatteryPercent = 80;
  else if (Vbatt >= 3.98) BatteryPercent = 75;
  else if (Vbatt >= 3.95) BatteryPercent = 70;
  else if (Vbatt >= 3.91) BatteryPercent = 65;
  else if (Vbatt >= 3.87) BatteryPercent = 60;
  else if (Vbatt >= 3.85) BatteryPercent = 55;
  else if (Vbatt >= 3.84) BatteryPercent = 50;
  else if (Vbatt >= 3.82) BatteryPercent = 45;
  else if (Vbatt >= 3.80) BatteryPercent = 40;
  else if (Vbatt >= 3.79) BatteryPercent = 35;
  else if (Vbatt >= 3.77) BatteryPercent = 30;
  else if (Vbatt >= 3.75) BatteryPercent = 25;
  else if (Vbatt >= 3.73) BatteryPercent = 20;
  else if (Vbatt >= 3.71) BatteryPercent = 15;
  else if (Vbatt >= 3.69) BatteryPercent = 10;
  else if (Vbatt >= 3.61) BatteryPercent = 5;
  else BatteryPercent = 0;

  String ReturnMessage = "ID," + BeaconName + ",Batt," + String(BatteryPercent); 
  //Print the battery status to MQTT 
  client.publish("beacon/output", ReturnMessage);
}

//Update the position data from the GPS
void UpdateGPS(){
  //Read the NEO6m
  while (Serial.available()){
      gps.encode(Serial.read());
  }    
  float flat, flon;
  unsigned long age;
  gps.f_get_position(&flat, &flon, &age);
  //Add the new value to the array
  static uint8_t ArrayIndex = 0;
  flat_array[ArrayIndex] = flat;
  flon_array[ArrayIndex] = flon;
  
  //Increment the array index
  ++ArrayIndex;
  if(ArrayIndex >= ArrayLength){
    ArrayIndex = 0;
  }

  //Get the average value
  double flat_average = 0;
  double flon_average = 0;
  for(uint8_t i = 0; i < ArrayLength; ++i){
    flat_average += flat_array[i];
    flon_average += flon_array[i];
  }
  flat = flat_average/ArrayLength;
  flon = flon_average/ArrayLength;
  
  String LatTemp = String(flat == TinyGPS::GPS_INVALID_F_ANGLE ? 0.0 : flat, 6);
  String LongTemp = String(flon == TinyGPS::GPS_INVALID_F_ANGLE ? 0.0 : flon, 6);

  //Post the information is it is different
  if((LatTemp != Lat) || (LongTemp != Long)){
    Lat = LatTemp;
    Long = LongTemp;
    //Send the updated data via MQTT
    UpdateDataMQTT();
  }
}

//Command sent when beacon connection is established
void onConnectionEstablished() {
  UpdateDataMQTT();
}

//Sent whenever we need to update data
void UpdateDataMQTT(){
  String PublishMessage = "ID," + BeaconName + ",Lat," + Lat + ",Long," + Long; 
  client.publish("beacon/output", PublishMessage);
}

//Sent when successful container is paired
void ContainerPaired(){
  String PublishMessage = "ID," + BeaconName + "Cont," + Container;
  client.publish("beacon/output", PublishMessage);
}

//Reads in input MQTT messages 
void CheckInputMQTT(){
  client.subscribe("beacon/input", [] (const String &payload)  {
      //Process the MQTT input
      char* InputString;
      strcpy(InputString, payload.c_str());
      //Extract the first token
      char * tokenID = strtok(InputString, ",");
      //If the beacon ID is for us, extract the next value so we know the commdn
      if(String(tokenID) == BeaconName){
        char * tokenCommand = strtok(InputString, ",");
      }
      //If the token is ContListAdd, add containers to the list of valid containers
      if(String(tokenID) == "ContListAdd"){
        //Read through the list of containers that comes with it
        //If that container is not currently on the list, add it
        char * tokenContainer = strtok(InputString, ",");
        while (tokenContainer != NULL){
          //Check if container is on the list
          bool IsPresent = false;
          for(uint8_t i = 0; i < ContainerListLength; ++i){
            if(ContainerList[i] == String(tokenContainer)){
              IsPresent = true;
              break;
            }
          }
          //If the container is not present, add it to the list
          //Add at the next availbe spot
          if(IsPresent == false){
            for(uint8_t i = 0; i < ContainerListLength; ++ i){
              if(ContainerList[i] == ""){
                ContainerList[i] = String(tokenContainer);
              }
              //If we are at the end of the list, post an error message
              if(i == ContainerListLength-1){
                client.publish("beacon/output", "ERROR: Too many containers");
              }
            }
          }
          //Read the next container
          char * tokenContainer = strtok(InputString, ",");
        }
      }
      //If the token is ContListRm, remove containers from the list of valid containers
      if(String(tokenID) == "ContListRm"){
      char * tokenContainer = strtok(InputString, ",");
        while (tokenContainer != NULL){
          if(String(tokenContainer) == "ContListRm"){
            for(uint8_t i = 0; i < ContainerListLength; ++i){
                if(ContainerList[i] == String(tokenContainer)){
                  ContainerList[i] = "";
                }
              }
            }
            //Read the next container
            char * tokenContainer = strtok(InputString, ",");
        }
      }
  });
}
