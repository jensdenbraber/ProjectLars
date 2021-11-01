import { FlashOn } from '@mui/icons-material';

import HouseHoldBattery from './HouseholdBattery';
import StartingBattery from './StartingBattery';
import FloatingBox from '../FloatingBox';

const WaterTankLevels = ({ mqttSub, payload }) => {

    return (
        <>
            <FloatingBox top="60%" left="20%" width="13%" height="30%" icon={<FlashOn style={{ fill: "purple" }} className="full-screen" />}>
                <StartingBattery mqttSub={mqttSub} payload={payload}>
                </StartingBattery>
                <HouseHoldBattery mqttSub={mqttSub} payload={payload}>
                </HouseHoldBattery>
            </FloatingBox>
        </>
    );
}

export default WaterTankLevels;