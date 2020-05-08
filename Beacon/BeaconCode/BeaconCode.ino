#include <NMEAGPS.h>

#include <SerialTransfer.h>
#include <ST_CRC.h>

#include <PubSubClient.h>
#include <ESP32HTTPUpdateServer.h>
#include <EspMQTTClient.h>
#include <String.h>

//#include <MPU6050.h>
//#include <I2Cdev.h>

//Name of the beacon
const String BeaconName = "B1";
const char* RaspberryPiIP = "192.168.4.1";

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
String Lat = "0";
String Long = "0";
String Container = "";

//List of valid containers
//Can only store up to 200 containers
String ContainerList[200];
uint8_t ContainerListLength = 200;

//Initialize Wifi MQTT
EspMQTTClient client{
  "maenford", //SSID
  "Maenford#2020", //Password
  RaspberryPiIP //Raspberry PI IP address
};

//Initialize GPS
NMEAGPS gps;
//Define the serial port
#define gpsPort Serial
#define GPS_PORT_NAME "Serial"
  
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

  //gpsPort.begin(9600);
}

void loop() {
  client.loop();

  BatteryLevel = analogRead(ADC_Input);
  Serial.println(BatteryLevel);
  ButtonStatus = digitalRead(Button);
  Serial.println(ButtonStatus);
  
  digitalWrite(Light_1, HIGH);
  if(client.isWifiConnected()){
    digitalWrite(Light_2, HIGH);
  }
  else{
    digitalWrite(Light_2, LOW);
  }
  delay(1500);
  digitalWrite(Light_1, LOW);
  if(client.isMqttConnected()){
    digitalWrite(Light_2, HIGH);
  }
  else{
    digitalWrite(Light_2, LOW);
  }
  delay(1500);
  
  //UpdateGPS();
}

//Update the position data from the GPS
void UpdateGPS(){
  //Read the NEO6m
  gps_fix fix;
  while(gps.available(gpsPort)){
    fix = gps.read();
  }

  //Extract the Lat and Lon from the GPS data
  //Value in int is scaled 10e7
  int32_t Lat_int = fix.latitudeL();
  int32_t Long_int = fix.longitudeL();
  Lat = String(Lat_int);
  Long = String(Long_int);
  
  //Send the updated data via MQTT
  UpdateDataMQTT();
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




