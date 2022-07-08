import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useSubscription, useMqttState } from 'mqtt-react-hooks';

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
    const { client } = useMqttState();

    // console.log("JSON.parse(payload?.message)['state']: " + JSON.parse(payload?.message)['state'])

    const [waterPumpState, setWaterPumpState] = useState(waterPumpStates[0])
    const [waterPumpSwitchState, setWaterPumpSwitchState] = useState(false)

    // const payload = props.connection.payload

    // useEffect(() => {
    //     props.connection.subscribe({ topic: topicName + 'out', qos: 0 })
    // }, [props.connection])

    useEffect(() => {

        // console.log("WaterPumpContent payload topic: " + payload.topic)

        if (payload?.topic?.includes(topicName)) {
            if (payload?.message) {

                // console.log("waterpump out payload.message: " + payload.message)

                var jsonObject = JSON.parse(payload?.message)

                console.log("waterpump state: " + jsonObject['state'])

                setOpen(true)
            }
        }
    }, [payload])

    // useEffect(() => {
    //     // console.log("waterPumpState updated to: " + waterPumpState)
    //     console.log("waterPumpState: " + waterPumpState)
    //     // console.log("Number(waterPumpState): " + Number(waterPumpState))
    //     // console.log("waterPumpStates[Number(waterPumpState)]: " + waterPumpStates[Number(waterPumpState)])

    //     props.connection.publish({
    //         topic: topicName + 'in',
    //         qos: 0,
    //         payload: "{ \"state\": \"" + waterPumpState + "\" }"
    //     })
    // }, [waterPumpState, props.connection, waterPumpStates])

    useEffect(() => {

        if (waterPumpSwitchState) {
            setWaterPumpState(waterPumpStates[1]);
        }

        if (!waterPumpSwitchState) {
            setWaterPumpState(waterPumpStates[0]);
        }
    }, [waterPumpSwitchState, waterPumpStates])

    const handleChange = (event) => {

        setWaterPumpSwitchState(event.target.checked);

        console.log("event.target.checked: " + event.target.checked);

        console.log("waterPumpState: " + waterPumpState)
        console.log("topicName: " + topicName + '/in')
        console.log("published...")

        client.publish(topicName + '/in', "{ \"state\": \"" + waterPumpState + "\" }");

        console.log("published... done")

        // console.log("[Number(waterPumpState)]: " + [Number(waterPumpState)])
        // console.log("waterPumpStates: " + waterPumpStates[Number(waterPumpState)])
    };

    const [open, setOpen] = React.useState(false);

    // const handleClick = () => {
    //     setOpen(true);
    // };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function handleClick(message) {
        console.log("button message: " + message)
        client.publish('esp32/led', "askhjdaskjudhgkjh");
    }

    return (
        <>
            {/* <button type="button" onClick={() => handleClick('false')}>
                Disable led
            </button> */}

            <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Water pump status: {waterPumpState}
                </Alert>
            </Snackbar>

            <Switch
                checked={waterPumpSwitchState}
                onChange={handleChange}
            />
        </>
    )
}

export default WaterPumpContent;