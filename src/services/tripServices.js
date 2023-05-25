import axios from "axios";

export const TripServices = {
    Add_TripPlan(body) {
        return axios.post("https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/insert/one_all?NameCollection=guidesTripPlans", body)
    },
    Edit_Profile(body) {
        return axios.post(`https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/edit/guideProfileSave?guide_code=${body?.guide_code}`, body)

    },
    Edit_TripPlan(id, body) {
        return axios.post(`https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/edit/guideTripPlanSave?_id=${id}`, body)
    }
}