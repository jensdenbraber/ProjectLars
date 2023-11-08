import React, { useState, useEffect } from 'react';

const HouseHoldBattery = (props) => {

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

                var jsonObject = JSON.parse(payload.message)

                setBatteryLevel(jsonObject['batterylevel'])
            }
        }
    }, [payload])

    return (
        <>
            <h2>
                Huishoud accu
            </h2>

            <span>Huishoud accu {batteryLevel} %</span>
        </>
    );
}

export default HouseHoldBattery;
