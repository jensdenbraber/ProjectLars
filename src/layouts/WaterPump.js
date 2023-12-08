import React from 'react';
import WaterPumpContent from '../components/water/WaterPump';
import { Box } from '@mui/material';

const WaterPump = (props) => {

    return (
        <Box>
            <div>
                <span>Waterpomp</span>
            </div>
            <WaterPumpContent {...props} />
        </Box>
    );
}

export default WaterPump;