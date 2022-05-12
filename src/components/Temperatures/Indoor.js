import React, { useState, useEffect } from 'react';

const Indoor = (props) => {

    const record = {
        // topic: 'camper/sensors/temperatures/48:3f:da:c:74:fe/out',
        topic: 'zigbee2mqtt/Binnen',
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
                console.log("indoor: " + JSONObject)
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
        {props.icon}
            <span>Indoor {temperature} &deg;C</span>
        </>
    );
}

export default Indoor;
