import React from 'react';
import HouseHoldBattery from '../components/power/HouseholdBattery';
import StartingBattery from '../components/power/StartingBattery';

const PowerLevels = (props) => {

    return (
        <>
            <StartingBattery {...props} />
            <HouseHoldBattery {...props} />
        </>
    );
}

export default PowerLevels;