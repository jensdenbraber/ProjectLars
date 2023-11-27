import React, { useState, useEffect } from 'react';
import { UseSubscription } from '../../../hooks/mqtt';
import tapWaterIcon from '../../../assets/TapWater.svg'

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
            <img src={tapWaterIcon} alt="TapWater" style={{ height: "20%", width: "20%" }} />
            <span>Clean {waterLevel} %</span>
        </div>
    );
}

export default CleanWaterContent;
