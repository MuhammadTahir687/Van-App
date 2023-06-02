import axios from "axios";

export const CarServices = {
    Add_CarFleet(body) {
        return axios.post("https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/insert/one_all?NameCollection=carRentalFleet", body)
    },
    Edit_CarFleet(carCode, body) {
        return axios.post(`https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/edit/carRentalFleetProfileSave?car_code=${carCode}`, body)

    },
    Edit_Profile(body) {
        return axios.post(`https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/edit/carAgentProfileSave?car_agent_code=${body?.car_agent_code}`, body)
    }
}