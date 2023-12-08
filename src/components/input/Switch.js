import React from 'react';
import { Switch as MuiSwitch } from '@mui/material';
import { styled } from '@mui/material/styles';

export function Switch({ ...props }) {

        const MaterialUISwitch = styled(MuiSwitch)(() => ({
                width: 78,
                height: 38,
                padding: 7,
                '& .MuiSwitch-switchBase': {
                        margin: 1,
                        padding: 0,
                        transform: 'translateX(2px)',
                        '&.Mui-checked': {
                                transform: 'translateX(38px)',
                        },
                },
                '& .MuiSwitch-thumb': {
                        width: 36,
                        height: 36,
                },
                '& .MuiSwitch-track': {
                        borderRadius: 20 / 2,
                },
        }));

        return <MaterialUISwitch
                {...props}>
        </MaterialUISwitch>
}