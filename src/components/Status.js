// // import React from 'react';
// import React, { useEffect } from 'react';

// import { useMqttState } from 'mqtt-react-hooks';



// export default function Status() {


//     /*
//     * Status list
//     * - Offline
//     * - Connected
//     * - Reconnecting
//     * - Closed
//     * - Error: printed in console too
//     */
//     const { connectionStatus } = useMqttState();


//     useEffect(() => {
//         // setClient(mqtt.connect("ws://raspberrypi4:9001"));
//         console.log("connectionStatus: " + connectionStatus)
//     }, [connectionStatus]);

//     return <h1>{`Status: ${connectionStatus}`}</h1>;
// }

import React, { useState, useEffect } from 'react';
import useMqttState from './hook/UseMqttState';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Status() {
    const { connectionStatus } = useMqttState();

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {

        setOpen(true)

    }, [connectionStatus])

    return (
        <>
            <h1>{`Status: ${connectionStatus}`}</h1>
            {/* <h1>{`Status: ${connectionStatus}`}</h1>;
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{`topic:${message?.topic} - message: ${message?.message}`}</span>
            </div>

            <button type="button" onClick={() => handleClick('false')}>
                Disable led
            </button> */}

            <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Connection status: {connectionStatus}
                </Alert>
            </Snackbar>
        </>
    );
}