import React from 'react';
import { Home, PowerSettingsNew } from '@mui/icons-material';

import WaterTankLevels from './WaterTankLevels/waterTankLevels';
import PowerLevels from './Power/PowerLevels';
import Boiler from './Boiler/Boiler'
import Gas from './Gas/GasLevels'
import Clock from './Clock'

import FloatingBox from './FloatingBox';

function showAlert(text) {
    alert(text)
}

const HeadsUpDisplay = ({ mqttSub, mqttPublish, unSub, showUnsub, payload }) => {

    return (
        <>
            <FloatingBox top="60%" left="5%" width="13%" height="30%" icon={<Home className="full-screen" />} action={() => showAlert('Leetsource')}>
                Home
            </FloatingBox>
            <PowerLevels mqttSub={mqttSub} mqttPublish={mqttPublish} payload={payload}>
            </PowerLevels>
            <WaterTankLevels mqttSub={mqttSub} payload={payload}>
            </WaterTankLevels>
            <Gas mqttSub={mqttSub} payload={payload}>
            </Gas>
            <Boiler mqttSub={mqttSub} mqttPublish={mqttPublish} payload={payload}>
            </Boiler>
            <FloatingBox top="60%" left="80%" width="13%" height="30%" icon={<PowerSettingsNew className="full-screen" />}>
                Power on/off
            </FloatingBox>
            <Clock>
            </Clock>
        </>
    );
}

export default HeadsUpDisplay;