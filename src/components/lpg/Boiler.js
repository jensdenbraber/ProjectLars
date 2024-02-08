import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Switch } from '../input/Switch';
import { UseMqttState } from '../../hooks/mqtt'

const Boiler = () => {

    const topicName = "camper/actuators/boiler"
    const { client } = UseMqttState();

    const boilerStates = {
        Off: "off",
        d50: "50_degrees",
        d70: "70_degrees"
    }

    const [checked50, setChecked50] = useState(false);
    const [checked70, setChecked70] = useState(false);
    const [boilerState, setBoilerState] = useState(boilerStates.Off)

    useEffect(() => {
        client?.publish(`${topicName}/in`, `{ \"state\": \"${boilerState}\" }`, 2);
    }, [boilerState, boilerStates, client])

    useEffect(() => {
        if (checked50) {
            setBoilerState(boilerStates.d50)
        }

        if (checked70) {
            setBoilerState(boilerStates.d70)
        }

        if (!checked50 && !checked70) {
            setBoilerState(boilerStates.Off)
        }
    }, [boilerState, boilerStates, checked50, checked70])

    const handleChange50 = (event) => {

        if (checked70) {
            setChecked70(false);
        }

        setChecked50(event.target.checked);
    };

    const handleChange70 = (event) => {

        if (checked50) {
            setChecked50(false);
        }

        setChecked70(event.target.checked);
    };

    return (
        <Box>
            <h2>
                Boiler
            </h2>
            <div>
                <span>50 graden</span>
            </div>
            <Switch
                checked={checked50}
                onChange={handleChange50}
            />

            <div>
                <span>70 graden</span>
            </div>
            <Switch
                checked={checked70}
                onChange={handleChange70}
            />
        </Box>
    );
}

export default Boiler;