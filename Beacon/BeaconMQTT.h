#ifndef BEACON_MQTT_H
#define BEACON_MQTT_H

void setup_wifi();
void callback(char* topic, byte* message, unsigned int length); 
void reconnect();
void MQTTPublish(char *path, char *message);
void CheckConnection();

#endif