import React from 'react';
import WaterPumpContent from './WaterPumpContent';
import Box from '@mui/material/Box';

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