import React, { useState, useEffect } from 'react';
// import { LocalDrink } from '@mui/icons-material';

const Freezer = (props) => {

    const record = {
        topic: 'zigbee2mqtt/Vriezer',
        // topic: 'camper/sensors/temperatures/48:3f:da:c:74:fe/out',
        qos: 0
    };

    const payload = props.connection.payload

    useEffect(() => {
        props.connection.subscribe(record);
    }, [])

    const [messages, setMessages] = useState(null)
    const [temperature, setTemperature] = useState(null)

    useEffect(() => {

        if (payload.topic) {
            if (payload.message) {

                var JSONObject = JSON.parse(payload.message)

                // console.log('clean water level: ' + JSONObject['waterlevel'])

                // {"battery":74,"humidity":85.57,"linkquality":57,"pressure":1025,"temperature":-10.42,"voltage":2955}
console.log("freezer: " + JSONObject)
                setTemperature(JSONObject['temperature'])
                setMessages(payload)
            }
        }
    }, [payload])

    // useEffect(() => {
    //     console.log(messages)
    // }, [messages])

    return (
        <>
            <div>
                {props.icon}{props.icon}
                <span>Freezer {temperature} &deg;C</span>
            </div>
        </>
    );
}

export default Freezer;
