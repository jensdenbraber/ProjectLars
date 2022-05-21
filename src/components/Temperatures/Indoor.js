import React, { useState, useEffect } from 'react';
import { Thermostat } from '@mui/icons-material';

const Indoor = (props) => {

    const payload = props.connection.payload

    useEffect(() => {
        const record = {
            // topic: 'camper/sensors/temperatures/48:3f:da:c:74:fe/out',
            topic: 'zigbee2mqtt/Binnen',
            qos: 0
        };

        props.connection.subscribe(record);
    }, [props.connection])

    const [temperature, setTemperature] = useState(null)

    useEffect(() => {
        if (payload.topic) {
            if (payload.message) {

                var jsonObject = JSON.parse(payload.message)

                setTemperature(jsonObject['temperature'])
            }
        }
    }, [payload])

    return (
        <>
            <Thermostat style={{ fill: "blue" }} />
            <span>Indoor {temperature} &deg;C</span>
        </>
    );
}

export default Indoor;
