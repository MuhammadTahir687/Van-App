import React, { useState } from 'react'
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

const BusinessAccountSignup = () => {

    const navigation = useNavigation();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [country, setCountry] = useState('')
    const [countryCode, setCountryCode] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [countryValidation, setCountryValidation] = useState("")
    const [categoryValidation, setCategoryValidation] = useState("")

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [age, setAge] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

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

    //*Manager Hotel*/ 
    //name
    //hotel name
    //country
    //city
    //breif introduction
    //number of rooms
    //hotel address
    //phone
    //email
    //password
    //amenities
    //foundation date

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
        if(value==null){
            setCategoryValidation("Select Category*")
        }
        else if (name == "") {
            setNameValidation("Required*")
        }
        else if (email == "") {
            setEmailValidation("Required*")
        }
        else if (reg.test(email) == false) {
            setEmailValidation("Enter a valid email address")
        }
        else if (country == "") {
            setCountryValidation("Required*")
        }
        else if (value =="Hotel Reservation" && hotelName ==""){
            setHotelNameValidation("Required*")
        }
        else if (value =="Hotel Reservation" && hotelAddress ==""){
            setHotelAddressValidation("Required*")
        }
        else if (password == "") {
            setPasswordValidation("Required*")
        }
        else {
            navigation.replace("BusinessAccount")
        }


    }

    return (
        <SafeAreaView style={styles.maincontainer}>
            <ScrollView nestedScrollEnabled={true} style={{ flexGrow: 1 }} contentContainerStyle={styles.maincontent}>
                <View style={styles.container}>
                    <Image source={require("../../assets/Logo.png")} resizeMode="contain" style={styles.image} />
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
                                setValue={(value)=>{setValue(value),setCategoryValidation("")}}
                            />
                        </View>
                        {categoryValidation && <ErrorMessage error={categoryValidation}/>}
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

                        {/* {value != null && value == "Taxi" && 
                        <>
                        <View style={styles.inputContainer}>
                            <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Enter Taxi Model'
                                placeholderTextColor={Colors.PrimaryColor}

                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Enter Hire Rate'
                                placeholderTextColor={Colors.PrimaryColor}

                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Enter Plate Number'
                                placeholderTextColor={Colors.PrimaryColor}

                            />
                        </View>
                        <View style={styles.descriptionbox}>
                            <MaterialIcons name={"description"} size={15} color={Colors.PrimaryColor} style={styles.descriptionicon} />
                            <TextInput
                                style={styles.textbox}
                                placeholder='Enter Breif Introduction'
                                underlineColorAndroid="transparent"
                                multiline={true}
                                numberOfLines={8}
                                placeholderTextColor={Colors.PrimaryColor}

                            />
                        </View>
                        </>
                        } */}

                        {value != null && value == 'Hotel Reservation' &&
                            <>
                                <View style={styles.inputContainer}>
                                    <FontAwesome5 name={"building"} color={Colors.PrimaryColor} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={Languages.ba_signup_hotel_name}
                                        placeholderTextColor={Colors.PrimaryColor}
                                        value={hotelName}
                                        onChangeText={(text) => { setHotelName(text),setHotelNameValidation("") }}
                                    />
                                </View>
                                {hotelNameValidation && <ErrorMessage error={hotelNameValidation}/>}
                                <View style={styles.inputContainer}>
                                    <FontAwesome5 name={"globe-americas"} color={Colors.PrimaryColor} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={Languages.ba_signup_hotel_address}
                                        placeholderTextColor={Colors.PrimaryColor}
                                        value={hotelAddress}
                                        onChangeText={(text) => { setHotelAddress(text),setHotelAddressValidation("") }}
                                    />
                                </View>
                                {hotelAddressValidation && <ErrorMessage error={hotelAddressValidation}/>}
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




                        <TouchableOpacity onPress={()=>{Submit()}} style={styles.btn}>
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

