import axios from "axios";

export const AuthServices = {
    PA_Login(body) {
        return axios.post('https://eu-central-1.aws.data.mongodb-api.com/app/data_lookup-emecl/endpoint/LoginPA', body)
    },
    PA_Register(body) {
        return axios.post("https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/insert/one_all?NameCollection=tourists", body)
    },
    HM_Register(body) {
        return axios.post("https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/insert/one_all?NameCollection=hotelManagers", body)
    },
    HM_Login(body) {
        return axios.post("https://eu-central-1.aws.data.mongodb-api.com/app/data_lookup-emecl/endpoint/LoginHoteManager", body)
    },
    CR_Register(body) {
        return axios.post("https://eu-central-1.aws.data.mongodb-api.com/app/data_lookup-emecl/endpoint/carRentalAgents", body)

    }
}