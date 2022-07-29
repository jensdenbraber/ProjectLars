import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useSubscription, useMqttState } from 'mqtt-react-hooks';

// const gpio = require('rpi-gpio')
// const gpiop = gpio.promise;

// gpiop.setup(4, gpio.DIR_OUT);

// const Gpio = require('onoff').Gpio;
// const Gpiop = Gpio.promise;

// const LED = new Gpio(4, 'out'); // gpio 4 as out


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const WaterPumpContent = (props) => {

    const waterPumpStates = {
        0: "off",
        1: "on"
    }




    // current LED state
    let isWaterpumpOn = false;

    const topicName = "camper/actuators/waterpump"

    const { payload } = useSubscription(topicName + '/out', 2);
    const { client } = useMqttState();

    const [waterPumpState, setWaterPumpState] = useState(waterPumpStates[0])
    const [waterPumpSwitchState, setWaterPumpSwitchState] = useState(false)

    const [open, setOpen] = React.useState(false);

    useEffect(() => {

        console.log("payload?.message: " + payload?.message)

        // if (payload?.topic?.includes(topicName)) {
        if (payload?.message) {

            var jsonObject = JSON.parse(payload?.message)

            console.log("waterpump state: " + jsonObject['state'])

            setOpen(true)
        }
        // }
    }, [payload?.message])

    useEffect(() => {

        if (waterPumpSwitchState) {
            // console.log("waterPumpStates[1] : " + waterPumpStates[1])

            setWaterPumpState(waterPumpStates[1])
        }

        if (!waterPumpSwitchState) {
            // console.log("waterPumpStates[0] : " + waterPumpStates[0])

            setWaterPumpState(waterPumpStates[0])
        }

        // client?.publish(topicName + '/in', "{ \"state\": \"" + waterPumpState + "\" }", 2);

    }, [waterPumpSwitchState, waterPumpStates])

    const handleChange = (event) => {

        setWaterPumpSwitchState(event.target.checked)

        // console.log("event.target.checked: " + event.target.checked)
        // console.log("waterPumpState: " + waterPumpState)

        client.publish(topicName + '/in', "{ \"id\": " + Date.now() + ", \"state\": \"" + waterPumpState + "\" }", 2)

        // waterpumpOut.writeSync(waterPumpState); // provide 1 or 0 

        if (waterPumpState == "on") {

            console.log("waterPumpState == on")


            // GPIO.output(led, GPIO.HIGH)
            // LED.writeSync(1); // make it 1 (on)
            // gpio.write(4, true);
            // gpio.setup(4, gpio.DIR_OUT, writeOn);
        }

        if (waterPumpState == "off") {
            console.log("waterPumpState == off")


            // LED.writeSync(0); // make it 0 (off)
            // GPIO.output(led, GPIO.LOW)
            // gpio.write(4, false);
            // gpio.setup(4, gpio.DIR_OUT, writeOff);
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
            <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Water pump status: {payload?.message}
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