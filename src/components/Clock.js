import React, { useState, useEffect } from 'react'
import moment from 'moment'

import FloatingBox from './FloatingBox';

const Clock = () => {

    const [dateState, setDateState] = useState(new Date());

    useEffect(() => {
        setInterval(() => setDateState(new Date()), 1000);
    }, []);

    return (
        <div>
            <span>
                {moment(dateState).format("dddd D MMMM HH:mm:ss")}
            </span>
        </div>
        // <FloatingBox top="5%" left="80%" width="13%" height="15%" buttonChildren={<>{moment(new Date()).format("dddd D MMMM HH:mm")}</>}>
        // </FloatingBox>
    )
}

export default Clock;
