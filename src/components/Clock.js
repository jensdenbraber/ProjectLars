import React from 'react';
import moment from 'moment'

import FloatingBox from './FloatingBox';

const Clock = () => {

    return (
        <FloatingBox top="5%" left="80%" width="13%" height="15%" buttonChildren={<>{moment(new Date()).format("dddd D MMMM HH:mm")}</>}>
        </FloatingBox>
    )
}

export default Clock;
