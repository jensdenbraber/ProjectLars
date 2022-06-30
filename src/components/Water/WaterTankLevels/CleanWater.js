import React, { useState, useEffect } from 'react';
import CleanWaterContent from './CleanWaterContent'
import WaterPump from '../WaterPump/WaterPump';

const CleanWater = (props) => {

    return (
        <>
            <h2>
                Schoon water tank
            </h2>
            <CleanWaterContent {...props} />
            <WaterPump {...props} />
        </>
    );
}

export default CleanWater;
