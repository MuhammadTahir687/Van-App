import axios from "axios";

export const UserServices = {
    UserData(category) {
        return axios.get(`https://eu-central-1.aws.data.mongodb-api.com/app/data_lookup-emecl/endpoint/CollectionByName?NameCollection=${category}&adminApproved=All`)
    }
}