import React, { useState, useEffect } from 'react';
import { Shower } from '@mui/icons-material';

import FloatingBox from '../FloatingBox';



const Boiler = (props) => {
    const topicName = "camper/actuators/boiler/"

    const record = {
        topic: 'camper/actuators/boiler/',
        qos: 0
    };

    const payload = props.connection.payload

    const cameraLocation = {
        x: 4.206653662809857,
        y: 4.816040836249811,
        z: -5.2963406179614525,
        rotation_x: -152.627867362219,
        rotation_y: 32.115416846151234,
        rotation_z: 164.61087479840168
    }

    useEffect(() => {
        console.log("payload.topic: " + topicName)
        props.connection.subscribe({ topic: topicName + 'out', qos: 0 })
    }, [])

    const [messages, setMessages] = useState(null)

    const [boilerState, setBoilerState] = useState(0)

    useEffect(() => {

        if (payload.topic) {
            console.log("payload.topic: " + payload.topic.toString())

            console.log("payload.message: " + payload.message)

            if (payload.message) {

                console.log('Boiler received: ' + payload.message.toString())

                // var JSONObject = JSON.parse(payload.message)

                // console.log('Boiler status: ' + JSONObject['waterlevel'])

                // setBoilerState(payload)
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

        props.startMovingCamera(cameraLocation)
    }

    return (
        <>
            <FloatingBox {...props} action={updateBoilerState} icon={<Shower style={{ fill: "yellow" }} className="full-screen" />}>
                {boilerNames[boilerState]}
            </FloatingBox>
        </>
    );
}

export default Boiler;
