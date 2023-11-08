import React, { Component } from 'react';
import Clock from './components/Clock'
import CleanWaterContent from './components/water/waterTankLevels/CleanWaterContent'

import FloatingBox2 from './components/FloatingBox2';


export default function Camper(props) {

    return (
        <div className={props.display ? "showTab" : "hideTab"}>
            <div className="fixed">

                <FloatingBox2 top="15%" left="10%" width="70%" height="70%">
                    <img src={process.env.PUBLIC_URL + '/camper.jpg'} alt="Camper" width="100%" height="100%" />
                </FloatingBox2>

                <FloatingBox2 top="35%" left="18%" width="20%" height="20%">

                    <CleanWaterContent  {...props} />

                </FloatingBox2>

                <Clock />
            </div>
        </div>
    );
}
