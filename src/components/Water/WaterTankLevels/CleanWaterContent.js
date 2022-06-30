import React, { useState, useEffect } from 'react';
import FloatingBox2 from '../../FloatingBox2';

const CleanWaterContent = (props) => {

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

        // console.log("CleanWaterContent payload topic: " + payload.topic)

        if (payload.topic?.includes("camper/sensors/watertanklevels")) {
            if (payload.message) {

                var JSONObject = JSON.parse(payload.message)

                setWaterLevel(JSONObject['waterlevel'])
            }
        }
    }, [payload])

    return (
        <>
            {/* <FloatingBox2 {...props}> */}
            {/* <FloatingBox2 top="0%" left="0%"> */}
            <div className="relative" style={{ zindex: 10, top: props.top, left: props.left, width: props.width, height: props.height, backgroundColor: props.backgroundColor }}>
                <img src={process.env.PUBLIC_URL + '/Assets/TapWater.svg'} alt="TapWater" style={{ height: "20%", width: "20%" }} />
                {/* </FloatingBox2> */}
                {/* <FloatingBox2 top="70%" left="30%" width="100%" height="100%"> */}
                <span style={{ zindex: 10, top: props.top, left: props.left, width: props.width, height: props.height, backgroundColor: props.backgroundColor }}>Clean {waterLevel} %</span>
            </div>
            {/* </FloatingBox2> */}
            {/* </FloatingBox2> */}
        </>
    );
}

export default CleanWaterContent;
