import { FlashOn } from '@mui/icons-material';

import HouseHoldBattery from './HouseholdBattery';
import StartingBattery from './StartingBattery';
import FloatingBox from '../FloatingBox';

const PowerLevels = (props) => {

    return (
        <>
            <FloatingBox {...props} icon={<FlashOn style={{ fill: "purple" }} className="full-screen" />}>
                <StartingBattery {...props}>
                </StartingBattery>
                <HouseHoldBattery {...props}>
                </HouseHoldBattery>
            </FloatingBox>
        </>
    );
}

export default PowerLevels;