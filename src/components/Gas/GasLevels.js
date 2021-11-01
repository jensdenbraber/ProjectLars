import React, { useState, useEffect } from 'react';
import { Slider } from '@mui/material';
import { LocalGasStation } from '@mui/icons-material';

import FloatingBox from '../FloatingBox';

const WaterTankLevels = ({ mqttSub, unSub, showUnsub, payload }) => {

    const record = {
        topic: 'camper/sensors/watertanklevels/48:3f:da:c:74:fe/out',
        qos: 0
    };

    useEffect(() => {
        mqttSub(record);
    })

    const [messages, setMessages] = useState(null)
    const [gasLevel, setGasLevel] = useState(100)

    useEffect(() => {

        if (payload.topic) {
            if (payload.message) {

                var JSONObject = JSON.parse(payload.message)

                console.log('clean water level: ' + JSONObject['waterlevel'])

                setGasLevel(JSONObject['waterlevel'])
                setMessages(payload)
            }
        }
    }, [payload])

    useEffect(() => {
        console.log(messages)
    }, [messages])

    const handleSliderChange = (event, gasLevel) => {

        console.log('handleSliderChange: ' + gasLevel)
        setGasLevel(gasLevel);
    };

    return (
        <>
            <FloatingBox top="60%" left="50%" width="13%" height="30%" icon={<LocalGasStation style={{ fill: "orange" }} className="full-screen" />}>
                <Slider style={{ minHeight: "100%" }}
                    onChange={handleSliderChange}
                    aria-label="Always visible"
                    defaultValue={gasLevel}
                    orientation="vertical"
                    step={1}
                    value={gasLevel}
                />
                <span>Gas {gasLevel} %</span>
            </FloatingBox>
        </>
    );
}

export default WaterTankLevels;