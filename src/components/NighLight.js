import React, { useEffect, useState } from 'react';
import moment from 'moment'

const NighLight = () => {

    return (
        <div>
            {moment(new Date()).format("D MMMM HH:mm")}
        </div>
    );
}

export default NighLight;
