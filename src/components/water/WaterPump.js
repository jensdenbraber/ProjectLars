import React, { useState, useEffect } from 'react';
import { Switch } from '../input/Switch';
import { UseMqttState } from '../../hooks/mqtt'

const WaterPump = () => {

    const waterPumpStates = {
        0: "off",
        1: "on"
    }

    const topicName = "camper/actuators/waterpump"
    const { client } = UseMqttState();

    const [waterPumpState, setWaterPumpState] = useState(waterPumpStates[0])
    const [waterPumpSwitchState, setWaterPumpSwitchState] = useState(false)

    useEffect(() => {

        if (waterPumpSwitchState) {
            setWaterPumpState(waterPumpStates[0])
        }

        if (!waterPumpSwitchState) {
            setWaterPumpState(waterPumpStates[1])
        }
    }, [waterPumpSwitchState, waterPumpStates])

    const handleChange = (event) => {

        setWaterPumpSwitchState(event.target.checked)

        client.publish(topicName + '/in', "{ \"id\": " + Date.now() + ", \"state\": \"" + waterPumpState + "\" }", 2)
    };

    return <Switch
        checked={waterPumpSwitchState}
        onChange={handleChange}
    />
}

export default WaterPump;