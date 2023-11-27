import React, { useState, useEffect } from 'react';
import { Thermostat } from '@mui/icons-material';
import { UseSubscription } from '../../hooks/mqtt'

const Indoor = () => {

    const { message } = UseSubscription("camper/sensors/binnen");
    const [temperature, setTemperature] = useState(null)

    useEffect(() => {
        if (message?.topic) {
            if (message.message) {

                var jsonObject = JSON.parse(message.message)

                // {"battery":74,"humidity":85.57,"linkquality":57,"pressure":1025,"temperature":-10.42,"voltage":2955}
                setTemperature(jsonObject['temperature'])
            }
        }
    }, [message])

    return (
        <>
            <Thermostat style={{ fill: "blue" }} />
            <span>Indoor {temperature} &deg;C</span>
        </>
    );
}

export default Indoor;
