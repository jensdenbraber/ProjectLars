double waterTankLevel = 0.0;
double waterTankEmptyResistence = 32.6; // resistence measured when water tank is empty
double waterTankFullResistence = 8; // resistence measured when water tank is full

void setup() {
  Serial.begin(9600);
}

void loop() {
  int sensorwaterTankLevel = analogRead(A0);
  waterTankLevel = map(sensorwaterTankLevel, waterTankFullResistence, waterTankEmptyResistence, 0, 100);
  
  waterTankLevel = max(waterTankLevel, 0.0);
  waterTankLevel = min(waterTankLevel, 100.0);
}