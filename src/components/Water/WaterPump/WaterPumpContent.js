import React, { useState, useEffect } from 'react';
import { Switch } from '../../input/Switch';
import { FormControlLabel } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import useSubscription from '../../Hook/UseSubscription';
import useMqttState from '../../Hook/UseMqttState';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const WaterPumpContent = (props) => {

    const waterPumpStates = {
        0: "off",
        1: "on"
    }

    const topicName = "camper/actuators/waterpump"

    const { payload } = useSubscription(topicName + '/out');
    const { connectionStatus, client } = useMqttState();

    const [waterPumpState, setWaterPumpState] = useState(waterPumpStates[0])
    const [waterPumpSwitchState, setWaterPumpSwitchState] = useState(false)

    const [open, setOpen] = React.useState(false);

    useEffect(() => {

        // console.log("payload: " + payload)
        // console.log("payload.topic: " + payload?.topic.toString())

        if (payload) {
            // console.log("payload!!!!!")
        }

        if (payload?.topic?.includes(topicName)) {
            // console.log("payload.topic: " + payload.topic.toString())

            // console.log("payload.message: " + payload.message)

            if (payload.message) {

                var jsonObject = JSON.parse(payload.message)

                // console.log('waterpump status: ' + jsonObject['state'])

                setOpen(true)
            }
        }
    }, [payload])

    useEffect(() => {

        if (waterPumpSwitchState) {
            setWaterPumpState(waterPumpStates[0])
        }

        if (!waterPumpSwitchState) {
            setWaterPumpState(waterPumpStates[1])
        }
    }, [waterPumpSwitchState, waterPumpStates])

    const handleChange = (event) => {

        setWaterPumpSwitchState(event.target.checked)

        client.publish(topicName + '/in', "{ \"id\": " + Date.now() + ", \"state\": \"" + waterPumpState + "\" }", 2)

        if (waterPumpState == "on") {
            // console.log("waterPumpState == on")
            // console.log("connectionStatus : " + connectionStatus)
            setOpen(true)
        }

        if (waterPumpState == "off") {
            // console.log("waterPumpState == off")
            // console.log("connectionStatus : " + connectionStatus)
            setOpen(true)
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false)
    };

    return (
        <>
            {/* <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Water pump payload: {payload}
                    Water pump status: {payload?.message}
                </Alert>
            </Snackbar> */}

            <Switch
                checked={waterPumpSwitchState}
                onChange={handleChange}
            />
        </>
    )
}

export default WaterPumpContent;