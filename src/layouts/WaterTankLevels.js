import React from 'react';
// import GrayWater from './grayWater';
import CleanWater from '../components/water/waterTankLevels/CleanWater';
import { Box } from '@mui/material';

const WaterTankLevels = () => {

    return (
        <Box>
            <Box>
                <h2>
                    Schoon water tank
                </h2>
                <CleanWater />
            </Box>
            {/* <GrayWater {...props}>
                </GrayWater> */}
        </Box>
    );
}

export default WaterTankLevels;