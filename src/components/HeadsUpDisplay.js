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

const HeadsUpDisplay = (props) => {

    return (
        <>
            <FloatingBox top="60%" left="5%" width="13%" height="30%" icon={<Home className="full-screen" />} action={() => props.startMovingCamera({ x: -10, y: 10, z: 10, rotation_x: -44.99998071410266, rotation_y: -35.26437456930134, rotation_z: -29.999987142735108 })}>
                Home
            </FloatingBox>
            <PowerLevels top="60%" left="20%" width="13%" height="30%" {...props}>
            </PowerLevels>
            <WaterTankLevels top="60%" left="35%" width="13%" height="30%" {...props}>
            </WaterTankLevels>
            <Gas top="60%" left="50%" width="13%" height="30%" {...props}>
            </Gas>
            <Boiler top="60%" left="65%" width="13%" height="30%" {...props}>
            </Boiler>
            <FloatingBox top="60%" left="80%" width="13%" height="30%" {...props} icon={<PowerSettingsNew className="full-screen" />}>
                Power on/off
            </FloatingBox>
            <Clock top="5%" left="80%" width="13%" height="15%">
            </Clock>
        </>
    );
}

export default HeadsUpDisplay;
