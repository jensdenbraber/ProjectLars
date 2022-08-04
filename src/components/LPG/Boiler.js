import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useSubscription, useMqttState } from 'mqtt-react-hooks';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Boiler = (props) => {

    const topicName = "camper/actuators/boiler"

    // const { payload } = useSubscription(topicName + '/out');
    const { client, connectionStatus } = useMqttState();

    const boilerStates = {
        0: "off",
        1: "50_degrees",
        2: "70_degrees"
    }

    const [checked50, setChecked50] = useState(false);
    const [checked70, setChecked70] = useState(false);
    const [boilerState, setBoilerState] = useState(boilerStates[0])

    // useEffect(() => {

    //     if (payload?.topic?.includes(topicName)) {
    //         console.log("payload.topic: " + payload.topic.toString())

    //         console.log("payload.message: " + payload.message)

    //         if (payload.message) {

    //             // console.log('Boiler received: ' + payload.message.toString())

    //             var jsonObject = JSON.parse(payload.message)

    //             // console.log('JSONObject: ' + jsonObject)
    //             console.log('[Payload]: ' + payload)
    //             console.log('Boiler status: ' + jsonObject['state'])

    //             setOpen(true)
    //         }
    //     }
    // }, [payload])

    useEffect(() => {

        console.log("boilerState: " + boilerState)
        console.log("published...")

        client?.publish(topicName + '/in', "{ \"state\": \"" + boilerState + "\" }", 2);


    }, [boilerState, boilerStates, client])

    useEffect(() => {
        if (checked50) {
            setBoilerState(boilerStates[1])
        }

        if (checked70) {
            setBoilerState(boilerStates[2])
        }

        if (!checked50 && !checked70) {
            setBoilerState(boilerStates[0])
        }
    }, [boilerState, boilerStates, checked50, checked70])

    const handleChange50 = (event) => {

        if (checked70) {
            setChecked70(false);
        }

        setChecked50(event.target.checked);
        setOpen(true);
        client?.publish(topicName + '/in', "{ \"state\": \"" + boilerState + "\" }", 2);
    };

    const handleChange70 = (event) => {

        if (checked50) {
            setChecked50(false);
        }

        setChecked70(event.target.checked);
        setOpen(true);
        client?.publish(topicName + '/in', "{ \"state\": \"" + boilerState + "\" }", 2);
    };

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Boiler status: {boilerState}
                </Alert>
            </Snackbar>

            <h2>
                Boiler {connectionStatus}
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
