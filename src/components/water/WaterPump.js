import React, { useState, useEffect } from 'react';
import { Switch } from '../input/Switch';
import { UseMqttState } from '../../hooks/mqtt'

const WaterPump = () => {

    const waterPumpStates = {
        Off: "off",
        On: "on"
    }

    const topicName = "camper/actuators/waterpump"
    const { client } = UseMqttState();

    const [waterPumpState, setWaterPumpState] = useState(waterPumpStates.Off)
    const [waterPumpSwitchState, setWaterPumpSwitchState] = useState(false)

    useEffect(() => {

        if (waterPumpSwitchState) {
            setWaterPumpState(waterPumpStates.Off)
        }

        if (!waterPumpSwitchState) {
            setWaterPumpState(waterPumpStates.On)
        }
    }, [waterPumpSwitchState, waterPumpStates])

    const handleChange = (event) => {

        setWaterPumpSwitchState(event.target.checked)

        client.publish(`${topicName}/in`, `{ \"id\": ${Date.now()}, \"state\": \"${waterPumpState}\" }`, 2)
    };

    return <Switch
        checked={waterPumpSwitchState}
        onChange={handleChange}
    />
}

export default WaterPump;