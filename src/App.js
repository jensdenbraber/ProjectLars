// import logo from './logo.svg';
import './App.css';
import React, { Suspense, useRef, useState, useEffect } from 'react'
import mqtt from 'mqtt';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Html, useProgress } from "@react-three/drei";

import HUD from './components/HeadsUpDisplay';



function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

function App() {

  function Camper(props) {
    // useGLTF.preload("/Truck_test.glb")
    const { scene } = useGLTF("Truck_test.glb");
    return <primitive object={scene} />;
  }

  // const [CameraPositionZ, setCameraPositionZ] = React.useState(1)

  // function Dolly() {
  //   useFrame((state) => {
  //     state.camera.position.z = 15 + { CameraPositionZ }
  //     // state.camera.position.z = 50 + Math.sin(state.clock.getElapsedTime()) * 30
  //     state.camera.updateProjectionMatrix()
  //   })

  //   return null
  // }



  const [connectStatus, setConnectStatus] = useState('Connect');
  const [payload, setPayload] = useState({});

  const [messages, setMessages] = useState([]);

  const [client, setClient] = useState(null)

  const [value, setValue] = React.useState(30);
  const [CameraPosition, setCameraPosition] = React.useState({ position: [-10, 15, 15], fov: 50 });

  useEffect(() => {
    // const client = mqtt.connect("ws://192.168.68.53:9001");
    setClient(mqtt.connect("ws://192.168.68.53:9001"));
    // client.on('connect', () => setConnectionStatus(true));
    // client.on('message', (topic, payload, packet) => {
    //   setMessages(messages.concat(payload.toString()));
    // });
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

  // const [cameraOptions, setcameraOptions] = useState({ position: [-10, 15, 15], fov: 50 })
  // const [cameraX, setcameraX] = useState(0)
  // const [cameraY, setcameraY] = useState(10)
  // const [cameraZ, setcameraZ] = useState(10)

  // useEffect(() => {
  //   console.log("Camera value changed to: " + cameraX)
  // }, [cameraX])

  useEffect(() => {
    console.log("connectionStatus: " + connectStatus)
  }, [connectStatus])

  // useEffect(() => {
  //   console.log("connectionStatus: " + cameraX)
  // }, [Canvas])

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
        // setIsSub(true)
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
        // setIsSub(false);
      });
    }
  };

  return (
    <>
      {/* //     <FullScreen> */}
      <div className="fixed" style={{ zindex: 6, top: "0%", left: "0%", width: "85%", height: "70%" }}>
        <Canvas className="box" pixelRatio={[1, 2]} camera={{ position: [-10, 15, 15], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <Camper />
          </Suspense>
          {/* <Stats showPanel={0} /> */}
          {/* <OrbitControls
            enableZoom={false}
            rotateSpeed={2}
            // autoRotate={true}
            autoRotateSpeed={5}>
          </OrbitControls> */}
          {/* <Dolly /> */}
        </Canvas>
      </div>
      <HUD className="overlay" mqttSub={mqttSub} mqttPublish={mqttPublish} mqttUnSub={mqttUnSub} mqttDisconnect={mqttDisconnect} payload={payload}></HUD>

      {/* //     </FullScreen> */}
    </>
  );
}

export default App;
