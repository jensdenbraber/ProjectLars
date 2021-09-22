#include <ESP8266WiFi.h>
#include "authorization.h"
 
WiFiServer server(80);

double waterTankLevel = 0.0;
double waterTankEmptyResistence = 0; // resistence measured when water tank is empty
double waterTankFullResistence = 192; // resistence measured when water tank is full

void setup() {
  Serial.begin(9600);

  pinMode(LED_BUILTIN, OUTPUT);
 
  delay(10);
  
  // Connect to WiFi network
  Serial.println();
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
 
  // Start the server
  server.begin();
  Serial.println("Server started");
 
  // Print the IP address
  Serial.print("Use this URL : ");
  Serial.print("http://");
  Serial.print(WiFi.localIP());
  Serial.println("/");
}

void loop() {
  int sensorwaterTankLevel = analogRead(A0);
  waterTankLevel = map(sensorwaterTankLevel, waterTankFullResistence, waterTankEmptyResistence, 0, 100);
  
  waterTankLevel = max(waterTankLevel, 0.0);
  waterTankLevel = min(waterTankLevel, 100.0);


  // Check if a client has connected
  WiFiClient client = server.available();
  if (!client) {
    return;
  }
 
  // Wait until the client sends some data
  Serial.println("new client");
  while(!client.available()){
    delay(1);
  }
  
  // Return the response
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/json");
  client.println(""); //  do not forget this one
  client.println("{");
  client.print("\"waterTankLevel\":");
  client.println(waterTankLevel);
  client.println("}");

  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);                       // wait for a second
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
 
  delay(1);
  Serial.println("Client disconnected");
  Serial.println("");
}
