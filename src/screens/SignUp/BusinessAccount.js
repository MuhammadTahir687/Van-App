import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import { styles } from './style';
import { Colors } from '../../constants/Colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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

const BusinessAccountSignup = ({ route }) => {

    const navigation = useNavigation();

    const userData = route?.params?.userData;
    const cat = route?.params?.cat;


    useEffect(() => {
        EditProfile()
    }, [cat, userData])

    const EditProfile = () => {
        if (cat == "TD") {
            setValue("Taxi")
        }
    }


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(false)

    const [country, setCountry] = useState(userData?.country ?? "")
    const [countryCode, setCountryCode] = useState(userData?.country_code ?? '')
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [countryValidation, setCountryValidation] = useState("")
    const [categoryValidation, setCategoryValidation] = useState("")

    const [name, setName] = useState(userData?.driver_name ?? "")
    const [email, setEmail] = useState(userData?.email ?? "")
    const [city, setCity] = useState(userData?.email ?? "")
    const [age, setAge] = useState("")
    const [phone, setPhone] = useState(userData?.phone ?? "")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState(userData?.taxi_image_url ?? "")
    const [showImage, setShowImage] = useState(userData?.taxi_image_url ? true : false)
    const [currency, setCurrency] = useState(userData?.currency ?? "")

    const [nameValidation, setNameValidation] = useState("")
    const [passwordValidation, setPasswordValidation] = useState("")
    const [emailValidation, setEmailValidation] = useState("")
    const [ageValidation, setAgeValidation] = useState("")

    const data = [
        { label: 'Taxi', value: 'Taxi' },
        { label: 'Tour Guide', value: 'Tour Guide' },
        { label: 'Car Rent', value: 'Car Rent' },
        { label: 'Hotel Reservation', value: 'Hotel Reservation' },
        { label: 'Business Advertisement', value: 'Business Advertisement' },
    ]

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

    // Taxi

    const [taxiModel, setTaxiModel] = useState(userData?.taxi_model_name ?? "")
    const [taxihireRate, setTaxiHireRate] = useState(userData?.hire_rate?.toString() ?? "")
    const [taxiPlateNumber, settaxiPlateNumber] = useState(userData?.plate_no ?? "")
    const [taxiIntroduction, setTaxiIntroduction] = useState(userData?.brief_introduction ?? "")
    const [taxiModelValidation, setTaxiModelValidation] = useState("")
    const [taxiPlateNumberValidation, setTaxiPlateNumberValidation] = useState("")
    const [taxiHireRateValidation, setTaxiHireRateValidation] = useState("");
    const [currencyValidation, setCurrencyValidation] = useState("")

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
    const [hotelNameValidation, setHotelNameValidation] = useState("")
    const [hotelAddressValidation, setHotelAddressValidation] = useState("")

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
        if (value == null) setCategoryValidation("Select Category*")
        else if (name == "") setNameValidation("Required*")
        else if (email == "") setEmailValidation("Required*")
        else if (reg.test(email) == false) setEmailValidation("Enter a valid email address")
        else if (country == "") setCountryValidation("Required*")
        else if (value == "Taxi" && taxiModel == "") setTaxiModelValidation("Required*")
        else if (value == "Taxi" && currency == "") setCurrencyValidation("Required*")
        else if (value == "Taxi" && taxihireRate == "") setTaxiHireRateValidation("Required*")
        else if (value == "Taxi" && taxiPlateNumber == "") setTaxiPlateNumberValidation("Required*")
        else if (value == "Hotel Reservation" && hotelName == "") setHotelNameValidation("Required*")
        else if (value == "Hotel Reservation" && hotelAddress == "") setHotelAddressValidation("Required*")
        else if (password == "") setPasswordValidation("Required*")
        else {
            const taxi_body = {
                taxi_driver_code: new Date().toDateString(),
                driver_name: name,
                taxi_model_name: taxiModel,
                taxi_image_url: image,
                brief_introduction: taxiIntroduction,
                currency: currency,
                hire_rate: taxihireRate,
                plate_no: taxiPlateNumber,
                country: country,
                country_code: countryCode,
                city: city,
                phone: phone,
                email: email,
                password: password,
                status_ready: true,
                registration_date: new Date(),
                admin_approved: false,
                admin_remarks: "Administration remarks if any...",
                log_last_login: new Date(),
            }
            console.log(taxi_body)

            try {
                if (value == "Taxi") {
                    setLoading(true)
                    const taxiResponse = await TaxiServices.TaxiRegistration(taxi_body)
                    if (taxiResponse) {
                        console.log("Taxi response: ", taxiResponse)
                        setLoading(false)
                        navigation.replace("BusinessAccount")
                    }
                }

            } catch (error) {
                setLoading(false)
                console.log(error)

            }
        }


    }

    return (
        <SafeAreaView style={styles.maincontainer}>
            <Loader loading={loading} setLoading={setLoading} />
            <ScrollView nestedScrollEnabled={true} style={{ flexGrow: 1 }} contentContainerStyle={styles.maincontent}>
                <View style={styles.container}>
                    <Image source={require("../../assets/oneapp-logo1.png")} resizeMode="contain" style={styles.image} />
                    <View style={styles.subcontainer}>
                        <Text style={styles.loginHeading}>{Languages.ba_signup_screen_h}</Text>
                        <View style={styles.dropdowncontainer}>
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
                        {categoryValidation && <ErrorMessage error={categoryValidation} />}

                        {/* To add Headings on profile edit */}
                        {/* <Text style={{ textAlign: "left", width: "100%", left: 10, color: Colors.PrimaryColor }}>Name</Text> */}


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
                            {value != 'Hotel Reservation' &&
                                <View style={styles.rowinputcontainer}>
                                    <FontAwesome5 name={"user-alt"} color={Colors.PrimaryColor} style={{ marginLeft: 5 }} />
                                    <TextInput
                                        style={styles.rowtextInput}
                                        placeholder={Languages.ba_signup_age}
                                        placeholderTextColor={Colors.PrimaryColor}
                                        value={age}
                                        keyboardType={"numeric"}
                                        onChangeText={(text) => { setAge(text) }}
                                    />
                                </View>
                            }
                            {value != null && value == 'Hotel Reservation' &&
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
                            }


                        </View>

                        {/************************Taxi*******************/}

                        {value != null && value == "Taxi" &&
                            <>
                                <View style={styles.inputContainer}>
                                    <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={"Enter Image Url"}
                                        placeholderTextColor={Colors.PrimaryColor}
                                        value={image}
                                        onChangeText={(text) => { setImage(text) }}

                                    />
                                </View>
                                <TouchableOpacity onPress={() => { setShowImage(true) }} style={{ backgroundColor: Colors.PrimaryColor, paddingHorizontal: 40, paddingVertical: 10, borderRadius: 10 }}>
                                    <Text style={{ color: Colors.WhiteColor }}>Load Image</Text>
                                </TouchableOpacity>
                                {showImage == true && image != "" && <Image source={{ uri: image }} style={{ width: 200, height: 200, margin: 10, borderRadius: 10 }} />}
                                <View style={styles.inputContainer}>
                                    <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={Languages.ba_signup_taxi_model}
                                        placeholderTextColor={Colors.PrimaryColor}
                                        value={taxiModel}
                                        onChangeText={(text) => { setTaxiModel(text), setTaxiModelValidation("") }}

                                    />
                                </View>
                                {taxiModelValidation && <ErrorMessage error={taxiModelValidation} />}
                                <View style={styles.inputContainer}>
                                    <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={"Currency"}
                                        placeholderTextColor={Colors.PrimaryColor}
                                        value={currency}

                                        onChangeText={(text) => { setCurrency(text), setCurrencyValidation("") }}

                                    />
                                </View>
                                {currencyValidation && <ErrorMessage error={currencyValidation} />}

                                <View style={styles.inputContainer}>
                                    <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={Languages.ba_signup_taxi_hire_rate}
                                        placeholderTextColor={Colors.PrimaryColor}
                                        value={taxihireRate}
                                        keyboardType={'numeric'}
                                        onChangeText={(text) => { setTaxiHireRate(text), setTaxiHireRateValidation("") }}

                                    />
                                </View>
                                {taxiHireRateValidation && <ErrorMessage error={taxiHireRateValidation} />}

                                <View style={styles.inputContainer}>
                                    <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={Languages.ba_signup_taxi_plate_number}
                                        placeholderTextColor={Colors.PrimaryColor}
                                        value={taxiPlateNumber}
                                        onChangeText={(text) => { settaxiPlateNumber(text), setTaxiPlateNumberValidation("") }}

                                    />
                                </View>
                                {taxiPlateNumberValidation && <ErrorMessage error={taxiPlateNumberValidation} />}

                                <View style={styles.descriptionbox}>
                                    <MaterialIcons name={"description"} size={15} color={Colors.PrimaryColor} style={styles.descriptionicon} />
                                    <TextInput
                                        style={styles.textbox}
                                        placeholder={Languages.ba_signup_taxi_introduction}
                                        underlineColorAndroid="transparent"
                                        multiline={true}
                                        numberOfLines={8}
                                        placeholderTextColor={Colors.PrimaryColor}
                                        value={taxiIntroduction}
                                        onChangeText={(text) => { setTaxiIntroduction(text) }}

                                    />
                                </View>
                            </>
                        }

                        {/************************Hotel Reservation*******************/}


                        {value != null && value == 'Hotel Reservation' &&
                            <>
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
                            </>
                        }

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
                        <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.btn}>
                            <Text style={styles.btntext}>{Languages.ba_signup_pa_btn_txt}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BusinessAccountSignup

