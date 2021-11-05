import { LocalDrink } from '@mui/icons-material';

import GrayWater from './GrayWater';
import CleanWater from './CleanWater';
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