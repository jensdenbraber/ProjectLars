import Box from '@mui/material/Box';

import Boiler from './Boiler/Boiler'
import GasLevels from './Gas/GasLevels'

const Lpg = (props) => {

    return (
        <>
            <Box>
                <Boiler {...props} />
                <GasLevels {...props} />
            </Box>
        </>
    );
}

export default Lpg;