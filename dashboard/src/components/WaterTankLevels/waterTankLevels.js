import { LocalDrink } from '@mui/icons-material';

import GrayWater from './grayWater';
import CleanWater from './cleanWater';
import FloatingBox from '../FloatingBox';

const WaterTankLevels = ({ mqttSub, payload }) => {

    return (
        <>
            <FloatingBox top="60%" left="35%" width="13%" height="30%" icon={<LocalDrink style={{ fill: "blue" }} className="full-screen" />}>
                <CleanWater mqttSub={mqttSub} payload={payload}>
                </CleanWater>
                <GrayWater mqttSub={mqttSub} payload={payload}>
                </GrayWater>
            </FloatingBox>
        </>
    );
}

export default WaterTankLevels;