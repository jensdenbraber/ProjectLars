import React from 'react';
import { Box } from '@mui/material';
import Boiler from '../components/lpg/Boiler';

const Lpg = (props) => {

    return (
        <Box>
            <Boiler {...props} />
            {/* <GasLevels {...props} /> */}
        </Box>
    );
}

export default Lpg;