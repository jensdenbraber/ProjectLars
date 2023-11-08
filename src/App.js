// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Status from './Status';

import { FullScreen, useFullScreenHandle } from "react-full-screen";

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
import WaterTankLevels from './components/water/waterTankLevels/WaterTankLevels';
import Lpg from './components/lpg/Lpg';
import NightLight from './components/NighLight';
import Clock from './components/Clock';
import PropaneTankIcon from '@mui/icons-material/PropaneTank';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import moment from 'moment'
import { ReactComponent as Logo } from './polarbear.svg';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import TabPanel from './TabPanel'
import Temperatures from './components/temperatures/Temperatures';
import PowerLevels from './components/power/PowerLevels';

import Boiler from './components/lpg/Boiler'

import HooksConnection from './components/hook/Connection'

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

  const [camper, setCamper] = React.useState(true);
  const [waterTankLevels, setWaterTankLevels] = React.useState(false);
  // const [lpg, setLpg] = React.useState(false);
  // const [temperatures, setTemperatures] = React.useState(false);
  // const [powerLevels, setPowerLevels] = React.useState(false);

  const handle = useFullScreenHandle();

  let [isFullScreen, setFullScreen] = React.useState(true);

  const onButtonClick = (event) => {
    console.log(isFullScreen)
    if (isFullScreen) {
      handle.enter()
      setFullScreen(false)
    }
    else {
      setFullScreen(true)
      handle.exit()
    }
  }

  return (
    <>
      <FullScreen handle={handle}>
          {/* <Boiler /> */}
        <HooksConnection brokerUrl="ws://raspberrypi4:9001" options={{ keepalive: 0 }}>

          {/* <TabPanel sx={{ position: 'fixed', bottom: 0, left: 0, top: 0 }} tabs={tabs} tab={value}></TabPanel> */}
          {/* <Status /> */}
          <Box sx={{
            width: 1024,
            height: 600,
            display: 'grid',
            columnGap: 3,
            rowGap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)',
            // justifyContent: 'space-evenly'
          }}>
            <WaterTankLevels />
            <Boiler />
            <Temperatures />
            <Clock />
            {/* <NightLight setOpen={open} /> */}
            {/* <NightLight /> */}
          </Box>

          {/* {camper && <Camper />}
      {waterTankLevels && <WaterPumpContent />} */}

          {/* <Camper display={{ camper }} /> */}
          {/* <WaterTankLevels display={{ waterTankLevels }} /> */}
          {/* {lpg && <Lpg />}
      {temperatures && <Temperatures />}
      {powerLevels && <PowerLevels />}
      {nightMode && <PowerLevels />} */}

          {/* <Modal
        open={open}
        onClick={handleClose}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
        <Box sx={styleSubBox}>
        <Typography id="modal-modal-description" sx={styleTypography}>
              {moment(new Date()).format("dddd D MMMM HH:mm:ss")}
              </Typography>
              <Logo fill="#A7A9AB" stroke="#A7A9AB" height={120} />
              </Box>
              </Box>
            </Modal> */}

          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>



            {/* <Button onClick={() => {
          // alert('Camper');
          setCamper(!camper)
        }}> Camper</Button>
        
        <Button onClick={() => {
          // alert('Water Tank Levels');
          // setWaterTankLevels(!waterTankLevels)
        }}
      >Water Tank Levels</Button> */}

            <Button onClick={() => window.location.reload()}>Refresh page</Button>
            <Button onClick={onButtonClick}>Full screen</Button>
            {/* <div onClick={() => setOpen(true)}>Night mode</div> */}

            {/*

<BottomNavigation
showLabels
value={value}
onChange={(event, newValue) => {
            console.log("newValue: " + newValue)
            
            switch (newValue) {
              
              case "camper":
                setCamper(!camper)
                break

                case "waterTankLevels":
                setWaterTankLevels(!waterTankLevels)
                break

                case "lpg":
                  setLpg(!lpg)
                  break
                  
                  case "temperatures":
                    setTemperatures(!temperatures)
                    break
                    
                    case "power":
                      setPowerLevels(!powerLevels)
                    break
                    
                    // case "nightMode":
                    //   setCamper(nightMode)
                    //   break
              
                    // default:
                    //   null
                    
                  }

            // console.log("tabs.length: " + tabs.length)
            // if (-1 < newValue && newValue < tabs.length) {
              //   setValue(newValue);
              //   console.log("newValue: " + newValue)
              // }
              // if (newValue == tabs.length) {
                //   handleOpen()
            //   console.log("nightmode")
            // }
          }}
        >
        <BottomNavigationAction label="Camper" value="camper" icon={<Home />} />
        <BottomNavigationAction label="Water tank levels" value="waterTankLevels" icon={<WaterIcon />} />
        <BottomNavigationAction label="LPG" value="lpg" icon={<PropaneTankIcon />} />
        <BottomNavigationAction label="Temperatures" value="temperature" icon={<CloudIcon />} />
        <BottomNavigationAction label="Power" value="power" icon={<BoltIcon />} />
          <BottomNavigationAction label="NightMode" value="nightMode" icon={<ModeNightIcon />} />
          
          {/* <BottomNavigationAction label="Camper" value="0" icon={<Home />} />
          <BottomNavigationAction label="Water tank levels" value="1" icon={<WaterIcon />} />
          <BottomNavigationAction label="LPG" value="2" icon={<PropaneTankIcon />} />
          <BottomNavigationAction label="Temperatures" value="3" icon={<CloudIcon />} />
          <BottomNavigationAction label="Power" value="4" icon={<BoltIcon />} />
          <BottomNavigationAction label="NightMode" value="5" icon={<ModeNightIcon />} /> 
          </BottomNavigation>
        */}
          </Paper>
        </HooksConnection >
      </FullScreen>
    </>
  )
}