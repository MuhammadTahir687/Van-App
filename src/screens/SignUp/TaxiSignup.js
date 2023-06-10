import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, PermissionsAndroid } from 'react-native'
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
import { ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Languages from '../../constants/Localization/localization';
import { TaxiServices } from '../../services/taxiServices';
import Loader from '../../components/Loader/Loader';
import { AuthServices } from '../../services/authServices';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import Geolocation from 'react-native-geolocation-service';

const TaxiSignup = () => {

    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState("");

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

    // Taxi

    const [taxiModel, setTaxiModel] = useState("")
    const [taxihireRate, setTaxiHireRate] = useState("")
    const [taxiPlateNumber, settaxiPlateNumber] = useState("")
    const [taxiIntroduction, setTaxiIntroduction] = useState("")
    const [taxiModelValidation, setTaxiModelValidation] = useState("")
    const [taxiPlateNumberValidation, setTaxiPlateNumberValidation] = useState("")
    const [taxiHireRateValidation, setTaxiHireRateValidation] = useState("");
    const [currencyValidation, setCurrencyValidation] = useState("");
    const [taxiImageValidation, setTaxiImageValidation] = useState("");



    const Submit = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (name == "") setNameValidation("Required*")
        else if (email == "") setEmailValidation("Required*")
        else if (reg.test(email) == false) setEmailValidation("Enter a valid email address")
        else if (country == "") setCountryValidation("Required*")
        // else if (image == "") setTaxiImageValidation("Required*")
        else if (taxiModel == "") setTaxiModelValidation("Required*")
        else if (currency == "") setCurrencyValidation("Required*")
        else if (taxihireRate == "") setTaxiHireRateValidation("Required*")
        else if (taxiPlateNumber == "") setTaxiPlateNumberValidation("Required*")
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
                status_ready: false,
                registration_date: new Date(),
                admin_approved: false,
                admin_remarks: "Administration remarks if any...",
                log_last_login: new Date(),
            }

            try {

                setLoading(true)
                const response = await TaxiServices.TaxiRegistration(taxi_body)
                if (response) {
                    console.log("Taxi response: ", response)
                    setLoading(false)
                    alert(`Dear ${name}, your car agency registered successfully`)
                    navigation.replace("BusinessAccount")
                }

            } catch (error) {
                setLoading(false)
                alert(error?.response?.data)
                console.log(error?.response?.data)

            }
        }


    }

    const PickImage = async () => {
        await ImagePicker.openPicker({
            cropping: false
        }).then(async image => {
            const { path } = image;
            const filename = new Date()?.getTime() + path.substring(path.lastIndexOf('/') + 1);
            const reference = storage().ref(filename);
            await reference.putFile(path);
            const imageUrl = await storage().ref(filename).getDownloadURL();
            setImage(imageUrl)
            console.log(imageUrl)
        });
    }


    return (
        <SafeAreaView style={styles.maincontainer}>
            <Loader loading={loading} setLoading={setLoading} />
            <ScrollView nestedScrollEnabled={true} style={{ flexGrow: 1 }} contentContainerStyle={styles.maincontent}>
                <View style={styles.container}>
                    <Image source={require("../../assets/oneapp-logo1.png")} resizeMode="contain" style={styles.image} />
                    <View style={styles.subcontainer}>
                        <Text style={styles.loginHeading}>{Languages?.ba_signup_taxi_heading}</Text>
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
                            <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={Languages?.ba_signup_image}
                                placeholderTextColor={Colors.PrimaryColor}
                                value={image}
                                onChangeText={(text) => { setImage(text), setTaxiImageValidation("") }}

                            />
                        </View>
                        {taxiImageValidation && <ErrorMessage error={taxiImageValidation} />} */}

                        <TouchableOpacity onPress={() => { setShowImage(true), PickImage() }} style={{ backgroundColor: Colors.PrimaryColor, paddingHorizontal: 40, paddingVertical: 10, borderRadius: 10 }}>
                            <Text style={{ color: Colors.WhiteColor }}>{Languages?.ba_signup_load_image}</Text>
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
                                placeholder={Languages?.ba_signup_currency}
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

export default TaxiSignup
