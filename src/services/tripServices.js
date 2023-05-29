import axios from "axios";

export const TripServices = {
    Add_TripPlan(body) {
        return axios.post("https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/insert/one_all?NameCollection=guidesTripPlans", body)
    },
    Edit_Profile(body) {
        return axios.post(`https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/edit/guideProfileSave?guide_code=${body?.guide_code}`, body)

    },
    Edit_TripPlan(trip_code, body) {
        return axios.post(`https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/edit/guideTripPlanSave?trip_code=${trip_code}`, body)
    }
}