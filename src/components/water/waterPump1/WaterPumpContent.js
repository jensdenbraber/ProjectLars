import React, { useState, useEffect } from 'react';
import { Switch } from '@mui/material';
import { UseSubscription, UseMqttState } from '../../../hooks/mqtt'

const WaterPumpContent = () => {

    const waterPumpStates = {
        0: "off",
        1: "on"
    }

    const topicName = "camper/actuators/waterpump"

    const { payload } = UseSubscription(topicName + '/out');
    const { client } = UseMqttState();

    const [waterPumpState, setWaterPumpState] = useState(waterPumpStates[0])
    const [waterPumpSwitchState, setWaterPumpSwitchState] = useState(false)

    const [, setOpen] = React.useState(false);

    useEffect(() => {

        // console.log("payload: " + payload)
        // console.log("payload.topic: " + payload?.topic.toString())

        if (payload) {
            // console.log("payload!!!!!")
        }

        if (payload?.topic?.includes(topicName)) {
            // console.log("payload.topic: " + payload.topic.toString())

            // console.log("payload.message: " + payload.message)

            if (payload.message) {

                var jsonObject = JSON.parse(payload.message)

                console.log('waterpump status: ' + jsonObject['state'])

                setOpen(true)
            }
        }
    }, [payload])

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

        if (waterPumpState == "on") {
            console.log("waterPumpState == on")
        }

        if (waterPumpState == "off") {
            console.log("waterPumpState == off")
        }
    };

    return <Switch
        checked={waterPumpSwitchState}
        onChange={handleChange}
    />
}

export default WaterPumpContent;