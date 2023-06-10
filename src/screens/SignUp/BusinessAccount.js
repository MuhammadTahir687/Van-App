import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import { styles } from './style';
import { Colors } from '../../constants/Colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import DropdownPicker from '../../components/DropdownPicker/DropdownPicker';
import CountryPickerModal from '../../components/CountryPicker/CountryPicker';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Languages from '../../constants/Localization/localization';
import { TaxiServices } from '../../services/taxiServices';
import Loader from '../../components/Loader/Loader';
import { AuthServices } from '../../services/authServices';
import TaxiSignup from './TaxiSignup';
import HotelSignup from './HotelSignup';
import CarRentalSignup from './CarRentalSignup';
import Hotel from '../../assets/hotel.jpeg';
import Taxi from '../../assets/taxi.jpeg';
import Car from '../../assets/carrental.jpeg';
import Tour from '../../assets/tour.jpeg';


const BusinessAccountSignup = ({ route }) => {

    const navigation = useNavigation();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(false)

    // const [country, setCountry] = useState("")
    // const [countryCode, setCountryCode] = useState('')
    // const [passwordVisible, setPasswordVisible] = useState(true)
    // const [countryValidation, setCountryValidation] = useState("")
    const [categoryValidation, setCategoryValidation] = useState("")

    // const [name, setName] = useState("")
    // const [email, setEmail] = useState("")
    // const [city, setCity] = useState("")
    // const [age, setAge] = useState("")
    // const [phone, setPhone] = useState("")
    // const [password, setPassword] = useState("")
    // const [image, setImage] = useState("")
    // const [showImage, setShowImage] = useState(false)
    // const [currency, setCurrency] = useState("")

    // const [nameValidation, setNameValidation] = useState("")
    // const [passwordValidation, setPasswordValidation] = useState("")
    // const [emailValidation, setEmailValidation] = useState("")
    // const [ageValidation, setAgeValidation] = useState("")
    // const [imageListValidation, setImageListValidation] = useState("")

    const data = [
        { label: 'Taxi', value: 'Taxi' },
        { label: 'Tour Guide', value: 'Tour Guide' },
        { label: 'Car Rent', value: 'Car Rent' },
        { label: 'Hotel Reservation', value: 'Hotel Reservation' },
        { label: 'Business Advertisement', value: 'Business Advertisement' },
    ]
    const Images = [
        { id: 1, image: Taxi, name: Languages?.ba_signup_taxiBtn },
        { id: 2, image: Hotel, name: Languages?.ba_signup_hotelBtn },
        { id: 3, image: Car, name: Languages?.ba_signup_carBtn },
        { id: 4, image: Tour, name: Languages?.ba_signup_tourBtn },

    ]

    // const Amenities = [
    //     { label: 'Cable TV', value: 'Cable Tv' },
    //     { label: 'Internet', value: 'Internet' },
    //     { label: 'Wi-Fi', value: 'Wi-Fi' },
    //     { label: 'Air Conditioning', value: 'Air Conditioning' },
    //     { label: 'Pool', value: 'Pool' },
    //     { label: 'Resturant', value: 'Resturant' },
    //     { label: 'Laundry', value: 'Laundry' },
    //     { label: 'Free Parking on premises', value: 'Free Parking on premises' },
    //     { label: 'Heating', value: 'Heating' },
    // ]

    // // Taxi

    // const [taxiModel, setTaxiModel] = useState("")
    // const [taxihireRate, setTaxiHireRate] = useState("")
    // const [taxiPlateNumber, settaxiPlateNumber] = useState("")
    // const [taxiIntroduction, setTaxiIntroduction] = useState("")
    // const [taxiModelValidation, setTaxiModelValidation] = useState("")
    // const [taxiPlateNumberValidation, setTaxiPlateNumberValidation] = useState("")
    // const [taxiHireRateValidation, setTaxiHireRateValidation] = useState("");
    // const [currencyValidation, setCurrencyValidation] = useState("");
    // const [taxiImageValidation, setTaxiImageValidation] = useState("");

    // //*Hotel Reservation*/
    // const [hotelName, setHotelName] = useState('')
    // const [hotelAddress, setHotelAddress] = useState('')
    // const [hotelRooms, setHotelRooms] = useState('')
    // const [showDate, setShowDate] = useState(false)
    // const [hotelDate, setHotelDate] = useState(new Date())
    // const [showHotelPlaceholder, setShowHotelPlaceholder] = useState(true)
    // const [amenitiesOpen, setAmenitiesOpen] = useState(false)
    // const [amenities, setamenities] = useState([])
    // const [hotelDescription, setHotelDescription] = useState('')
    // const [hotelImages, setHotelImages] = useState({ showHotelImage: false, hotelImagesList: [], hotelImage: "", hotelImageValue: "" })

    // const [hotelNameValidation, setHotelNameValidation] = useState("")
    // const [hotelAddressValidation, setHotelAddressValidation] = useState("")

    // const handleDate = (event, selectedDate) => {
    //     if (selectedDate) {
    //         const currentDate = selectedDate;
    //         setShowDate(false)
    //         setHotelDate(currentDate);
    //         setShowHotelPlaceholder(false)
    //         console.log("Date ==", currentDate)
    //     }
    //     else {
    //         setShowDate(false)
    //         setShowHotelPlaceholder(true)
    //         setHotelDate(new Date())
    //     }
    // }


    // const Submit = async () => {
    //     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    //     if (value == null) setCategoryValidation("Select Category*")
    //     else if (name == "") setNameValidation("Required*")
    //     else if (email == "") setEmailValidation("Required*")
    //     else if (reg.test(email) == false) setEmailValidation("Enter a valid email address")
    //     else if (country == "") setCountryValidation("Required*")
    //     else if (value == "Taxi" && image == "") setTaxiImageValidation("Required*")
    //     else if (value == "Tour Guide" && image == "") setTaxiImageValidation("Required*")
    //     else if (value == "Taxi" && taxiModel == "") setTaxiModelValidation("Required*")
    //     else if (value == "Taxi" && currency == "") setCurrencyValidation("Required*")
    //     else if (value == "Taxi" && taxihireRate == "") setTaxiHireRateValidation("Required*")
    //     else if (value == "Taxi" && taxiPlateNumber == "") setTaxiPlateNumberValidation("Required*")
    //     else if (value == "Hotel Reservation" && hotelName == "") setHotelNameValidation("Required*")
    //     else if (value == "Hotel Reservation" && hotelAddress == "") setHotelAddressValidation("Required*")
    //     else if (value == "Hotel Reservation" && !hotelImages?.hotelImagesList.length > 1) setImageListValidation("Required*")
    //     else if (value == "Tour Guide" && !hotelImages?.hotelImagesList.length > 1) setImageListValidation("Required*")
    //     else if (password == "") setPasswordValidation("Required*")
    //     else {
    //         const taxi_body = {
    //             taxi_driver_code: new Date().toDateString(),
    //             driver_name: name,
    //             taxi_model_name: taxiModel,
    //             taxi_image_url: image,
    //             brief_introduction: taxiIntroduction,
    //             currency: currency,
    //             hire_rate: taxihireRate,
    //             plate_no: taxiPlateNumber,
    //             country: country,
    //             country_code: countryCode,
    //             city: city,
    //             phone: phone,
    //             email: email,
    //             password: password,
    //             status_ready: false,
    //             registration_date: new Date(),
    //             admin_approved: false,
    //             admin_remarks: "Administration remarks if any...",
    //             log_last_login: new Date(),
    //         }
    //         const hotelMangersBody = {
    //             "manager_code": new Date(),
    //             "manager_name": name,
    //             "hotel_name": hotelName,
    //             "hotel_image_url": hotelImages?.hotelImagesList[0],
    //             "hotel_view_url": hotelImages?.hotelImagesList,
    //             "country": country,
    //             "country_code": countryCode,
    //             "city": city,
    //             "foundation_date": hotelDate,
    //             "brief_introduction": hotelDescription,
    //             "number_of_rooms": hotelRooms,
    //             "hotel_address": hotelAddress,
    //             "phone": phone,
    //             "email": email,
    //             "password": password,
    //             "registration_date": new Date(),
    //             "amenities": amenities,
    //             "admin_approved": false,
    //             "admin_remarks": "Administration remarks if any...",
    //             "log_last_login": new Date()
    //         }

    //         const guide = {
    //             "guide_code": "TG-101",
    //             "guide_name": name,
    //             "profile_image_url": image,
    //             "trips_view_url": hotelImages?.hotelImagesList,
    //             "age_years": age,
    //             "country": country,
    //             "country_code": countryCode,
    //             "city": city,
    //             "phone": phone,
    //             "email": email,
    //             "password": password,
    //             "registration_date": new Date(),
    //             "admin_approved": false,
    //             "admin_remarks": "",
    //             "log_last_login": new Date(),
    //         }

    //         const carRentalBody = {
    //             "car_agent_code": "CA-101",
    //             "agent_name": "MUSAIB XELEF",
    //             "agency_name": "RentA Car Co",
    //             "agency_image_url": "https://www.historyhit.com/app/uploads/fly-images/5161222/Van-Castle-1-1576x1074.jpg",
    //             "agency_start_date": { "$date": { "$numberLong": "1670371200000" } },
    //             "brief_introduction": "Slogan for the Agency…",
    //             "number_of_cars": 15,
    //             "country": "Turkey",
    //             "city": "Van",
    //             "agency_address": "477-GG, Street main, Beşyol/İpekyolu/Van",
    //             "phone": "3218833722",
    //             "email": "abcd@gmail.com",
    //             "password": "$2b$12$UREFwsRUoyF0CRqGNK0LzO0H",
    //             "registration_date": { "$date": { "$numberLong": "1670371200000" } },
    //             "admin_approved": true,
    //             "admin_remarks": "Administration remarks if any...",
    //             "log_last_login": { "$date": { "$numberLong": "1670491200000 " } }
    //         }

    //         console.log("Hotel Mangers Body", hotelMangersBody)

    //         try {
    //             if (value == "Taxi") {
    //                 setLoading(true)
    //                 const taxiResponse = await TaxiServices.TaxiRegistration(taxi_body)
    //                 if (taxiResponse) {
    //                     console.log("Taxi response: ", taxiResponse)
    //                     setLoading(false)
    //                     alert("Taxi Driver Registered Successfully")
    //                     navigation.replace("BusinessAccount")
    //                 }
    //             }
    //             else if (value == "Hotel Reservation") {
    //                 setLoading(true)
    //                 const hotelManagersResponse = await AuthServices.HM_Register(hotelMangersBody)
    //                 if (hotelManagersResponse) {
    //                     console.log("Hotel Manager response: ", hotelManagersResponse)
    //                     setLoading(false)
    //                     alert("Hotel Manager Registered Successfully")
    //                     navigation.replace("BusinessAccount")
    //                 }
    //             }

    //         } catch (error) {
    //             setLoading(false)
    //             alert(error?.response?.data)
    //             console.log(error?.response?.data)

    //         }
    //     }


    // }


    // const AddHotelImages = () => {
    //     if (!hotelImages?.hotelImage == "") {
    //         setHotelImages({ ...hotelImages, hotelImagesList: [...hotelImages?.hotelImagesList, { id: hotelImages?.hotelImagesList?.length + 1, url: hotelImages?.hotelImage }], hotelImageValue: "" })
    //     }


    // }

    // const RemoveHotelImage = (item) => {
    //     const filterImages = hotelImages?.hotelImagesList?.filter(image => image?.id != item?.id)
    //     setHotelImages({ ...hotelImages, hotelImagesList: filterImages })
    // }

    const Submit = (item) => {
        if (item.id == 1) navigation.navigate("TaxiSignup")
        else if (item.id == 2) navigation.navigate("HotelSignup")
        else if (item.id == 3) navigation.navigate("CarRentalSignup")
        else if (item.id == 4) navigation.navigate("TourGuideSignup")
    }

    return (
        <SafeAreaView style={styles.maincontainer}>
            <Loader loading={loading} setLoading={setLoading} />
            <ScrollView nestedScrollEnabled={true} style={{ flexGrow: 1 }} contentContainerStyle={styles.maincontent}>
                <View style={styles.container}>
                    <Image source={require("../../assets/oneapp-logo1.png")} resizeMode="contain" style={styles.image} />

                    <View style={styles.subcontainer}>
                        <Text style={styles.loginHeading}>{Languages.ba_signup_screen_h}</Text>
                        <View style={styles.signupImagesContainer}>
                            <FlatList
                                data={Images}
                                numColumns={2}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity onPress={() => { Submit(item) }} key={index} style={styles.listBtn}>
                                        <Image source={item.image} resizeMode="contain" style={styles.listImages} />
                                        <Text style={styles.listText}>{item?.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>

                        {/* <View style={styles.dropdowncontainer}>
                            <DropdownPicker
                                listMode={"SCROLLVIEW"}
                                placeholder={Languages.ba_signup_category}
                                open={open}
                                value={value}
                                data={data}
                                setOpen={setOpen}
                                setValue={(value) => { setValue(value), setCategoryValidation("") }}
                            />
                        </View>
                        {categoryValidation && <ErrorMessage error={categoryValidation} />} */}


                        {
                            value == "Taxi" ?
                                <TaxiSignup /> :
                                value == "Hotel Reservation" ?
                                    <HotelSignup /> : value == "Car Rent" ?
                                        <CarRentalSignup /> : null
                        }


                        <TouchableOpacity onPress={() => { navigation.navigate('BusinessAdvrtiser') }} style={styles.btn}>
                            <Text style={styles.btntext}>{Languages?.ba_signup_advertisemntBtn}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView >
    )
}

export default BusinessAccountSignup

