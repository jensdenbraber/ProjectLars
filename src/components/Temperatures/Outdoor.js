import React, { useState, useEffect } from 'react';
import { Forest } from '@mui/icons-material';

// import { useSubscription, useMqttState } from 'mqtt-react-hooks';
import useSubscription from '../Hook/UseSubscription'

const Outdoor = (props) => {

    const { message } = useSubscription("camper/sensors/buiten");

    // const payload = props.connection.payload

    // useEffect(() => {
    //     const record = {
    //         // topic: 'camper/sensors/temperatures/48:3f:da:c:74:fe/out',
    //         topic: 'zigbee2mqtt/Buiten',
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

    // useEffect(() => {
    //     if (payload.topic) {
    //         if (payload.message) {

    //             var jsonObject = JSON.parse(payload.message)

    //             setTemperature(jsonObject['temperature'])
    //         }
    //     }
    // }, [payload])

    return (
        <>
            <div>
                <Forest style={{ fill: "green" }} />
                <span>Outdoor {temperature} &deg;C</span>
            </div>
        </>
    );
}

export default Outdoor;
