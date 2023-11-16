import React, { useState, useEffect } from 'react';
import { Thermostat } from '@mui/icons-material';
import { UseSubscription } from '../hooks/mqtt'

const Indoor = () => {

    const { message } = UseSubscription("camper/sensors/binnen");

    // const payload = props.connection.payload

    // useEffect(() => {
    //     const record = {
    //         // topic: 'camper/sensors/temperatures/48:3f:da:c:74:fe/out',
    //         topic: 'zigbee2mqtt/Binnen',
    //         qos: 0
    //     };

    //     props.connection.subscribe(record);
    // }, [props.connection])

    const [temperature, setTemperature] = useState(null)

    useEffect(() => {
        if (message?.topic) {
            if (message.message) {

                var jsonObject = JSON.parse(message.message)

                // console.log("jsonObject: " + jsonObject)

                // {"battery":74,"humidity":85.57,"linkquality":57,"pressure":1025,"temperature":-10.42,"voltage":2955}
                setTemperature(jsonObject['temperature'])
            }
        }
    }, [message])

    // useEffect(() => {
    //     if (payload.topic) {
    //         if (payload.message) {

    //             var jsonObject = JSON.parse(payload.message)

    //             setTemperature(jsonObject['temperature'])
    //         }
    //     }
    // }, [payload])

    return (
        <>
            <Thermostat style={{ fill: "blue" }} />
            <span>Indoor {temperature} &deg;C</span>
        </>
    );
}

export default Indoor;
