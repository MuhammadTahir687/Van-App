import React, { useEffect, useState } from 'react'
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
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Languages from '../../constants/Localization/localization';
import { TaxiServices } from '../../services/taxiServices';
import Loader from '../../components/Loader/Loader';
import { AuthServices } from '../../services/authServices';



const HotelSignup = () => {

    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [age, setAge] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [showImage, setShowImage] = useState(false)
    const [currency, setCurrency] = useState("")

    const [country, setCountry] = useState("")
    const [countryCode, setCountryCode] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [countryValidation, setCountryValidation] = useState("")
    const [categoryValidation, setCategoryValidation] = useState("")

    const [nameValidation, setNameValidation] = useState("")
    const [passwordValidation, setPasswordValidation] = useState("")
    const [emailValidation, setEmailValidation] = useState("")
    const [ageValidation, setAgeValidation] = useState("")
    const [imageListValidation, setImageListValidation] = useState("")

    //*Hotel Reservation*/
    const [hotelName, setHotelName] = useState('')
    const [hotelAddress, setHotelAddress] = useState('')
    const [hotelRooms, setHotelRooms] = useState('')
    const [showDate, setShowDate] = useState(false)
    const [hotelDate, setHotelDate] = useState(new Date())
    const [showHotelPlaceholder, setShowHotelPlaceholder] = useState(true)
    const [amenitiesOpen, setAmenitiesOpen] = useState(false)
    const [amenities, setamenities] = useState([])
    const [hotelDescription, setHotelDescription] = useState('')
    const [hotelImages, setHotelImages] = useState({ showHotelImage: false, hotelImagesList: [], hotelImage: "", hotelImageValue: "" })

    const [hotelNameValidation, setHotelNameValidation] = useState("")
    const [hotelAddressValidation, setHotelAddressValidation] = useState("")

    const Amenities = [
        { label: 'Cable TV', value: 'Cable Tv' },
        { label: 'Internet', value: 'Internet' },
        { label: 'Wi-Fi', value: 'Wi-Fi' },
        { label: 'Air Conditioning', value: 'Air Conditioning' },
        { label: 'Pool', value: 'Pool' },
        { label: 'Resturant', value: 'Resturant' },
        { label: 'Laundry', value: 'Laundry' },
        { label: 'Free Parking on premises', value: 'Free Parking on premises' },
        { label: 'Heating', value: 'Heating' },
    ]


    const handleDate = (event, selectedDate) => {
        if (selectedDate) {
            const currentDate = selectedDate;
            setShowDate(false)
            setHotelDate(currentDate);
            setShowHotelPlaceholder(false)
            console.log("Date ==", currentDate)
        }
        else {
            setShowDate(false)
            setShowHotelPlaceholder(true)
            setHotelDate(new Date())
        }
    }

    const Submit = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (name == "") setNameValidation("Required*")
        else if (email == "") setEmailValidation("Required*")
        else if (reg.test(email) == false) setEmailValidation("Enter a valid email address")
        else if (country == "") setCountryValidation("Required*")
        else if (hotelName == "") setHotelNameValidation("Required*")
        else if (hotelAddress == "") setHotelAddressValidation("Required*")
        // else if (!hotelImages?.hotelImagesList.length > 1) setImageListValidation("Required*")
        else if (password == "") setPasswordValidation("Required*")
        else {

            const hotelMangersBody = {
                "manager_code": new Date(),
                "manager_name": name,
                "hotel_name": hotelName,
                "hotel_image_url": hotelImages?.hotelImagesList[0],
                "hotel_view_url": hotelImages?.hotelImagesList,
                "country": country,
                "country_code": countryCode,
                "city": city,
                "foundation_date": hotelDate,
                "brief_introduction": hotelDescription,
                "number_of_rooms": hotelRooms,
                "hotel_address": hotelAddress,
                "phone": phone,
                "email": email,
                "password": password,
                "registration_date": new Date(),
                "amenities": amenities,
                "admin_approved": false,
                "admin_remarks": "Administration remarks if any...",
                "log_last_login": new Date()
            }


            console.log("Hotel Mangers Body", hotelMangersBody)

            try {

                setLoading(true)
                const response = await AuthServices.HM_Register(hotelMangersBody)
                if (response) {
                    console.log("Hotel Manager response: ", response)
                    setLoading(false)
                    alert("Hotel Manager Registered Successfully")
                    navigation.replace("BusinessAccount")
                }

            } catch (error) {
                setLoading(false)
                alert(error?.response?.data)
                console.log(error?.response?.data)

            }
        }


    }

    const AddHotelImages = () => {
        if (!hotelImages?.hotelImage == "") {
            setHotelImages({ ...hotelImages, hotelImagesList: [...hotelImages?.hotelImagesList, { id: hotelImages?.hotelImagesList?.length + 1, url: hotelImages?.hotelImage }], hotelImageValue: "" })
        }
    }

    const RemoveHotelImage = (item) => {
        const filterImages = hotelImages?.hotelImagesList?.filter(image => image?.id != item?.id)
        setHotelImages({ ...hotelImages, hotelImagesList: filterImages })
    }




    return (
        <SafeAreaView style={styles.maincontainer}>
            <Loader loading={loading} setLoading={setLoading} />
            <ScrollView nestedScrollEnabled={true} style={{ flexGrow: 1 }} contentContainerStyle={styles.maincontent}>
                <View style={styles.container}>
                    <Image source={require("../../assets/oneapp-logo1.png")} resizeMode="contain" style={styles.image} />
                    <View style={styles.subcontainer}>
                        <Text style={styles.loginHeading}>Hotel Reservation</Text>
                        <View style={styles.inputContainer}>
                            <FontAwesome5 name={"user-alt"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={Languages.ba_signup_name}
                                placeholderTextColor={Colors.PrimaryColor}
                                value={name}
                                onChangeText={(text) => { setName(text), setNameValidation("") }}
                            />
                        </View>
                        {nameValidation && <ErrorMessage error={nameValidation} />}
                        <View style={styles.inputContainer}>
                            <FontAwesome5 name={"mail-bulk"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={Languages.ba_signup_email}
                                keyboardType={"email-address"}
                                placeholderTextColor={Colors.PrimaryColor}
                                value={email}
                                autoCapitalize='none'
                                onChangeText={(text) => { setEmail(text), setEmailValidation("") }}

                            />
                        </View>
                        {emailValidation && <ErrorMessage error={emailValidation} />}


                        <View style={styles.rowcontainer}>
                            <View style={{ flex: 1 }}>
                                <CountryPickerModal
                                    countryCode={countryCode}
                                    setCountryCode={setCountryCode}
                                    country={country}
                                    setCountry={setCountry}
                                    setCountryValidation={setCountryValidation}
                                />
                                {countryValidation && <ErrorMessage error={countryValidation} />}
                            </View>

                            <View style={{ flex: 1 }}>
                                <View style={{ ...styles.rowinputcontainer, marginLeft: 5, flex: 0, height: 50 }}>
                                    <FontAwesome5 name={"globe-americas"} color={Colors.PrimaryColor} style={{ marginLeft: 5 }} />
                                    <TextInput
                                        style={styles.rowtextInput}
                                        placeholder={Languages.ba_signup_city}
                                        placeholderTextColor={Colors.PrimaryColor}
                                        value={city}
                                        onChangeText={(text) => { setCity(text) }}

                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.rowcontainer}>
                            <View style={{ ...styles.rowinputcontainer, marginRight: 10 }}>
                                <FontAwesome5 name={"phone-alt"} color={Colors.PrimaryColor} style={{ marginLeft: 5 }} />
                                <TextInput
                                    style={styles.rowtextInput}
                                    placeholder={Languages.ba_signup_phone}
                                    keyboardType={"numeric"}
                                    placeholderTextColor={Colors.PrimaryColor}
                                    value={phone}
                                    onChangeText={(text) => { setPhone(text) }}

                                />
                            </View>


                            <View style={styles.rowinputcontainer}>
                                <Fontisto name={"room"} color={Colors.PrimaryColor} style={{ marginLeft: 5 }} />
                                <TextInput
                                    style={styles.rowtextInput}
                                    placeholder={Languages.ba_signup_hotel_rooms}
                                    keyboardType='numeric'
                                    placeholderTextColor={Colors.PrimaryColor}
                                    value={hotelRooms}
                                    onChangeText={(text) => { setHotelRooms(text) }}

                                />
                            </View>

                        </View>
                        <View style={styles.inputContainer}>
                            <FontAwesome5 name={"building"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={Languages.ba_signup_hotel_name}
                                placeholderTextColor={Colors.PrimaryColor}
                                value={hotelName}
                                onChangeText={(text) => { setHotelName(text), setHotelNameValidation("") }}
                            />
                        </View>
                        {hotelNameValidation && <ErrorMessage error={hotelNameValidation} />}

                        <View style={styles.inputContainer}>
                            <FontAwesome5 name={"globe-americas"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={Languages.ba_signup_hotel_address}
                                placeholderTextColor={Colors.PrimaryColor}
                                value={hotelAddress}
                                onChangeText={(text) => { setHotelAddress(text), setHotelAddressValidation("") }}
                            />
                        </View>
                        {hotelAddressValidation && <ErrorMessage error={hotelAddressValidation} />}

                        {/* ==================Hotel Image=================== */}
                        <View style={styles.inputContainer}>
                            <FontAwesome5 name={"globe-americas"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={"Enter Image Url"}
                                placeholderTextColor={Colors.PrimaryColor}
                                value={hotelImages?.hotelImageValue}
                                onChangeText={(text) => { setHotelImages({ ...hotelImages, hotelImage: text, hotelImageValue: text }) }}

                            />
                        </View>
                        {imageListValidation && <ErrorMessage error={imageListValidation} />}

                        <TouchableOpacity disabled={hotelImages?.hotelImageValue == "" ? true : false} onPress={() => { AddHotelImages() }} style={styles.loadImageBtn}>
                            <Text style={{ color: Colors.WhiteColor }}>Load Image</Text>
                        </TouchableOpacity>

                        <View style={styles.imageContainer}>
                            {hotelImages?.hotelImagesList?.length > 0 &&
                                hotelImages?.hotelImagesList?.map((item, index) => (
                                    <View key={index}>
                                        <TouchableOpacity onPress={() => { RemoveHotelImage(item) }} style={styles.removeImageIcon}>
                                            <Ionicons name={"close"} size={15} style={styles.closeIcon} />
                                        </TouchableOpacity>
                                        <Image source={{ uri: item?.url }} style={styles.hotelImages} />
                                    </View>

                                ))
                            }
                        </View>
                        <View style={{ ...styles.dropdowncontainer, marginTop: 5 }}>
                            <DropdownPicker
                                multiple={true}
                                placeholder={Languages.ba_signup_hotel_ameneties}
                                listMode="MODAL"
                                open={amenitiesOpen}
                                value={amenities}
                                data={Amenities}
                                setOpen={setAmenitiesOpen}
                                setValue={setamenities}
                            />
                        </View>
                        <View style={styles.datecontainer}>
                            <FontAwesome5 name={"calendar-alt"} size={15} color={Colors.PrimaryColor} />
                            <TouchableOpacity style={styles.datebtn} onPress={() => { setShowDate(true) }}>
                                {showHotelPlaceholder == true ? <Text style={styles.datetext}>{Languages.ba_signup_hotel_foundation_date}</Text> : <Text style={styles.datetext}>{moment(hotelDate).format('ll')}</Text>}
                                {showDate && <DateTimePicker
                                    value={hotelDate}
                                    onChange={handleDate}
                                />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.descriptionbox}>
                            <MaterialIcons name={"description"} size={15} color={Colors.PrimaryColor} style={styles.descriptionicon} />
                            <TextInput
                                style={styles.textbox}
                                placeholder={Languages.ba_signup_hotel_breif_introduction}
                                underlineColorAndroid="transparent"
                                multiline={true}
                                numberOfLines={8}
                                placeholderTextColor={Colors.PrimaryColor}
                                value={hotelDescription}
                                onChangeText={(text) => { setHotelDescription(text) }}

                            />
                        </View>

                        <View style={{ ...styles.inputContainer, marginHorizontal: 20 }}>
                            <FontAwesome5 name={"lock"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={Languages.ba_signup_password}
                                secureTextEntry={passwordVisible}
                                placeholderTextColor={Colors.PrimaryColor}
                                value={password}
                                onChangeText={(text) => { setPassword(text), setPasswordValidation("") }}

                            />
                            <TouchableOpacity onPress={() => { setPasswordVisible(!passwordVisible) }}>
                                <FontAwesome5 name={passwordVisible ? "eye-slash" : "eye"} color={Colors.PrimaryColor} />
                            </TouchableOpacity>

                        </View>
                        {passwordValidation && <ErrorMessage error={passwordValidation} />}

                        <TouchableOpacity onPress={() => { Submit() }} style={styles.btn}>
                            <Text style={styles.btntext}>{Languages.ba_signup_btn_txt}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default HotelSignup