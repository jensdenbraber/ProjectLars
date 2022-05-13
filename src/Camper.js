import React, { Component } from 'react';
import Clock from './components/Clock'
import CleanWater from './components/WaterTankLevels/cleanWater'


export default function Camper(props) {

    return (
        <div className="row">
            <div className="fixed">
                <img src={process.env.PUBLIC_URL + '/camper.jpg'} alt="Camper" />

                <CleanWater connection={props.connection} />

                <Clock />
                {/* <img src={logo} alt="Camper" width="100" height="50" /> */}
            </div>
        </div>
    );
}
