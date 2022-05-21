import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';


const Boiler = (props) => {
    const topicName = "camper/actuators/boiler/"

    const payload = props.connection.payload

    useEffect(() => {
        console.log("payload.topic: " + topicName)
        props.connection.subscribe({ topic: topicName + 'out', qos: 0 })
    }, [props.connection])

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
            }
        }
    }, [payload])

    const boilerStatus = {
        0: "off",
        1: "50 degrees",
        2: "70 degrees"
    }

    useEffect(() => {
        console.log("boilerState updated to: " + boilerState)
        props.connection.publish({
            topic: topicName + 'in',
            qos: 0,
            payload: boilerState.toString()
        })
    }, [boilerState, props.connection])

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
