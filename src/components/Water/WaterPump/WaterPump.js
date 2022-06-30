import React, { useState, useEffect } from 'react';
import WaterPumpContent from './WaterPumpContent';

const WaterPump = (props) => {

    return (
        <>
            <div>
                <span>Waterpomp</span>
            </div>
            <WaterPumpContent {...props} />
        </>
    );
}

export default WaterPump;