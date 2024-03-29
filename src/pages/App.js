import '../styles/App.css';
import React from 'react';
import { Box, Button, Paper } from '@mui/material';
import WaterTankLevels from '../layouts/WaterTankLevels';
import Clock from '../components/Clock';
import Temperatures from '../layouts/Temperatures';
import Boiler from '../components/lpg/Boiler'
import HooksConnection from '../hooks/mqtt/Connection'

export default function App() {

  // const [value, setValue] = React.useState(0);
  // const [open, setOpen] = React.useState(false);

  // const [camper, setCamper] = React.useState(true);
  // const [waterTankLevels, setWaterTankLevels] = React.useState(false);
  // const [lpg, setLpg] = React.useState(false);
  // const [temperatures, setTemperatures] = React.useState(false);
  // const [powerLevels, setPowerLevels] = React.useState(false);

  return (
    <HooksConnection brokerUrl="ws://raspberrypi4:9001" options={{ keepalive: 0 }}>
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
  )
}