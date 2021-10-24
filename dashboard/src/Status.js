import React from 'react';
import { useMqttState, useSubscription } from 'mqtt-react-hooks';

export default function Status() {
    /* Message structure:
     *  topic: string
     *  message: string
     */
    const { message } = useSubscription([
        'camper/sensors/watertanklevels/48:3f:da:c:74:fe/out',
        'camper/sensors/watertanklevels/48:3f:da:c:74:fe/in'
    ]);

    /*
 * Status list
 * - Offline
 * - Connected
 * - Reconnecting
 * - Closed
 * - Error: printed in console too
 */
    const { client, connectionStatus } = useMqttState();

    function handleClick(message) {
        return client.publish('camper/sensors/watertanklevels/48:3f:da:c:74:fe/in', message);
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h2>{`Status: ${connectionStatus}`}</h2>
                <span>{`topic:${message} - message: ${message}`}</span>
            </div>
            <button type="button" onClick={() => handleClick('1')}>
                Disable led
            </button>
        </>
    );
}