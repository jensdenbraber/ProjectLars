import React from 'react';
// import GrayWater from './grayWater';
import CleanWater from './CleanWater';
import { Box } from '@mui/material';

const WaterTankLevels = (props) => {

    return (
        <Box>
            <CleanWater {...props}>
            </CleanWater>
            {/* <GrayWater {...props}>
                </GrayWater> */}
        </Box>
    );
}

export default WaterTankLevels;