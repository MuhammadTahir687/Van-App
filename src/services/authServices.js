import axios from "axios";

export const AuthServices = {
    PA_Login(body) {
        return axios.post('https://eu-central-1.aws.data.mongodb-api.com/app/data_lookup-emecl/endpoint/LoginPA', body)
    }
}