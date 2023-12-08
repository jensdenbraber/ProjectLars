import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { ReactComponent as Logo } from '../polarbear.svg';
import Clock from '../components/Clock'

const style = {
    position: 'absolute',
    top: '0%',
    left: '0%',
    width: '100%',
    height: '100%',
    bgcolor: '#000000',
    color: '#A7A9AB',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const styleSubBox = {
    textAlign: "center",
}

const styleTypography = {
    fontSize: "90px"
}

const NighLight = (props) => {

    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {/* <FloatingBox top="60%" left="80%" width="13%" height="30%" {...props} action={handleOpen} icon={<ModeNight className="full-screen" />}>
                Power off
            </FloatingBox> */}
            <Modal
                open={open}
                onClick={handleClose}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={styleSubBox}>
                        <Typography id="modal-modal-description" sx={styleTypography}>
                            <Clock />
                        </Typography>
                        <Logo fill="#A7A9AB" stroke="#A7A9AB" height={120} />
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default NighLight;
