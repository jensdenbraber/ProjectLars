import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';

const GrayWater = (props) => {

    const record = {
        topic: 'camper/sensors/watertanklevels/48:3f:da:c:74:fe/out',
        qos: 0
    };

    const payload = props.connection.payload

    useEffect(() => {
        props.connection.subscribe(record);
    }, [])

    const [messages, setMessages] = useState(null)
    const [waterLevel, setWaterLevel] = useState(null)

    useEffect(() => {

        if (payload.topic) {
            if (payload.message) {

                var JSONObject = JSON.parse(payload.message)

                // console.log('Gray water level: ' + JSONObject['waterlevel'])

                setWaterLevel(JSONObject['waterlevel'])
                setMessages(payload)
            }
        }
    }, [payload])

    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <>
            <h2>
                Vuil water tank
            </h2>
            <div>
                <span>Gray {waterLevel} %</span>
            </div>
            <div>
                <span>Verwarmingselement</span>
            </div>
            <Switch
                checked={checked}
                onChange={handleChange}
            />
        </>
    );
}
export default GrayWater;
