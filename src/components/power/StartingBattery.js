import React, { useState, useEffect } from 'react';

const StartingBattery = (props) => {

    const payload = props.connection.payload

    useEffect(() => {
        const record = {
            topic: 'camper/sensors/watertanklevels/48:3f:da:c:74:fe/out',
            qos: 0
        };

        props.connection.subscribe(record);
    }, [props.connection])

    const [batteryLevel, setBatteryLevel] = useState(null)

    useEffect(() => {

        if (payload.topic) {
            if (payload.message) {

                const jsonObject = JSON.parse(payload.message)

                setBatteryLevel(jsonObject['batterylevel'])
            }
        }
    }, [payload])

    return (
        <>
            <h2>
                Start accu
            </h2>
            <span>Starting battery {batteryLevel} %</span>
        </>
    );
}

export default StartingBattery;
