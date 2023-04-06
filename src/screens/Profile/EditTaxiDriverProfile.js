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

const EditTaxiDriverProfile = ({ route }) => {

    const navigation = useNavigation();

    const userData = route?.params?.userData;

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



    // Taxi

    const [taxiModel, setTaxiModel] = useState(userData?.taxi_model_name ?? "")
    const [taxihireRate, setTaxiHireRate] = useState(userData?.hire_rate?.toString() ?? "")
    const [taxiPlateNumber, settaxiPlateNumber] = useState(userData?.plate_no ?? "")
    const [taxiIntroduction, setTaxiIntroduction] = useState(userData?.brief_introduction ?? "")
    const [taxiModelValidation, setTaxiModelValidation] = useState("")
    const [taxiPlateNumberValidation, setTaxiPlateNumberValidation] = useState("")
    const [taxiHireRateValidation, setTaxiHireRateValidation] = useState("");
    const [currencyValidation, setCurrencyValidation] = useState("")




    const Submit = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (name == "") setNameValidation("Required*")
        else if (email == "") setEmailValidation("Required*")
        else if (reg.test(email) == false) setEmailValidation("Enter a valid email address")
        else if (country == "") setCountryValidation("Required*")
        else if (taxiModel == "") setTaxiModelValidation("Required*")
        else if (currency == "") setCurrencyValidation("Required*")
        else if (taxihireRate == "") setTaxiHireRateValidation("Required*")
        else if (taxiPlateNumber == "") setTaxiPlateNumberValidation("Required*")
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

            // try {

            //     setLoading(true)
            //     const taxiResponse = await TaxiServices.TaxiRegistration(taxi_body)
            //     if (taxiResponse) {
            //         console.log("Taxi response: ", taxiResponse)
            //         setLoading(false)
            //         navigation.replace("BusinessAccount")
            //     }


            // } catch (error) {
            //     setLoading(false)
            //     console.log(error)

            // }
        }


    }

    return (
        <SafeAreaView style={styles.maincontainer}>
            <Loader loading={loading} setLoading={setLoading} />
            <ScrollView contentContainerStyle={{ marginVertical: 20 }}>
                <Text style={styles.loginHeading}>Edit Profile</Text>

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
                        autoCapitalize='none'
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

                <View style={styles.inputContainer}>
                    <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
                    <TextInput
                        style={{ ...styles.textInput, paddingRight: 12 }}
                        placeholder={"Enter Image Url"}
                        placeholderTextColor={Colors.PrimaryColor}
                        value={image}
                        onChangeText={(text) => { setImage(text) }}

                    />
                </View>
                <TouchableOpacity onPress={() => { setShowImage(true) }} style={styles.imageBtn}>
                    <Text style={styles.imageBtnText}>Load Image</Text>
                </TouchableOpacity>
                {showImage == true && image != "" &&
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.taxiImage} />
                    </View>}
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


                <TouchableOpacity onPress={() => { Submit() }} style={{ ...styles.btn, marginBottom: 50 }}>
                    <Text style={styles.btntext}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditTaxiDriverProfile

