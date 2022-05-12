// import logo from './logo.svg';
import './App.css';
import React, { Suspense, useState, useEffect } from 'react';
import mqtt from 'mqtt';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Canvas, useFrame } from '@react-three/fiber';
import { Sky, OrbitControls, useGLTF, Html, useProgress } from "@react-three/drei";
import Button from '@mui/material/Button';

import Grid from "./components/Grid";

import HeadsUpDisplay from './components/HeadsUpDisplay';

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

function App() {

  function Camper(props) {
    const { scene } = useGLTF("./ProjectLars/Truck_y.glb");
    return <primitive object={scene} />;
  }

  const [currentStep, setCurrentStep] = React.useState(0)

  function CameraAnimation() {
    useFrame((state) => {

      // console.log("state.camera.position.x: " + state.camera.position.x)
      // console.log("state.camera.position.y: " + state.camera.position.y)
      // console.log("state.camera.position.z: " + state.camera.position.z)

      // console.log("state.camera.rotation.x: " + state.camera.rotation.x / 0.0174533)
      // console.log("state.camera.rotation.y: " + state.camera.rotation.y / 0.0174533)
      // console.log("state.camera.rotation.z: " + state.camera.rotation.z / 0.0174533)


      if (currentStep > 0) {


        state.camera.position.x = state.camera.position.x + tween.x
        state.camera.position.y = state.camera.position.y + tween.y
        state.camera.position.z = state.camera.position.z + tween.z

        state.camera.rotation.x = state.camera.rotation.x + tween.rotation_x
        state.camera.rotation.y = state.camera.rotation.y + tween.rotation_y
        state.camera.rotation.z = state.camera.rotation.z + tween.rotation_z

        setCurrentStep(currentStep - 1)
      }

      setCameraPosition({
        x: state.camera.position.x, y: state.camera.position.y, z: state.camera.position.z,
        rotation_x: state.camera.rotation.x,
        rotation_y: state.camera.rotation.y,
        rotation_z: state.camera.rotation.z
      })

      state.camera.updateProjectionMatrix()
    })

    return null
  }

  const [connectStatus, setConnectStatus] = useState('Connect');
  const [payload, setPayload] = useState({});

  const [client, setClient] = useState(null)

  const [tween, setTween] = React.useState(null);
  const [cameraPosition, setCameraPosition] = React.useState({ x: -10, y: 15, z: 15 });

  useEffect(() => {
    // setClient(mqtt.connect("ws://192.168.68.53:9001"));
    setClient(mqtt.connect("ws://192.168.1.160:9001"));
  }, []);

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        setConnectStatus('Connected');
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
      });
    }
  }, [client]);

  useEffect(() => {
    console.log("connectionStatus: " + connectStatus)
  }, [connectStatus])

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setConnectStatus('Connect');
      });
    }
  }

  const mqttPublish = (context) => {
    if (client) {
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, error => {
        if (error) {
          console.log('Publish error: ', error);
        }
      });
    }
  }

  const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
      });
    }
  };

  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic } = subscription;
      client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
      });
    }
  };

  const connection = {
    subscribe: mqttSub,
    unsubscibe: mqttUnSub,
    publish: mqttPublish,
    disconnect: mqttDisconnect,
    payload: payload
  }

  const buttonClick = () => startMovingCamera({ x: 0, y: 0, z: 20, rotation_x: 0, rotation_y: 0, rotation_z: 0 })
  const buttonClick2 = () => startMovingCamera({ x: 0, y: 20, z: 0, rotation_x: -90, rotation_y: 0, rotation_z: 0 })

  const startMovingCamera = (endPosition) => {
    const stepsize = 50
    setCurrentStep(stepsize)
    setTween(calculateTween(cameraPosition, endPosition, stepsize))
  }

  const calculateTween = (currentPosition, endPosition, stepSize) => {
    return {
      x: (endPosition.x - currentPosition.x) / stepSize,
      y: (endPosition.y - currentPosition.y) / stepSize,
      z: (endPosition.z - currentPosition.z) / stepSize,

      rotation_x: (endPosition.rotation_x * 0.0174533 - currentPosition.rotation_x) / stepSize,
      rotation_y: (endPosition.rotation_y * 0.0174533 - currentPosition.rotation_y) / stepSize,
      rotation_z: (endPosition.rotation_z * 0.0174533 - currentPosition.rotation_z) / stepSize
    }
  }

  return (
    <>
      {/* //     <FullScreen> */}
      <div className="fixed" style={{ zindex: 6, top: "0%", left: "0%", width: "85%", height: "70%" }}>
        <Canvas className="box" pixelRatio={[1, 2]} camera={{ position: [-10, 10, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <Suspense fallback={<Loader />}>
            <Camper />
          </Suspense>
          <CameraAnimation />
          {/* <Sky distance={45000} sunPosition={[0, 0.1, -0.9]} inclination={0} azimuth={0.25} /> */}

          {/* <axesHelper scale={10} /> */}
          {/* <Grid size={10} /> */}
          {/* <OrbitControls></OrbitControls> */}
          {/* <gridHelper args={[20, 40, "blue", "hotpink"]} /> */}
        </Canvas>
      </div>
      {/* <Button onClick={() => buttonClick()}>Testkonp</Button> */}
      {/* <Button onClick={() => buttonClick2()}>Testkonp</Button> */}
      <HeadsUpDisplay className="overlay" connection={connection} startMovingCamera={startMovingCamera}></HeadsUpDisplay>
      {/* //     </FullScreen> */}
    </>
  );
}

export default App;
