import paho.mqtt.client as paho
import time
import sys
import datetime
import time
import cv2
import numpy as np
from OCR_Engine import *
from OCR_Client_Publisher_Class import *
imgready = False
image_data = bytearray()
topic = "ContainerID/+"
#flag_topic ="ContainerID/ImageXAvail"

data ={}
topics =[]
broker = "localhost"  # host name
port = 1883  # MQTT data listening port
loop_flag = 1

def on_message(client, userdata, message):
    print(f'A message with topic {message.topic} received')
    global image
    global topics
    global imgready
    global   loop_flag
    imgready = True
    loop_flag = 0
    topic_index =str(message.topic).strip("ContainerID/ImageX")
    print(f'topic_index is {topic_index}')
    data[str(message.topic).strip("ContainerID/ImageX")] = message.payload
    client.unsubscribe()


def on_connect(client, userdata, flags, rc):
    global loop_flag
    print("In on_connect callback")

    time.sleep(5)

def subscribe(client,topic):
    print("connecting to broker host", broker)
    print(f"subscribing to topic {topic} begins here")
    client.on_connect = on_connect
    client.on_message = on_message  # attach a function to callback
    client.connect(broker, port, 60)  # connect to broker
    client.on_connect= on_connect
    client.subscribe(topic)
    client.loop_start()


    counter = 0
    while loop_flag == 1 and counter <=5:
        print(f"waiting for callback to occcur, {counter}")
        time.sleep(5)  # pause 1/100 seconds
        counter+=1
    print('disconnecting from client and stopping the loop now')
    client.disconnect()
    client.loop_stop()

client = paho.Client("OCR_Client_Subscriber")

#subscribe(client,flag_topic)

subscribe(client=client, topic=topic)

# for i in range(len(topics)):
#     print(f'topic {i} is {topics[i]}')
#     subscribe(client=client, topic=topics[i])
#
if imgready == True:
    length = len(data)
    for i in range(length):
        index = '{:02d}'.format(i)
        image_data.extend(data[index])


# print(f'Image data received, will now display')






if (imgready == True):
    nparr = np.frombuffer(image_data, np.uint8)
    img = cv2.imdecode(nparr, 1)
    OCR_Engine = ocr_Engine(imaged=img, padding=20)
    OCR_Engine.run()
    Container_ID_Num = OCR_Engine.OCR_Text
    payload = "ID,B3,cont," + Container_ID_Num
    pub_broker = "3.127.172.28"
    published_topic = "beacon/output"
    publisher = text_publisher(pub_broker, port, published_topic, payload)
    publisher.publish()
    # Optionally show the image
    cv2.imshow('Demo', img)
    cv2.waitKey(0)







