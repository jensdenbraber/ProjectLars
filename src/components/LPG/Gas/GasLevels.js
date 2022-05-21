import React, { useState, useEffect } from 'react';

const GasLevels = (props) => {

    const payload = props.connection.payload

    useEffect(() => {
        const record = {
            topic: 'camper/sensors/gaslevels/48:3f:da:c:74:fe/out',
            qos: 0
        };

        props.connection.subscribe(record);
    }, [props.connection])

    const [gasLevel, setGasLevel] = useState(null)

    useEffect(() => {

        if (payload.topic) {
            if (payload.message) {

                var jsonObject = JSON.parse(payload.message)

                setGasLevel(jsonObject['gaslevel'])
            }
        }
    }, [payload])

    return (
        <>
            <h2>
                Gas
            </h2>
            <span>Gas {gasLevel} %</span>
        </>
    );
}

export default GasLevels;