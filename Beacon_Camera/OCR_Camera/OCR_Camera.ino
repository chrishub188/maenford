/******************************************************************************
ESP32-CAM remote image access via HTTP. Take pictures with ESP32 and upload it via MQTT making it accessible for the outisde network on Node_RED

Leonardo Bispo
July - 2019
https://github.com/ldab/ESP32-CAM-MQTT
Distributed as-is; no warranty is given.
******************************************************************************/

#include <Arduino.h>



// Enable Debug interface and serial prints over UART1
#define DEGUB_ESP

// WiFi libraries
#include <WiFi.h>
#include "esp_wifi.h"

// MQTT
extern "C" {
  #include "freertos/FreeRTOS.h"
  #include "freertos/timers.h"
  
}
#include <AsyncMqttClient.h>
// Camera related
#include "esp_camera.h"
#include "esp_timer.h"
#include "img_converters.h"

#include "fb_gfx.h"
#include "fd_forward.h"
#include "fr_forward.h"
//#include "dl_lib.h"

// Connection timeout;
#define CON_TIMEOUT   1*60*1000*1000                 // milliseconds

// Not using Deep Sleep on PCB because TPL5110 timer takes over.
#define TIME_TO_SLEEP (uint64_t)10*60*1000*1000   // microseconds

// WiFi Credentials
#define WIFI_SSID     "bdx"
#define WIFI_PASSWORD "Maenford#2020!"



// MQTT Broker configuration
#define MQTT_HOST     "192.168.137.1"
#define MQTT_PORT     1883
#define USERNAME      ""
#define PASSWORD      ""
#define TOPIC_PIC     "Container_ID Image"

#ifdef DEGUB_ESP
  #define DBG(x) Serial.println(x)
#else 
  #define DBG(...)
#endif

// Get MAC Address 

String getMacAddress() {
  uint8_t baseMac[6];
  // Get MAC address for WiFi station
  esp_read_mac(baseMac, ESP_MAC_WIFI_STA);
  char baseMacChr[18] = {0};
  sprintf(baseMacChr, "%02X:%02X:%02X:%02X:%02X:%02X", 
			baseMac[0], baseMac[1], baseMac[2], baseMac[3], baseMac[4], baseMac[5]);
  return String(baseMacChr);
}

//TOPIC_PIC += String String getMacAddress();


String mac = getMacAddress();
const int LED_BUILTIN = 4;

// Camera buffer, URL and picture name
camera_fb_t *fb = NULL;

// MQTT callback
AsyncMqttClient mqttClient;
TimerHandle_t   mqttReconnectTimer;
TimerHandle_t   wifiReconnectTimer;

// Create functions prior to calling them as .cpp files are differnt from Arduino .ino
void connectWiFi( void );
void connectMQTT( void );
void deep_sleep ( void );
bool camera_init(void);
bool take_picture(void);

void onMqttConnect(bool sessionPresent)
{
  // Take picture
  take_picture();

  // Publish picture
  const char* pic_buf = (const char*)(fb->buf);
  size_t length = fb->len;

  //uint16_t packetIdPubTemp = mqttClient.publish( TOPIC_PIC, 0, false, pic_buf, length );
  
//====================================================================================================== 
  // GT: 4kB chunks should be less than max buffer size to be compatible 
  //		for MQTT publishing via AsyncMqttClient library
  //	split image into incremental 4kB chunks and publish 
  //		each in its own topic for reassembly on other end.
	#define PKTSIZE	4096
	#define TOPIC_PIC_TMPL     "ContainerID/ImageX%02d"
	#define TOPIC_PIC_NAMESIZE	32
	
	char topic_series[TOPIC_PIC_NAMESIZE];
	char * pbuf;
	int ipkt;
	size_t remaining;
  
	for (remaining = length, 				// initialize "remaining"
			pbuf = (char *) pic_buf,		// initialize pbuf : pointer to data packet to publish
			ipkt = 0;						// initialize ipkt : packet count
				remaining > 0; 					// any more data left?
					remaining = (remaining >= PKTSIZE) ? remaining - PKTSIZE : 0,
													// update "remaining"
					pbuf += PKTSIZE,				// update "pbuf" pointer for next packet
					ipkt++) 						// update packt count
	{
							
		sprintf(topic_series,TOPIC_PIC_TMPL, ipkt);	// construct topic name for *this* packet
		uint16_t packetIdPubTemp = mqttClient.publish( 
						topic_series, 				// topic name of *this* packet
						1, 							// QoS mode of *this* packet
						true, 						// retain attrib of *this* packet
						pbuf, 						// pointer to *this* packet
						(remaining >= PKTSIZE) ? PKTSIZE : remaining );	// size of *this* packet
		
//====================================================================================================== 

  
  DBG("buffer is " + String(length) + " bytes");

  // No delay result in no message sent.
  delay(300);

  if( !packetIdPubTemp  )
  {
    DBG( "Sending Failed! err: " + String( packetIdPubTemp ) );
  }
  else
  {
    DBG("MQTT Publish succesful");
  }
 
//====================================================================================================== 
	// GT: after sending all of image data in 4kB chunks, each chunk in separate topic
	//		send final trigger flag (with image size in bytes) in designated topic
	//		to indicate all of new image'd data is completely published/available 
	//		and ready for processing
	}
	#define TOPIC_PIC_AVAIL "ContainerID/ImageXAvail"
	char slen[16];
	sprintf(slen,"%d",length);
	uint16_t packetIdPubTemp = mqttClient.publish(TOPIC_PIC_AVAIL,1,false,slen,strlen(slen));
	delay(1500);
	if( !packetIdPubTemp  ) {
		DBG( "Sending Failed! err: " + String( packetIdPubTemp ) );
	} else {
		DBG("MQTT Final Flag Publish succesful");
	}
//====================================================================================================== 
  
  deep_sleep();
}

bool take_picture()
{
  DBG("Taking picture now");
  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(100);                       // wait for a second
  //digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  delay(100);  
  fb = esp_camera_fb_get();  
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  //delay(100);                       // wait for a second
  if(!fb)
  {
    DBG("Camera capture failed");
    return false;
  }
  
  DBG("Camera capture success");
  Serial.print("Image format: ");
  DBG(fb->format);
  return true;
}

void deep_sleep()
{
  DBG("Going to sleep after: " + String( millis() ) + "ms");
  Serial.flush();

  esp_deep_sleep_start();
}

void setup()
{
#ifdef DEGUB_ESP
  Serial.begin(115200);
  
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW); 
  //Serial.setDebugOutput(true);
#endif

  // COnfigure MQTT Broker and callback
  mqttReconnectTimer = xTimerCreate("mqttTimer", pdMS_TO_TICKS(2000), pdFALSE, (void*)0, reinterpret_cast<TimerCallbackFunction_t>(connectMQTT));
  mqttClient.setCredentials( USERNAME, PASSWORD );
  mqttClient.onConnect (onMqttConnect );
  mqttClient.setServer( MQTT_HOST, MQTT_PORT );

  // Initialize and configure camera
  camera_init();
  
  // Enable timer wakeup for ESP32 sleep
  esp_sleep_enable_timer_wakeup( TIME_TO_SLEEP );

  connectWiFi();
  connectMQTT();

}

void loop() {
  // put your main code here, to run repeatedly:
  
}

bool camera_init()
{
  // IF USING A DIFFERENT BOARD, NEED DIFFERENT PINs
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer   = LEDC_TIMER_0;
  config.pin_d0       = 5;
  config.pin_d1       = 18;
  config.pin_d2       = 19;
  config.pin_d3       = 21;
  config.pin_d4       = 36;
  config.pin_d5       = 39;
  config.pin_d6       = 34;
  config.pin_d7       = 35;
  config.pin_xclk     = 0;
  config.pin_pclk     = 22;
  config.pin_vsync    = 25;
  config.pin_href     = 23;
  config.pin_sscb_sda = 26;
  config.pin_sscb_scl = 27;
  config.pin_pwdn     = 32;
  config.pin_reset    = -1;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  //init with high specs to pre-allocate larger buffers
  config.frame_size   = FRAMESIZE_SVGA; // set picture size, FRAMESIZE_QQVGA = 160x120 // // FRAMESIZE_ + QVGA|CIF|VGA|SVGA|XGA|SXGA|UXGA
  config.jpeg_quality = 22;            // quality of JPEG output. 0-63 lower means higher quality
  config.fb_count     = 1;

  // camera init
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK)
  {
    Serial.print("Camera init failed with error 0x%x");
    DBG(err);
    return false;
  }

  // Change extra settings if required
  //sensor_t * s = esp_camera_sensor_get();
  //s->set_vflip(s, 0);       //flip it back
  //s->set_brightness(s, 1);  //up the blightness just a bit
  //s->set_saturation(s, -2); //lower the saturation

  else
  {
    return true;
  }
  
}

void connectWiFi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED);
  {
    delay(500);
    Serial.print(".");
  }

  //if( WiFi.status() != WL_CONNECTED );
 // {
   // DBG("Failed to connect to WiFi");
   // delay( 600 );
  //  deep_sleep();
  //}

  DBG();
  DBG("WiFi connected");
  Serial.print("Device IP address is: ");
  DBG(WiFi.localIP());

}

void connectMQTT() {
  DBG("Connecting to MQTT...");
  mqttClient.connect();
  delay(250);
  while( !mqttClient.connected() && millis() < CON_TIMEOUT)
  {
     delay(250);
    Serial.print(".");
  }
  if( mqttClient.connected() )
  {
   DBG("Device connected to MQTT Broker");
  }
  else
  {
    DBG("Device failed to connect to MQTT Broker");
    deep_sleep();
  }

}
