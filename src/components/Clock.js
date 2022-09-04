import React, { useState, useEffect } from 'react'
import moment from 'moment'

const Clock = () => {

    const [dateState, setDateState] = useState(new Date());

    useEffect(() => {
        setInterval(() => setDateState(new Date()), 1000);
    }, []);

    return (
        <div>
            <h2>
                {moment(dateState).format("dddd D MMMM HH:mm:ss")}
            </h2>
        </div>
    )
}

export default Clock;
