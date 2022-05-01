import React, { useState, useEffect } from 'react';

const Outdoor = (props) => {

    const record = {
        topic: 'camper/sensors/watertanklevels/48:3f:da:c:74:fe/out',
        qos: 0
    };

    const payload = props.connection.payload

    useEffect(() => {
        props.connection.subscribe(record);
    }, [])

    const [messages, setMessages] = useState(null)
    const [temperature, setWaterLevel] = useState(100)

    useEffect(() => {

        if (payload.topic) {
            if (payload.message) {

                var JSONObject = JSON.parse(payload.message)

                // console.log('clean water level: ' + JSONObject['waterlevel'])

                setWaterLevel(JSONObject['waterlevel'])
                setMessages(payload)
            }
        }
    }, [payload])

    // useEffect(() => {
    //     console.log(messages)
    // }, [messages])

    return (
        <>
            <span>Outdoor {temperature} C</span>
        </>
    );
}

export default Outdoor;
