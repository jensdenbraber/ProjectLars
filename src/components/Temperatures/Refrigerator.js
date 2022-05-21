import React, { useState, useEffect } from 'react';
import { AcUnit } from '@mui/icons-material';

const Refrigerator = (props) => {

    const payload = props.connection.payload

    useEffect(() => {
        const record = {
            // topic: 'camper/sensors/temperatures/48:3f:da:c:74:fe/out',
            topic: 'zigbee2mqtt/Koelkast',
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
                <AcUnit style={{ fill: "blue" }} />
                <span>Refrigerator {temperature} &deg;C</span>
            </div>
        </>
    );
}

export default Refrigerator;
