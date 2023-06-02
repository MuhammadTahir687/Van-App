import axios from "axios";

export const UserServices = {
    UserData(category) {
        return axios.get(`https://eu-central-1.aws.data.mongodb-api.com/app/data_lookup-emecl/endpoint/CollectionByName?NameCollection=${category}&adminApproved=All`)
    },
    UpdateUserProfile(code, body) {
        return axios.post(`https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/edit/touristsProfileSave?tourist_code=${code}`, body)
    }
}