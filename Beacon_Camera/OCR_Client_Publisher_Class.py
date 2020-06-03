import paho.mqtt.client as paho  # mqtt library
import os
import json
import time
#from OCR_Engine import *
from datetime import datetime

# host name is localhost because both broker and python are Running on same
# machine/Computer.

class text_publisher:
    def __init__(self,broker,port,topic,payload):
        self.broker = broker  # host name , Replace with your IP address.
        self.port   = port
        self.topic = topic # topic name
        self.OCR_Publisher = paho.Client("OCR_Publisher")
        self.payload = payload

        #self.ACCESS_TOKEN = 'M7OFDCmemyKoi461BJ4j'  # not mandatory


    def on_publish(client, userdata, payload):  # create function for callback
        print("================================")
        print(f"Message published!")
        print("================================")

    def publish(self):
        self.OCR_Publisher = paho.Client("OCR_Publisher")  # create client object
        self.OCR_Publisher.on_publish = self.on_publish  # assign function to callback
        #OCR_Publisher.username_pw_set(ACCESS_TOKEN)  # access token from thingsboard device
        self.OCR_Publisher.connect(self.broker, self.port, keepalive=60)  # establishing connection
        # publishing after every 5 secs

        self.OCR_Publisher.publish(self.topic, self.payload)
        print("===========================================")
        print(f'The container ID published is {self.payload}');
        print("===========================================")
        print("Please check data on your Subscriber Code \n")
        time.sleep(10)

