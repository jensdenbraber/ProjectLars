import { LocalDrink } from '@mui/icons-material';

import GrayWater from './grayWater';
import CleanWater from './cleanWater';
import FloatingBox from '../FloatingBox';

const WaterTankLevels = (props) => {

    return (
        <>
            <FloatingBox {...props} icon={<LocalDrink style={{ fill: "blue" }} className="full-screen" />}>
                <CleanWater {...props}>
                </CleanWater>
                <GrayWater {...props}>
                </GrayWater>
            </FloatingBox>
        </>
    );
}

export default WaterTankLevels;