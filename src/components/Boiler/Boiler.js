import React, { useState, useEffect } from 'react';
import { Shower } from '@mui/icons-material';
import Switch from '@mui/material/Switch';
import Clock from '../Clock'

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
    }, [props.connection])

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

    const boilerStatus = {
        0: "off",
        1: "50 degrees",
        2: "70 degrees"
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


    const [checked50, setChecked50] = React.useState(false);
    const [checked70, setChecked70] = React.useState(false);

    const handleChange50 = (event) => {

        if (checked70) {
            setChecked70(false);
        }

        setChecked50(event.target.checked);


    };

    const handleChange70 = (event) => {

        if (checked50) {
            setChecked50(false);
        }

        setChecked70(event.target.checked);
    };

    return (
        <>
            {/* <FloatingBox {...props} action={updateBoilerState} icon={<Shower style={{ fill: "yellow" }} className="full-screen" />}>
                {boilerNames[boilerState]}
            </FloatingBox> */}

            <h2>
                Boiler
            </h2>
            <div>
                <span>50 graden</span>
            </div>
            <Switch
                checked={checked50}
                onChange={handleChange50}
            />

            <div>
                <span>70 graden</span>
            </div>
            <Switch
                checked={checked70}
                onChange={handleChange70}
            />


        </>
    );
}

export default Boiler;
