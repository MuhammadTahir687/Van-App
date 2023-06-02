import React, { useMemo, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { styles } from "./style"
import { Colors } from '../../constants/Colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import Languages from '../../constants/Localization/localization';
import CountryPickerModal from '../../components/CountryPicker/CountryPicker';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { AuthServices } from '../../services/authServices';
import Loader from '../../components/Loader/Loader';
import Alert from '../../components/Alert/Alert';


const PersonelAccountSignup = () => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false)
    const [country, setCountry] = useState('')
    const [countryCode, setCountryCode] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [showAlert, setShowAlert] = useState(false)
    const [alertDetail, setAlertDetail] = useState({ message: "", color: "green" })

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [passport, setPassport] = useState("")
    const [age, setAge] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const [nameValidation, setNameValidation] = useState("")
    const [passwordValidation, setPasswordValidation] = useState("")
    const [countryValidation, setCountryValidation] = useState("")
    const [emailValidation, setEmailValidation] = useState("")
    const [ageValidation, setAgeValidation] = useState("")
    const [cityValidation, setCityValidation] = useState("")
    const [passportValidation, setPassportValidation] = useState("")
    const [phoneValidation, setPhoneValidation] = useState("")


    const Submit = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (name == "") {
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
        else if (city == "") {
            setCityValidation("Required*")
        }
        else if (passport == "") {
            setPassportValidation("Required*")
        }
        else if (age == "") {
            setAgeValidation("Required*")
        }
        else if (phone == "") {
            setPhoneValidation("Required*")
        }
        else if (password == "") {
            setPasswordValidation("Required*")
        }
        else {
            setLoading(true)
            const body = {

                tourist_code: "C",
                tourist_name: name,
                registration_date: new Date(),
                country: country,
                country_code: countryCode,
                city: city,
                passport_id: passport,
                age_years: age,
                phone: phone,
                email: email,
                password: password,
                admin_remarks: "",
                log_last_login: new Date()
            }
            console.log(body)
            try {
                const response = await AuthServices.PA_Register(body)
                if (response?.data) {
                    setLoading(false)
                    setShowAlert(true)
                    setAlertDetail({ message: "Account Created Successfully", color: "green" })
                    console.log(response.data)
                    navigation.replace("PersonelAccount")
                }
            } catch (error) {
                setLoading(false)
                setAlertDetail({ message: "Email Already Exists", color: "red" })
                setShowAlert(true)
                console.log("Error: " + error)
            }

        }


    }


    return (
        <SafeAreaView style={styles.maincontainer}>
            <Loader loading={loading} setLoading={setLoading} />
            <Alert showAlert={showAlert} message={alertDetail?.message} color={alertDetail?.color} onCancelPressed={() => { setShowAlert(false) }} />
            <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={styles.maincontent}>
                <View style={styles.container}>
                    <Image source={require("../../assets/oneapp-logo1.png")} resizeMode={'contain'} style={styles.image} />
                    <View style={styles.subcontainer}>
                        <Text style={styles.loginHeading}>{Languages.pa_signup_screen_h}</Text>
                        <View style={styles.inputContainer}>
                            <FontAwesome5 name={"user-alt"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={Languages.pa_signup_name}
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
                                placeholder={Languages.pa_signup_email}
                                keyboardType={"email-address"}
                                autoCapitalize='none'
                                placeholderTextColor={Colors.PrimaryColor}
                                value={email}
                                onChangeText={(text) => { setEmail(text), setEmailValidation("") }}

                            />
                        </View>
                        {emailValidation && <ErrorMessage error={emailValidation} />}
                        {/* <View style={{flex:1,flexDirection:"row",marginHorizontal:5,marginVertical:5}}>
                                <CountryPickerModal
                                    countryCode={countryCode}
                                    setCountryCode={setCountryCode}
                                    country={country}
                                    setCountry={setCountry}
                                    setCountryValidation={setCountryValidation}
                                />
                           
                        </View>
                        {countryValidation && <ErrorMessage error={countryValidation}/>} */}

                        <View style={styles.rowcontainer}>
                            <View style={{ flex: 1, height: 50 }}>
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
                                        placeholder={Languages.pa_signup_city}
                                        placeholderTextColor={Colors.PrimaryColor}
                                        value={city}
                                        onChangeText={(text) => { setCity(text), setCityValidation("") }}

                                    />
                                </View>
                                {cityValidation && <ErrorMessage error={cityValidation} />}

                            </View>

                        </View>

                        <View style={styles.rowcontainer}>
                            <View style={{ flex: 1, height: 50 }}>
                                <View style={{ ...styles.rowinputcontainer, marginRight: 5 }}>
                                    <FontAwesome5 name={"id-card"} color={Colors.PrimaryColor} style={{ marginLeft: 5 }} />
                                    <TextInput
                                        style={styles.rowtextInput}
                                        placeholder={Languages.pa_signup_passport}
                                        placeholderTextColor={Colors.PrimaryColor}
                                        value={passport}
                                        onChangeText={(text) => { setPassport(text), setPassportValidation("") }}

                                    />
                                </View>
                                {passportValidation && <ErrorMessage error={passportValidation} />}

                            </View>

                            <View style={{ flex: 1 }}>
                                <View style={{ ...styles.rowinputcontainer, marginLeft: 5, height: 50, flex: 0 }}>
                                    <FontAwesome5 name={"user-alt"} color={Colors.PrimaryColor} style={{ marginLeft: 5 }} />
                                    <TextInput
                                        style={styles.rowtextInput}
                                        placeholder={Languages.pa_signup_age}
                                        placeholderTextColor={Colors.PrimaryColor}
                                        value={age}
                                        keyboardType={"numeric"}
                                        onChangeText={(text) => { setAge(text), setAgeValidation("") }}
                                    />
                                </View>
                                {ageValidation && <ErrorMessage error={ageValidation} />}

                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <FontAwesome5 name={"phone-alt"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={Languages.pa_signup_phone}
                                keyboardType={"numeric"}
                                placeholderTextColor={Colors.PrimaryColor}
                                value={phone}
                                onChangeText={(text) => { setPhone(text), setPhoneValidation("") }}

                            />
                        </View>
                        {phoneValidation && <ErrorMessage error={phoneValidation} />}


                        <View style={{ ...styles.inputContainer, marginHorizontal: 20 }}>
                            <FontAwesome5 name={"lock"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={Languages.pa_signup_password}
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
                            <Text style={styles.btntext}>{Languages.pa_signup_btn_txt}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate("BusinessAccountSignup") }} style={styles.btn}>
                            <Text style={styles.btntext}>{Languages.pa_signup_ba_btn_txt}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PersonelAccountSignup

