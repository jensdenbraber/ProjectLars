import React, { useEffect, useState } from 'react';
import { Slider } from '@mui/material';

const GrayWater = ({ mqttSub, payload }) => {

    const record = {
        topic: 'camper/sensors/watertanklevels/48:3f:da:c:74:fe/out',
        qos: 0
    };

    useEffect(() => {
        mqttSub(record);
    })

    const [messages, setMessages] = useState(null)
    const [waterLevel, setWaterLevel] = useState(100)

    useEffect(() => {

        if (payload.topic) {
            if (payload.message) {

                var JSONObject = JSON.parse(payload.message)

                console.log('Grat water level: ' + JSONObject['waterlevel'])

                setWaterLevel(JSONObject['waterlevel'])
                setMessages(payload)
            }
        }
    }, [payload])

    useEffect(() => {
        console.log(messages)
    }, [messages])

    const handleSliderChange = (event, waterLevel) => {

        console.log('handleSliderChange: ' + waterLevel)
        setWaterLevel(waterLevel);
    };

    return (
        <>
            <Slider style={{ minHeight: "100%" }}
                onChange={handleSliderChange}
                aria-label="Always visible"
                defaultValue={waterLevel}
                orientation="vertical"
                step={1}
                value={waterLevel}
            />
            <span>Gray {waterLevel} %</span>
        </>
    );
}
export default GrayWater;
