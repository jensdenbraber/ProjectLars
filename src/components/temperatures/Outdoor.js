import React, { useState, useEffect } from 'react';
import { Forest } from '@mui/icons-material';
import { UseSubscription } from '../../hooks'

const Outdoor = () => {

    const { message } = UseSubscription("camper/sensors/buiten");
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
        <div>
            <Forest style={{ fill: "green" }} />
            <span>Outdoor {temperature} &deg;C</span>
        </div>
    );
}

export default Outdoor;
