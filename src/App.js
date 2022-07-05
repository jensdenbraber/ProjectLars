// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
// import mqtt from 'mqtt';

import { Connector, useSubscription, useMqttState } from 'mqtt-react-hooks';
import Status from './Status';

// import { FullScreen, useFullScreenHandle } from "react-full-screen";

import Camper from "./Camper";

// import HeadsUpDisplay from './components/HeadsUpDisplay';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Home } from '@mui/icons-material';
import WaterIcon from '@mui/icons-material/Water';
import BoltIcon from '@mui/icons-material/Bolt';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import CloudIcon from '@mui/icons-material/Cloud';
// import PropaneIcon from '@mui/icons-material/Propane';
import Paper from '@mui/material/Paper';
import WaterTankLevels from './components/Water/WaterTankLevels/WaterTankLevels';
import Lpg from './components/LPG/Lpg';
import NightLight from './components/NighLight';
import PropaneTankIcon from '@mui/icons-material/PropaneTank';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import moment from 'moment'
import { ReactComponent as Logo } from './polarbear.svg';
import Typography from '@mui/material/Typography';

import TabPanel from './TabPanel'
import Temperatures from './components/Temperatures/Temperatures';
import PowerLevels from './components/Power/PowerLevels';



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


export default function App() {
  // const { client } = useMqttState();
  // const [connectStatus, setConnectStatus] = useState('Connect');
  // const [payload, setPayload] = useState({});

  // const [client, setClient] = useState(null)

  // // useEffect(() => {
  // //   setClient(mqtt.connect("ws://192.168.68.53:9001"));
  // // }, []);

  // useEffect(() => {
  //   if (client) {
  //     client.on('connect', () => {
  //       setConnectStatus('Connected');
  //     });
  //     client.on('error', (err) => {
  //       console.error('Connection error: ', err);
  //       client.end();
  //     });
  //     client.on('reconnect', () => {
  //       setConnectStatus('Reconnecting');
  //     });
  //     client.on('message', (topic, message) => {
  //       const payload = { topic, message: message.toString() };
  //       setPayload(payload);
  //     });
  //   }
  // }, [client]);

  // useEffect(() => {
  //   console.log("connectionStatus: " + connectStatus)
  // }, [connectStatus])

  // const mqttDisconnect = () => {
  //   if (client) {
  //     client.end(() => {
  //       setConnectStatus('Connect');
  //     });
  //   }
  // }

  // const mqttPublish = (context) => {
  //   if (client) {
  //     const { topic, qos, payload } = context;
  //     client.publish(topic, payload, { qos }, error => {
  //       if (error) {
  //         console.log('Publish error: ', error);
  //       }
  //     });
  //   }
  // }

  // const mqttSub = (subscription) => {
  //   if (client) {
  //     const { topic, qos } = subscription;
  //     client.subscribe(topic, { qos }, (error) => {
  //       if (error) {
  //         console.log('Subscribe to topics error', error)
  //         return
  //       }
  //     });
  //   }
  // };

  // const mqttUnSub = (subscription) => {
  //   if (client) {
  //     const { topic } = subscription;
  //     client.unsubscribe(topic, error => {
  //       if (error) {
  //         console.log('Unsubscribe error', error)
  //         return
  //       }
  //     });
  //   }
  // };

  // const connection = {
  //   subscribe: mqttSub,
  //   unsubscibe: mqttUnSub,
  //   publish: mqttPublish,
  //   disconnect: mqttDisconnect,
  //   payload: payload
  // }

  const [value, setValue] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const tabs = [
    { 'label': 'Camper', 'component': <Camper /> },
    { 'label': 'Water tank levels', 'component': <WaterTankLevels /> },
    { 'label': 'LPG', 'component': <Lpg /> },
    { 'label': 'Temperatures', 'component': <Temperatures /> },
    { 'label': 'Power', 'component': <PowerLevels /> }
  ]



  return (

    <Connector brokerUrl="ws://192.168.68.53:9001" options={{ keepalive: 0 }}>


      <Status />
      {/* <TabPanel sx={{ position: 'fixed', bottom: 0, left: 0, top: 0 }} tabs={tabs} tab={value}></TabPanel> */}

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
              {moment(new Date()).format("dddd D MMMM HH:mm")}
            </Typography>
            <Logo fill="#A7A9AB" stroke="#A7A9AB" height={120} />
          </Box>
        </Box>
      </Modal>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            console.log("newValue: " + newValue)
            console.log("tabs.length: " + tabs.length)
            if (-1 < newValue && newValue < tabs.length) {
              setValue(newValue);
              console.log("newValue: " + newValue)
            }
            if (newValue == tabs.length) {
              handleOpen()
              console.log("nightmode")
            }
          }}
        >
          <BottomNavigationAction label="Camper" value="0" icon={<Home />} />
          <BottomNavigationAction label="Water tank levels" value="1" icon={<WaterIcon />} />
          <BottomNavigationAction label="LPG" value="2" icon={<PropaneTankIcon />} />
          <BottomNavigationAction label="Temperatures" value="3" icon={<CloudIcon />} />
          <BottomNavigationAction label="Power" value="4" icon={<BoltIcon />} />
          <BottomNavigationAction label="NightMode" value="5" icon={<ModeNightIcon />} />
        </BottomNavigation>
      </Paper>
    </Connector>
  )
}