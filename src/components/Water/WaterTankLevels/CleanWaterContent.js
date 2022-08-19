import React, { useState, useEffect } from 'react';
import { useSubscription } from 'mqtt-react-hooks';

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
        <div className="relative" style={{ zindex: 10, top: props.top, left: props.left, width: props.width, height: props.height, backgroundColor: props.backgroundColor }}>
            <img src={process.env.PUBLIC_URL + '/Assets/TapWater.svg'} alt="TapWater" style={{ height: "20%", width: "20%" }} />
            <span style={{ zindex: 10, top: props.top, left: props.left, width: props.width, height: props.height, backgroundColor: props.backgroundColor }}>Clean {waterLevel} %</span>
        </div>
    );
}

export default CleanWaterContent;
