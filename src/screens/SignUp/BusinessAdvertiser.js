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

const BusinessAdvertiser = ({ navigation }) => {

    const [loading, setLoading] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [age, setAge] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [businessName, setBusinessName] = useState("")
    const [businessIntroduction, setBusinessIntroduction] = useState("")
    const [businessAddress, setBusinessAddress] = useState("")
    const [businessMessage, setBusinessMessage] = useState("")

    const [country, setCountry] = useState("")
    const [countryCode, setCountryCode] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [countryValidation, setCountryValidation] = useState("")

    const [nameValidation, setNameValidation] = useState("")
    const [passwordValidation, setPasswordValidation] = useState("")
    const [emailValidation, setEmailValidation] = useState("")
    const [businessNameValidation, setBusinessNameValidation] = useState("")
    const [businessIntroductionValidation, setBusinessIntroductionValidation] = useState("")
    const [businessMessageValidation, setBusinessMessageValidation] = useState("")

    const [showDate, setShowDate] = useState(false)
    const [businessDate, setBusinessDate] = useState(new Date())
    const [showBusinessPlaceholder, setShowBusinessPlaceholder] = useState(true)



    const Submit = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (name == "") setNameValidation("Required*")
        else if (email == "") setEmailValidation("Required*")
        else if (reg.test(email) == false) setEmailValidation("Enter a valid email address")
        else if (country == "") setCountryValidation("Required*")
        else if (businessName == "") setBusinessNameValidation("Required*")
        else if (businessIntroduction == "") setBusinessIntroductionValidation("Required*")
        else if (businessMessage == "") setBusinessMessageValidation("Required*")
        else if (password == "") setPasswordValidation("Required*")
        else {

            const body = {
                "biz_code": 'BA' + new Date().getTime(),
                "biz_name": businessName,
                "manager_name": name,
                "biz_start_date": businessDate,
                "biz_introduction": businessIntroduction,
                "country": country,
                "country_code": countryCode,
                "city": city,
                "biz_address": businessAddress,
                "phone": phone,
                "email": email,
                "password": password,
                "registration_date": new Date(),
                "biz_add_order": businessMessage,
                "admin_approved": false,
                "admin_remarks": "",
                "log_last_login": new Date()
            }
            console.log(body)

            try {

                setLoading(true)
                const response = await AuthServices.BA_Register(body)
                if (response) {
                    console.log("response: ", response)
                    setLoading(false)
                    alert("Business Advertiser Registered Successfully")
                    navigation.replace("BusinessAccount")
                }

            } catch (error) {
                setLoading(false)
                alert(error?.response?.data)
                console.log(error?.response?.data)

            }
        }


    }


    const handleDate = (event, selectedDate) => {
        if (selectedDate) {
            const currentDate = selectedDate;
            setShowDate(false)
            setBusinessDate(currentDate);
            setShowBusinessPlaceholder(false)
            console.log("Date ==", currentDate)
        }
        else {
            setShowDate(false)
            setShowBusinessPlaceholder(true)
            setBusinessDate(new Date())
        }
    }


    return (
        <SafeAreaView style={styles.maincontainer}>
            <Loader loading={loading} setLoading={setLoading} />
            <ScrollView nestedScrollEnabled={true} style={{ flexGrow: 1 }} contentContainerStyle={styles.maincontent}>
                <View style={styles.container}>
                    <Image source={require("../../assets/oneapp-logo1.png")} resizeMode="contain" style={styles.image} />
                    <View style={styles.subcontainer}>
                        <Text style={styles.loginHeading}>{Languages?.ba_signup_BA_heading}</Text>
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
                            <View style={styles.rowinputcontainer}>
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
                        </View>

                        <View style={styles.inputContainer}>
                            <FontAwesome5 name={"building"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={Languages?.ba_signup_BA_name}
                                placeholderTextColor={Colors.PrimaryColor}
                                value={businessName}
                                onChangeText={(text) => { setBusinessName(text), setBusinessNameValidation("") }}

                            />
                        </View>
                        {businessNameValidation && <ErrorMessage error={businessNameValidation} />}

                        <View style={styles.inputContainer}>
                            <FontAwesome5 name={"globe"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={Languages?.ba_signup_BA_address}
                                placeholderTextColor={Colors.PrimaryColor}
                                value={businessAddress}
                                onChangeText={(text) => { setBusinessAddress(text) }}

                            />
                        </View>

                        <View style={styles.datecontainer}>
                            <FontAwesome5 name={"calendar-alt"} size={15} color={Colors.PrimaryColor} />
                            <TouchableOpacity style={styles.datebtn} onPress={() => { setShowDate(true) }}>
                                {showBusinessPlaceholder == true ? <Text style={styles.datetext}>Business Start Date</Text> : <Text style={styles.datetext}>{moment(businessDate).format('ll')}</Text>}
                                {showDate && <DateTimePicker
                                    value={businessDate}
                                    onChange={handleDate}
                                />
                                }
                            </TouchableOpacity>
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
                                value={businessIntroduction}
                                onChangeText={(text) => { setBusinessIntroduction(text), setBusinessIntroductionValidation("") }}

                            />
                        </View>
                        {businessIntroductionValidation && <ErrorMessage error={businessIntroductionValidation} />}

                        <View style={styles.descriptionbox}>
                            <MaterialIcons name={"description"} size={15} color={Colors.PrimaryColor} style={styles.descriptionicon} />
                            <TextInput
                                style={styles.textbox}
                                placeholder={Languages?.ba_signup_BA_message}
                                underlineColorAndroid="transparent"
                                multiline={true}
                                numberOfLines={8}
                                placeholderTextColor={Colors.PrimaryColor}
                                value={businessMessage}
                                onChangeText={(text) => { setBusinessMessage(text), setBusinessMessageValidation("") }}

                            />
                        </View>
                        {businessMessageValidation && <ErrorMessage error={businessMessageValidation} />}

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

export default BusinessAdvertiser