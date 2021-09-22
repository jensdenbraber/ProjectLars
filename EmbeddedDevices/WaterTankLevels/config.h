#ifndef CONFIG_H
#define CONFIG_H

const char *mqtt_server = "192.168.68.69";
const uint16_t mqtt_server_port = 1883;

const uint8_t analogReadPin = A0;

const char *topic = "camper/sensors/watertanklevels"; // this is the [root topic]

const double waterTankEmptyResistance = 0.0;  // resistance measured when water tank is empty
const double waterTankFullResistance = 192.0; // resistance measured when water tank is full

#endif