import React, { useEffect, useState } from 'react';
import { Switch } from '@mui/material';

const GrayWater = (props) => {

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

                const jsonObject = JSON.parse(payload.message)

                setWaterLevel(jsonObject['waterlevel'])
            }
        }
    }, [payload])

    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <>
            <h2>
                Vuil water tank
            </h2>
            <div>
                <span>Gray {waterLevel} %</span>
            </div>
            <div>
                <span>Verwarmingselement</span>
            </div>
            <Switch
                checked={checked}
                onChange={handleChange}
            />
        </>
    );
}

export default GrayWater;
