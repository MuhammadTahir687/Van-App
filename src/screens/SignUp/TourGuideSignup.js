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
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';


const TourGuideSignup = () => {

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

    const [tripImages, setTripImages] = useState({ showTripImage: false, tripImagesList: [], tripImage: "", tripImageValue: "" })
    const Submit = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (name == "") setNameValidation("Required*")
        else if (email == "") setEmailValidation("Required*")
        else if (reg.test(email) == false) setEmailValidation("Enter a valid email address")
        else if (country == "") setCountryValidation("Required*")
        else if (password == "") setPasswordValidation("Required*")
        else {
            setLoading(true)
            const ImageList = []
            for (let i = 0; i < tripImages?.tripImagesList?.length; i++) {
                const path = tripImages?.tripImagesList[i]?.url
                const filename = new Date().getTime() + path.substring(path.lastIndexOf('/') + 1);
                console.log("file", filename)
                const reference = storage().ref(filename);
                await reference.putFile(path);
                const imageUrl = await storage().ref(filename).getDownloadURL();
                ImageList.push({ id: ImageList?.length + 1, url: imageUrl });
            }

            const body = {
                "guide_code": "G-" + new Date().getTime(),
                "guide_name": name,
                "profile_image_url": ImageList[0] ?? [],
                "trips_view_url": ImageList,
                "age_years": age,
                "country": country,
                "country_code": countryCode,
                "city": city,
                "phone": phone,
                "email": email,
                "password": password,
                "registration_date": new Date(),
                "admin_approved": false,
                "admin_remarks": "",
                "log_last_login": new Date(),
            }
            console.log(body)

            try {


                const response = await AuthServices.TG_Register(body)
                if (response) {
                    console.log("Tour Guide response: ", response)
                    setLoading(false)
                    alert("Tour Guide Registered Successfully")
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
        if (!tripImages?.tripImage == "") {
            setTripImages({ ...tripImages, tripImagesList: [...tripImages?.tripImagesList, { id: tripImages?.tripImagesList?.length + 1, url: tripImages?.tripImage }], tripImageValue: "" })
        }
    }

    const RemoveHotelImage = (item) => {
        const filterImages = tripImages?.tripImagesList?.filter(image => image?.id != item?.id)
        setTripImages({ ...tripImages, tripImagesList: filterImages })
    }
    return (
        <SafeAreaView style={styles.maincontainer}>
            <Loader loading={loading} setLoading={setLoading} />
            <ScrollView nestedScrollEnabled={true} style={{ flexGrow: 1 }} contentContainerStyle={styles.maincontent}>
                <View style={styles.container}>
                    <Image source={require("../../assets/oneapp-logo1.png")} resizeMode="contain" style={styles.image} />
                    <View style={styles.subcontainer}>
                        <Text style={styles.loginHeading}>{Languages?.ba_signup_TG_heading}</Text>
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
                                    placeholder={Languages?.ba_signup_age}
                                    keyboardType='numeric'
                                    placeholderTextColor={Colors.PrimaryColor}
                                    value={age}
                                    onChangeText={(text) => { setAge(text) }}

                                />
                            </View>

                        </View>


                        {/* ==================Trip Image=================== */}
                        {/* <View style={styles.inputContainer}>
                            <FontAwesome5 name={"globe-americas"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={Languages?.ba_signup_image}
                                placeholderTextColor={Colors.PrimaryColor}
                                value={tripImages?.tripImageValue}
                                onChangeText={(text) => { setTripImages({ ...tripImages, tripImage: text, tripImageValue: text }) }}

                            />
                        </View>
                        {imageListValidation && <ErrorMessage error={imageListValidation} />} */}

                        <TouchableOpacity onPress={() => { PickImage() }} style={styles.loadImageBtn}>
                            <Text style={{ color: Colors.WhiteColor }}>{Languages?.ba_signup_load_image}</Text>
                        </TouchableOpacity>

                        <View style={styles.imageContainer}>
                            {tripImages?.tripImagesList?.length > 0 &&
                                tripImages?.tripImagesList?.map((item, index) => (
                                    <View key={index}>
                                        <TouchableOpacity onPress={() => { RemoveHotelImage(item) }} style={styles.removeImageIcon}>
                                            <Ionicons name={"close"} size={15} style={styles.closeIcon} />
                                        </TouchableOpacity>
                                        <Image source={{ uri: item?.url }} style={styles.hotelImages} />
                                    </View>

                                ))
                            }
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

export default TourGuideSignup