import React, { useState, useEffect } from 'react';
import { UseSubscription } from '../../hooks/mqtt';

const CleanWaterContent = () => {

    const { message } = UseSubscription([
        'camper/sensors/watertanklevels/48:3f:da:c:74:fe/out'
    ]);

    const [waterLevel, setWaterLevel] = useState(null)

    useEffect(() => {

        if (message?.message != null) {

            const JSONObject = JSON.parse(message?.message)

            setWaterLevel(JSONObject['waterlevel'])
        }
    }, [message])

    return (
        <div className="relative">
            <img src={process.env.PUBLIC_URL + '/Assets/TapWater.svg'} alt="TapWater" style={{ height: "20%", width: "20%" }} />
            <span>Clean {waterLevel} %</span>
        </div>
    );
}

export default CleanWaterContent;
