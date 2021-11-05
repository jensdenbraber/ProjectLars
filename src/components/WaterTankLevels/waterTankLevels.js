import { LocalDrink } from '@mui/icons-material';

import GrayWater from './grayWater';
import CleanWater from './cleanWater';
import FloatingBox from '../FloatingBox';

const WaterTankLevels = (props) => {

    const cameraLocation = {
        x: 10,
        y: 10,
        z: 10,
        rotation_x: 0,
        rotation_y: 0,
        rotation_z: -20
    }

    return (
        <>
            <FloatingBox {...props} action={() => props.startMovingCamera(cameraLocation)} icon={<LocalDrink style={{ fill: "blue" }} className="full-screen" />}>
                <CleanWater {...props}>
                </CleanWater>
                <GrayWater {...props}>
                </GrayWater>
            </FloatingBox>
        </>
    );
}

export default WaterTankLevels;