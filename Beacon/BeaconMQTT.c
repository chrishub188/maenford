#include <WiFi.h>
#include <PubSubClient.h>

#include "BeaconMQTT.h"

// Replace the next variables with your SSID/Password combination
const char* ssid = "maenford";
const char* password = "Maenford#2020";

// Add your MQTT Broker IP address, example:
//const char* mqtt_server = "192.168.1.144";
const char* mqtt_server = "YOUR_MQTT_BROKER_IP_ADDRESS";

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;

//Function prototypes
void setup_wifi();
void callback(char* topic, byte* message, unsigned int length); 
void reconnect();
void MQTTPublish(char *path, char *message);
void CheckConnection();

//Setup functions for wifi
void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

//Reads messages on MQTT
void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  String messageTemp;
  
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();

  // If a message is received on the topic beacon/output, you check if the message for a command
  if (String(topic) == "beacon/output") {
    if(messageTemp == "message"){
    }
  }
}

//Reconnects the ESP32 to the wifi network if disconnected
void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ESP8266Client")) {
      Serial.println("connected");
      // Subscribe
      client.subscribe("beacon/output");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

//Publishes a message on the MQTT network
//REQUIRES: A path (es. beacon/datastream) and a message as a char array
//RETURNS: None
void MQTTPublish(char *path, char *message){
  client.publish(path, message);
  //Convert the string message input to a char array
  //ex
  //char tempString[8];
  //dtostrf(temperature, 1, 2, tempString);
  //Serial.print("Temperature: ");
  //Serial.println(tempString);
  //client.publish("esp32/temperature", tempString);
}

//Checks if the client is connected to the network
void CheckConnection(){
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}
