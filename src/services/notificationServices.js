import axios from "axios";
import { ONESIGNAL_APP_ID } from "@env"

export const NotificationServices = {
    SendNotification(body) {
        return axios.post('https://onesignal.com/api/v1/notifications', body, {
            headers: {
                'Authorization': 'Basic ' + ONESIGNAL_APP_ID,
                'Content-Type': 'application/json'
            }
        }
        )
    }
}

