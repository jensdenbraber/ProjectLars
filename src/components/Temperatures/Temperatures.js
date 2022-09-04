import Box from '@mui/material/Box';

import Freezer from './Freezer';
import Indoor from './Indoor';
import Outdoor from './Outdoor';
import Refrigerator from './Refrigerator';

const Temperatures = (props) => {
    return (
        <Box>
            <h2>
                Temperatures
            </h2>
            <Freezer {...props}>
            </Freezer>
            <Refrigerator {...props}>
            </Refrigerator>
            <Indoor {...props} >
            </Indoor>
            <Outdoor {...props}>
            </Outdoor>
        </Box>
    );
}

export default Temperatures;