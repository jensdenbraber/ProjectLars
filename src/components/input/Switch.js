import { Switch as MuiSwitch } from '@mui/material';
import { styled } from '@mui/material/styles';

export function Switch({ style, ...props }) {

        style = {width: 68,
                height: 34,
                padding: 7,}

        const MaterialUISwitch = styled(MuiSwitch)(({ theme }) => ({
                width: 68,
                height: 34,
                padding: 7,
                // '& .MuiSwitch-switchBase': {
                //         margin: 1,
                //         padding: 0,
                //         transform: 'translateX(6px)',
                //         '&.Mui-checked': {
                //                 color: '#fff',
                //                 transform: 'translateX(30px)',
                //         },
                // },
                // '& .MuiSwitch-thumb': {
                //         width: 32,
                //         height: 32,
                // },
                // '& .MuiSwitch-track': {
                //         borderRadius: 20 / 2,
                // },
        }));

        return <MuiSwitch />
}