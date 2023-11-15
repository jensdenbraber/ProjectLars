import React from 'react';
import CleanWaterContent from './CleanWaterContent'
import WaterPump from '../waterPump1/WaterPump';
import Box from '@mui/material/Box';

const CleanWater = (props) => {

    return (
        <Box>
            <h2>
                Schoon water tank
            </h2>
            <CleanWaterContent {...props} />
            <WaterPump {...props} />
        </Box>
    );
}

export default CleanWater;
