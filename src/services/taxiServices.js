import axios from "axios";

export const TaxiServices = {
    TaxiRegistration(body) {
        return axios.post("https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/insert/one_all?NameCollection=taxiDrivers", body)
    }
}