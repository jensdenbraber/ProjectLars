// import GrayWater from './grayWater';
import CleanWater from './cleanWater';
import Box from '@mui/material/Box';

const WaterTankLevels = (props) => {

    return (
        <>
            <Box>
                <CleanWater {...props}>
                </CleanWater>
                {/* <GrayWater {...props}>
                </GrayWater> */}
            </Box>
        </>
    );
}

export default WaterTankLevels;