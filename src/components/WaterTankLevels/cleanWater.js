import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';

const CleanWater = (props) => {

    const payload = props.connection.payload

    useEffect(() => {
        const record = {
            topic: 'camper/sensors/watertanklevels/48:3f:da:c:74:fe/out',
            qos: 0
        };

        props.connection.subscribe(record);
    }, [props.connection])

    const [waterLevel, setWaterLevel] = useState(null)

    useEffect(() => {

        if (payload.topic) {
            if (payload.message) {

                var JSONObject = JSON.parse(payload.message)

                setWaterLevel(JSONObject['waterlevel'])
            }
        }
    }, [payload])

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <>
            <h2>
                Schoon water tank
            </h2>
            <div>
                <span>Clean {waterLevel} %</span>
            </div>
            <div>
                <span>Waterpomp</span>
            </div>
            <Switch
                checked={checked}
                onChange={handleChange}
            />
        </>
    );
}

export default CleanWater;
