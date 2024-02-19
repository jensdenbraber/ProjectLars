import React, { useState, useEffect } from 'react';
import { Switch } from '../input/Switch';
import { UseMqttState } from '../../hooks/mqtt'
import WaterPumpStates from '../../constants/BoilerStates';

const WaterPump = () => {

    const topicName = "camper/actuators/waterpump"
    const { client } = UseMqttState();

    const [waterPumpState, setWaterPumpState] = useState(WaterPumpStates.Off)
    const [waterPumpSwitchState, setWaterPumpSwitchState] = useState(false)

    useEffect(() => {

        if (waterPumpSwitchState) {
            setWaterPumpState(WaterPumpStates.Off)
        }

        if (!waterPumpSwitchState) {
            setWaterPumpState(WaterPumpStates.On)
        }
    }, [waterPumpSwitchState, WaterPumpStates])

    const handleChange = (event) => {

        setWaterPumpSwitchState(event.target.checked)

        client.publish(`${topicName}/in`, `{ "id": ${Date.now()}, "state": "${waterPumpState}" }`, 2)
    };

    return <Switch
        checked={waterPumpSwitchState}
        onChange={handleChange}
    />
}

export default WaterPump;