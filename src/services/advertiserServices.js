import axios from "axios";

export const AdvertiserServices = {
    Edit_Profile(biz_code, body) {
        return axios.post(`https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/edit/BizAdvertiserProfileSave?biz_code=${biz_code}`, body)

    },
}