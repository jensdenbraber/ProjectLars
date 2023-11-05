import React, { useState, useEffect } from 'react';
import { AcUnit } from '@mui/icons-material';

// import { useSubscription, useMqttState } from 'mqtt-react-hooks';
import useSubscription from '../Hook/UseSubscription'

const Freezer = (props) => {

    const { message } = useSubscription("camper/sensors/vriezer");

    // useEffect(() => {
    //     const record = {
    //         topic: 'zigbee2mqtt/Vriezer',
    //         // topic: 'camper/sensors/temperatures/48:3f:da:c:74:fe/out',
    //         qos: 0
    //     };

    //     props.connection.subscribe(record);
    // }, [props.connection])

    const [temperature, setTemperature] = useState(null)

    useEffect(() => {
        if (message?.topic) {
            if (message.message) {

                var jsonObject = JSON.parse(message.message)

                // console.log("jsonObject: " + jsonObject)

                // {"battery":74,"humidity":85.57,"linkquality":57,"pressure":1025,"temperature":-10.42,"voltage":2955}
                setTemperature(jsonObject['temperature'])
            }
        }
    }, [message])

    return (
        <>
            <div>
                <AcUnit style={{ fill: "darkblue" }} />
                <span>Freezer {temperature} &deg;C</span>
            </div>
        </>
    );
}

export default Freezer;
