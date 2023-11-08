import React, { useState, useEffect } from 'react';
// import { useSubscription } from 'mqtt-react-hooks';
import useSubscription from '../../Hook/UseSubscription';

const CleanWaterContent = (props) => {

    const { message } = useSubscription([
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
