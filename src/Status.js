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
//         // setClient(mqtt.connect("ws://192.168.68.53:9001"));
//         console.log("connectionStatus: " + connectionStatus)
//     }, [connectionStatus]);

//     return <h1>{`Status: ${connectionStatus}`}</h1>;
// }

import React from 'react';

import { useSubscription, useMqttState } from 'mqtt-react-hooks';

export default function Status() {
    /* Message structure:
     *  topic: string
     *  message: string
     */
    const { message } = useSubscription([
        'camper/sensors/watertanklevels/48:3f:da:c:74:fe/out'
    ]);

    const { connectionStatus, client } = useMqttState();

    function handleClick(message) {
        console.log("button message: " + message)
        console.log("client?.connected: " + client?.connected)
        return client?.publish('camper/actuators/waterpump/in', "{ \"state\": \"on\" }");
    }


    return (
        <>
            <h1>{`Status: ${connectionStatus}`}</h1>;
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{`topic:${message?.topic} - message: ${message?.message}`}</span>
            </div>

            <button type="button" onClick={() => handleClick('false')}>
                Disable led
            </button>
        </>
    );
}