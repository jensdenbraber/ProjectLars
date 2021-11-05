import React, { useState, useEffect } from 'react';
import { WbSunny } from '@mui/icons-material';

import FloatingBox from '../FloatingBox';

const Boiler = (props) => {
    const topicName = "camper/sensors/watertanklevels/48:3f:da:c:74:fe/"

    const payload = props.connection.payload

    useEffect(() => {
        props.connection.subscribe({ topic: topicName + 'out', qos: 0 })
    })

    const [messages, setMessages] = useState(null)

    const [boilerState, setBoilerState] = useState(0)

    useEffect(() => {

        if (payload.topic) {
            if (payload.message) {

                var JSONObject = JSON.parse(payload.message)

                console.log('Boiler status: ' + JSONObject['waterlevel'])

                setMessages(payload)
            }
        }
    }, [payload])

    const boilerNames = {
        0: "uit",
        1: "50 graden",
        2: "70 graden"
    }

    useEffect(() => {
        console.log(messages)
    }, [messages])

    useEffect(() => {
        console.log("boilerState updated to: " + boilerState)
        props.connection.publish({
            topic: topicName + 'in',
            qos: 0,
            payload: boilerState.toString()
        })
    }, [boilerState])

    const updateBoilerState = () => {
        setBoilerState((boilerState + 1) % 3)
    }

    return (
        <>
            <FloatingBox {...props} action={updateBoilerState} icon={<WbSunny style={{ fill: "yellow" }} className="full-screen" />}>
                {boilerNames[boilerState]}
            </FloatingBox>
        </>
    );
}

export default Boiler;
