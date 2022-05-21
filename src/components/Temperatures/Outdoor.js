import React, { useState, useEffect } from 'react';
import { Forest } from '@mui/icons-material';

const Outdoor = (props) => {

    const payload = props.connection.payload

    useEffect(() => {
        const record = {
            // topic: 'camper/sensors/temperatures/48:3f:da:c:74:fe/out',
            topic: 'zigbee2mqtt/Buiten',
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
            <div>
                <Forest style={{ fill: "green" }} />
                <span>Outdoor {temperature} &deg;C</span>
            </div>
        </>
    );
}

export default Outdoor;
