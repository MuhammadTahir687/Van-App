import axios from "axios";

export const TaxiServices = {
    TaxiLogin(body) {
        return axios.post("https://eu-central-1.aws.data.mongodb-api.com/app/data_lookup-emecl/endpoint/LoginTaxi", body)
    },
    TaxiRegistration(body) {
        return axios.post("https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/insert/one_all?NameCollection=taxiDrivers", body)
    },
    TaxiDriverStatus(id, status) {
        return axios.patch(`https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/edit/TaxiDriveReady?taxi_driver_code=${id}&setStatusReady=${status}`)
    },
    TaxiUpdateProfile(body) {
        return axios.post(`https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/edit/taxiProfileSave?taxi_driver_code=${body?.taxi_driver_code}`, body)
    }
}

