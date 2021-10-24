import React, { useState, useEffect } from 'react';
import { Box, Modal, Button } from '@mui/material';
import { WbSunny } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

import FloatingBox from '../FloatingBox';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function showAlert(text) {
    alert(text)
}

const Boiler = ({ mqttSub, mqttPublish, payload }) => {

    const record = {
        topic: 'camper/sensors/watertanklevels/48:3f:da:c:74:fe/out',
        qos: 0
    };

    useEffect(() => {
        mqttSub(record);
    })

    const [messages, setMessages] = useState(null)

    useEffect(() => {

        if (payload.topic) {
            if (payload.message) {

                var JSONObject = JSON.parse(payload.message)

                console.log('Boiler status: ' + JSONObject['waterlevel'])

                setMessages(payload)
            }
        }
    }, [payload])

    useEffect(() => {
        console.log(messages)
    }, [messages])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <>
            <FloatingBox top="60%" left="65%" width="13%" height="30%" action={handleOpen} icon={<WbSunny style={{ fill: "yellow" }} className="full-screen" />}>
                {/* <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                > */}
                {/* <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span>
                            50 C
                        </span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer> */}
                {/* <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <span>
                                50 C
                            </span>
                        </Typography>
                    </Box> */}
                {/* <span>
                    70 C
                </span> */}
                {/* </Modal> */}
            </FloatingBox>
        </>
    );
}

export default Boiler;
