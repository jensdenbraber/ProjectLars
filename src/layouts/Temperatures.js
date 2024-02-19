import React from 'react';
import { Box } from '@mui/material';
import Freezer from '../components/temperatures/Freezer';
import Indoor from '../components/temperatures/Indoor';
import Outdoor from '../components/temperatures/Outdoor';
import Refrigerator from '../components/temperatures/Refrigerator';

const Temperatures = () => {
    return (
        <Box>
            <h2>
                Temperatures
            </h2>
            <Freezer />
            <Refrigerator />
            <Indoor />
            <Outdoor />
        </Box>
    );
}

export default Temperatures;