import { useContext } from "react"
import MqttContext from "./Context"

export function UseMqttState() {
    const { connectionStatus, client, parserMethod } = useContext(MqttContext)

    return {
        connectionStatus,
        client,
        parserMethod
    }
}
