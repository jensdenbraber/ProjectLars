import { AcUnit, Thermostat, Forest } from '@mui/icons-material';

import FloatingBox from '../FloatingBox';
import Freezer from './Freezer';
import Indoor from './Indoor';
import Outdoor from './Outdoor';
import Refrigerator from './Refrigerator';

const Temperatures = (props) => {
    return (
        <>
            <FloatingBox {...props}>
                <Freezer {...props} icon={<AcUnit style={{ fill: "darkblue" }} className="freezer-icon" />}>
                </Freezer>
                <Refrigerator {...props} icon={<AcUnit style={{ fill: "blue" }} className="refrigerator-icon" />}>
                </Refrigerator>
                <Indoor {...props} icon={<Thermostat style={{ fill: "blue" }} className="indoor-icon" />}>
                </Indoor>
                <Outdoor {...props} icon={<Thermostat style={{ fill: "green" }} className="outdoor-icon" />}>
                </Outdoor>
            </FloatingBox>
        </>
    );
}

export default Temperatures;