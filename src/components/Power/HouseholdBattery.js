import React, { useState, useEffect } from 'react';
import { Slider } from '@mui/material';

const HouseHoldBattery = (props) => {

    const record = {
        topic: 'camper/sensors/watertanklevels/48:3f:da:c:74:fe/out',
        qos: 0
    };

    const payload = props.connection.payload

    useEffect(() => {
        props.connection.subscribe(record);
    }, [])

    const [messages, setMessages] = useState(null)
    const [batteryLevel, setBatteryLevel] = useState(100)

    useEffect(() => {

        if (payload.topic) {
            if (payload.message) {

                var JSONObject = JSON.parse(payload.message)

                // console.log('clean water level: ' + JSONObject['waterlevel'])

                setBatteryLevel(JSONObject['waterlevel'])
                setMessages(payload)
            }
        }
    }, [payload])

    // useEffect(() => {
    //     console.log(messages)
    // }, [messages])

    const handleSliderChange = (event, batteryLevel) => {

        console.log('handleSliderChange: ' + batteryLevel)
        setBatteryLevel(batteryLevel);
    };

    return (
        <>
            <Slider style={{ minHeight: "100%" }}
                onChange={handleSliderChange}
                aria-label="Always visible"
                defaultValue={batteryLevel}
                orientation="vertical"
                step={1}
                value={batteryLevel}
            />
            <span>House hold battery {batteryLevel} %</span>
        </>
    );
}

export default HouseHoldBattery;
