// import React from 'react';

// const Connection = (t) => {

//   console.log("Test2222: " + t)

//   // const ConnectionForm = (
//   //   <Form
//   //     layout="vertical"
//   //     name="basic"
//   //     form={form}
//   //     initialValues={record}
//   //     onFinish={onFinish}
//   //   >
//   //     {/* <Row gutter={20}>
//   //       <Col span={8}>
//   //         <Form.Item
//   //           label="Host"
//   //           name="host"
//   //         >
//   //           <Input />
//   //         </Form.Item>
//   //       </Col>
//   //       <Col span={8}>
//   //         <Form.Item
//   //           label="Port"
//   //           name="port"
//   //         >
//   //           <Input />
//   //         </Form.Item>
//   //       </Col>
//   //       <Col span={8}>
//   //         <Form.Item
//   //           label="Client ID"
//   //           name="clientId"
//   //         >
//   //           <Input />
//   //         </Form.Item>
//   //       </Col>
//   //       <Col span={8}>
//   //         <Form.Item
//   //           label="Username"
//   //           name="username"
//   //         >
//   //           <Input />
//   //         </Form.Item>
//   //       </Col>
//   //       <Col span={8}>
//   //         <Form.Item
//   //           label="Password"
//   //           name="password"
//   //         >
//   //           <Input />
//   //         </Form.Item>
//   //       </Col>
//   //     </Row> */}
//   //   </Form>
//   // )

//   return (<></>
//   );
// }

// export default Connection;


import React, { useEffect, useState, useMemo, useRef } from "react"

import { connect } from "mqtt/dist/mqtt.min"

import MqttContext from "./Context"

export default function Connector({
  children,
  brokerUrl,
  options = { keepalive: 0 },
  parserMethod
}) {
  // Using a ref rather than relying on state because it is synchronous
  const clientValid = useRef(false)
  const [connectionStatus, setStatus] = useState("Offline")
  const [client, setClient] = useState(null)

  useEffect(() => {
    if (!client && !clientValid.current) {
      // This synchronously ensures we won't enter this block again
      // before the client is asynchronously set
      clientValid.current = true
      setStatus("Connecting")
      console.log(`attempting to connect to ${brokerUrl}`)
      const mqtt = connect(brokerUrl, options)
      mqtt.on("connect", () => {
        console.debug("on connect")
        setStatus("Connected")
        // For some reason setting the client as soon as we get it from connect breaks things
        setClient(mqtt)
      })
      mqtt.on("reconnect", () => {
        console.debug("on reconnect")
        setStatus("Reconnecting")
      })
      mqtt.on("error", err => {
        console.log(`Connection error: ${err}`)
        setStatus(err.message)
      })
      mqtt.on("offline", () => {
        console.debug("on offline")
        setStatus("Offline")
      })
      mqtt.on("end", () => {
        console.debug("on end")
        setStatus("Offline")
      })
    }
  }, [client, clientValid, brokerUrl, options])

  // Only do this when the component unmounts
  useEffect(
    () => () => {
      if (client) {
        console.log("closing mqtt client")
        client.end(true)
        setClient(null)
        clientValid.current = false
      }
    },
    [client, clientValid]
  )

  // This is to satisfy
  // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
  const value = useMemo(
    () => ({
      connectionStatus,
      client,
      parserMethod
    }),
    [connectionStatus, client, parserMethod]
  )

  return <MqttContext.Provider value={value}>{children}</MqttContext.Provider>
}
