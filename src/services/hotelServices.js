import axios from "axios";

export const HotelServices = {
    Add_HotelRooms(body) {
        return axios.post("https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/insert/one_all?NameCollection=hotelRooms", body)
    },
    Edit_HotelManagersProfile(managerCode, body) {
        return axios.post(`https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/edit/hotelProfileSave?manager_code=${managerCode}`, body)

    },
    Edit_HotelRooms(body) {
        return axios.post(`https://asia-south1.gcp.data.mongodb-api.com/app/registerapp-kvgyw/endpoint/edit/roomProfileSave?room_code=${body?.room_code}`, body)
    }
}