import React, { useEffect } from 'react';
import { UseMqttState } from './hooks/mqtt';
import { MuiAlert, Snackbar } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Status() {
    const { connectionStatus } = UseMqttState();

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {

        setOpen(true)

    }, [connectionStatus])

    return <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Connection status: {connectionStatus}
        </Alert>
    </Snackbar>
}