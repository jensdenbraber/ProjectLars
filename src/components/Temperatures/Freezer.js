import React, { useState, useEffect } from 'react';
import { AcUnit } from '@mui/icons-material';

const Freezer = (props) => {

    const payload = props.connection.payload

    useEffect(() => {
        const record = {
            topic: 'zigbee2mqtt/Vriezer',
            // topic: 'camper/sensors/temperatures/48:3f:da:c:74:fe/out',
            qos: 0
        };

        props.connection.subscribe(record);
    }, [props.connection])

    const [temperature, setTemperature] = useState(null)

    useEffect(() => {
        if (payload.topic) {
            if (payload.message) {

                var jsonObject = JSON.parse(payload.message)

                // {"battery":74,"humidity":85.57,"linkquality":57,"pressure":1025,"temperature":-10.42,"voltage":2955}
                setTemperature(jsonObject['temperature'])
            }
        }
    }, [payload])

    return (
        <>
            <div>
                <AcUnit style={{ fill: "darkblue" }} />
                <span>Freezer {temperature} &deg;C</span>
            </div>
        </>
    );
}

export default Freezer;
