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
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Languages from '../../constants/Localization/localization';
import { TaxiServices } from '../../services/taxiServices';
import Loader from '../../components/Loader/Loader';
import { AuthServices } from '../../services/authServices';
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";

const CarRentalSignup = () => {

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

    const [profilePicture, setProfilePicture] = useState("")
    const [agencyName, setAgencyName] = useState("")
    const [agencyAddress, setAgencyAddress] = useState("")
    const [agencyIntroduction, setAgencyIntroduction] = useState("")
    const [numberOfCars, setNumberOfCars] = useState("")
    const [agencyImages, setAgencyImages] = useState({ showAgencyImage: false, AgencyImagesList: [], AgencyImage: "", AgencyImageValue: "" })

    const [profilePictureValidation, setProfilePictureValidation] = useState("")
    const [agencyNameValidation, setAgencyNameValidation] = useState("")
    const [agencyAddressValidation, setAgencyAddressValidation] = useState("")
    const [agencyImageValidation, setAgencyImageValidation] = useState("")
    const [numberOfCarsValidation, setNumberOfCarsValidation] = useState("")
    const [agencyIntroductionValidation, setAgencyIntroductionValidation] = useState("")

    const AddAgencyImages = () => {
        if (!agencyImages?.AgencyImage == "") {
            setAgencyImages({ ...agencyImages, AgencyImagesList: [...agencyImages?.AgencyImagesList, { id: agencyImages?.AgencyImagesList?.length + 1, url: agencyImages?.AgencyImage }], AgencyImageValue: "" })
        }
    }

    const RemoveAgencyImage = (item) => {
        const filterImages = agencyImages?.AgencyImagesList?.filter(image => image?.id != item?.id)
        setAgencyImages({ ...agencyImages, AgencyImagesList: filterImages })
    }

    const Submit = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (name == "") setNameValidation("Required*")
        else if (email == "") setEmailValidation("Required*")
        else if (reg.test(email) == false) setEmailValidation("Enter a valid email address")
        else if (country == "") setCountryValidation("Required*")
        else if (password == "") setPasswordValidation("Required*")
        else if (agencyName == "") setAgencyNameValidation("Required*")
        else if (agencyAddress == "") setAgencyAddressValidation("Required*")
        else if (numberOfCars == "") setNumberOfCarsValidation("Required*")
        else if (agencyIntroduction == "") setAgencyIntroductionValidation("Required*")
        else {
            const carRentalBody = {
                "car_agent_code": new Date(),
                "agent_name": name,
                "agency_name": agencyName,
                "agency_image_url": agencyImages?.AgencyImagesList[0],
                "fleet_image_url": agencyImages?.AgencyImagesList,
                "agency_start_date": agencyDate,
                "brief_introduction": agencyIntroduction,
                "number_of_cars": numberOfCars,
                "country": country,
                "country_code": countryCode,
                "city": city,
                "agency_address": agencyAddress,
                "phone": phone,
                "email": email,
                "password": password,
                "registration_date": new Date(),
                "admin_approved": false,
                "admin_remarks": "",
                "log_last_login": new Date(),
                "age": age
            }
            console.log(carRentalBody)

            try {

                setLoading(true)
                const response = await AuthServices.CR_Register(carRentalBody)
                if (response) {
                    console.log("Taxi response: ", response)
                    setLoading(false)
                    alert("Taxi Driver Registered Successfully")
                    navigation.replace("BusinessAccount")
                }

            } catch (error) {
                setLoading(false)
                alert(error?.response?.data)
                console.log(error?.response?.data)

            }
        }


    }

    const [agencyDate, setAgencyDate] = useState(new Date())
    const [showDate, setShowDate] = useState(false)
    const [showAgencyPlaceholder, setShowAgencyPlaceholder] = useState(false)

    const handleDate = (event, selectedDate) => {
        if (selectedDate) {
            const currentDate = selectedDate;
            setShowDate(false)
            setAgencyDate(currentDate);
            setShowAgencyPlaceholder(false)
            console.log("Date ==", currentDate)
        }
        else {
            setShowDate(false)
            setShowAgencyPlaceholder(true)
            setAgencyDate(new Date())
        }
    }

    const renderItem = ({ item, drag, isActive }) => {
        return (

            <TouchableOpacity onLongPress={drag} style={styles.carRentalImgContainer} >
                <TouchableOpacity onPress={() => { RemoveAgencyImage(item) }} style={styles.carRemoveImageIcon}>
                    <Ionicons name={"close"} size={15} style={styles.closeIcon} />
                </TouchableOpacity>
                <Image source={{ uri: item?.url }} style={styles.carRentalImage} />
            </TouchableOpacity>


        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.maincontainer}>
                <Loader loading={loading} setLoading={setLoading} />
                <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={styles.maincontent}>
                    <View style={styles.container}>
                        <Image source={require("../../assets/oneapp-logo1.png")} resizeMode="contain" style={styles.image} />
                        <View style={styles.subcontainer}>
                            <Text style={styles.loginHeading}>{Languages?.ba_signup_CR_heading}</Text>
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
                            </View>
                            {/* <View style={styles.inputContainer}>
                                <FontAwesome5 name={"user"} color={Colors.PrimaryColor} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={"Enter Profile Picture Url"}
                                    placeholderTextColor={Colors.PrimaryColor}
                                    value={profilePicture}
                                    onChangeText={(text) => { setProfilePicture(text) }}

                                />
                            </View>
                            {profilePicture != "" && <Image source={{ uri: profilePicture }} style={styles.image} />} */}

                            <View style={styles.inputContainer}>
                                <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={Languages?.ba_signup_CR_agencyName}
                                    placeholderTextColor={Colors.PrimaryColor}
                                    value={agencyName}
                                    onChangeText={(text) => { setAgencyName(text) }}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={Languages?.ba_signup_CR_agencyAddress}
                                    placeholderTextColor={Colors.PrimaryColor}
                                    value={agencyAddress}
                                    onChangeText={(text) => { setAgencyAddress(text) }}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={Languages?.ba_signup_CR_cars}
                                    placeholderTextColor={Colors.PrimaryColor}
                                    value={numberOfCars}
                                    onChangeText={(text) => { setNumberOfCars(text) }}
                                />
                            </View>

                            <View style={styles.descriptionbox}>
                                <MaterialIcons name={"description"} size={15} color={Colors.PrimaryColor} style={styles.descriptionicon} />
                                <TextInput
                                    style={styles.textbox}
                                    placeholder={Languages?.ba_signup_breif_introduction}
                                    underlineColorAndroid="transparent"
                                    multiline={true}
                                    numberOfLines={8}
                                    placeholderTextColor={Colors.PrimaryColor}
                                    value={agencyIntroduction}
                                    onChangeText={(text) => { setAgencyIntroduction(text) }}

                                />
                            </View>
                            {/* ==================Car Rent Image=================== */}
                            <View style={styles.inputContainer}>
                                <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={Languages?.ba_signup_image}
                                    placeholderTextColor={Colors.PrimaryColor}
                                    value={agencyImages?.AgencyImageValue}
                                    onChangeText={(text) => { setAgencyImages({ ...agencyImages, AgencyImage: text, AgencyImageValue: text }) }}

                                />
                            </View>

                            <TouchableOpacity disabled={agencyImages?.AgencyImageValue == "" ? true : false} onPress={() => { AddAgencyImages() }} style={styles.loadImageBtn}>
                                <Text style={{ color: Colors.WhiteColor }}>{Languages?.ba_signup_load_image}</Text>
                            </TouchableOpacity>


                            <View style={{ flex: 1 }}>


                                <DraggableFlatList

                                    data={agencyImages?.AgencyImagesList}
                                    onDragEnd={({ data }) => setAgencyImages({ ...agencyImages, AgencyImagesList: data })}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={renderItem}
                                />
                            </View>

                            <View style={styles.datecontainer}>
                                <FontAwesome5 name={"calendar-alt"} size={15} color={Colors.PrimaryColor} />
                                <TouchableOpacity style={styles.datebtn} onPress={() => { setShowDate(true) }}>
                                    {showAgencyPlaceholder == true ? <Text style={styles.datetext}>{Languages?.ba_signup_CR_agencyStartDate}</Text> : <Text style={styles.datetext}>{moment(agencyDate).format('ll')}</Text>}
                                    {showDate && <DateTimePicker
                                        value={agencyDate}
                                        onChange={handleDate}
                                    />
                                    }
                                </TouchableOpacity>
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
        </GestureHandlerRootView>
    )
}

export default CarRentalSignup