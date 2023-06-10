import React, { useEffect, useState, useContext } from 'react'
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
import { RootContext } from '../../components/ContextApi/ContextApi';
import { CarServices } from '../../services/carServices';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const EditCarRentalProfile = ({ route }) => {

    const navigation = useNavigation()
    const { user, setUser } = useContext(RootContext)
    const data = route?.params?.userData;

    const [loading, setLoading] = useState(false)

    const [name, setName] = useState(data?.agent_name ?? "")
    const [city, setCity] = useState(data?.city ?? "")
    const [age, setAge] = useState("")
    const [phone, setPhone] = useState(data?.phone ?? "")
    const [password, setPassword] = useState(data?.password ?? "")
    const [currency, setCurrency] = useState(data?.currency ?? "")

    const [country, setCountry] = useState(data?.country ?? "")
    const [countryCode, setCountryCode] = useState(data?.country_code ?? '')
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [countryValidation, setCountryValidation] = useState("")
    const [categoryValidation, setCategoryValidation] = useState("")

    const [nameValidation, setNameValidation] = useState("")
    const [passwordValidation, setPasswordValidation] = useState("")
    const [emailValidation, setEmailValidation] = useState("")
    const [ageValidation, setAgeValidation] = useState("")
    const [imageListValidation, setImageListValidation] = useState("")

    const [agencyName, setAgencyName] = useState(data?.agency_name ?? "")
    const [agencyAddress, setAgencyAddress] = useState(data?.agency_address ?? "")
    const [agencyIntroduction, setAgencyIntroduction] = useState(data?.brief_introduction ?? "")
    const [numberOfCars, setNumberOfCars] = useState(data?.number_of_cars ?? "")
    const [agencyImages, setAgencyImages] = useState({ showAgencyImage: data?.fleet_image_url?.length > 0 ? true : false, AgencyImagesList: data?.fleet_image_url ?? [], AgencyImage: "", AgencyImageValue: "" })

    const [profilePictureValidation, setProfilePictureValidation] = useState("")
    const [agencyNameValidation, setAgencyNameValidation] = useState("")
    const [agencyAddressValidation, setAgencyAddressValidation] = useState("")
    const [agencyImageValidation, setAgencyImageValidation] = useState("")
    const [numberOfCarsValidation, setNumberOfCarsValidation] = useState("")
    const [agencyIntroductionValidation, setAgencyIntroductionValidation] = useState("")

    const PickImage = async () => {
        await ImagePicker.openPicker({
            cropping: false
        }).then(async image => {
            const { path } = image;
            setAgencyImages({ ...agencyImages, AgencyImagesList: [...agencyImages?.AgencyImagesList, { id: agencyImages?.AgencyImagesList?.length + 1, url: path }], AgencyImageValue: "" })
        });
    }
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

        if (name == "") setNameValidation("Required*")
        else if (country == "") setCountryValidation("Required*")
        else if (password == "") setPasswordValidation("Required*")
        else if (agencyName == "") setAgencyNameValidation("Required*")
        else if (agencyAddress == "") setAgencyAddressValidation("Required*")
        else if (numberOfCars == "") setNumberOfCarsValidation("Required*")
        else if (agencyIntroduction == "") setAgencyIntroductionValidation("Required*")
        else {
            setLoading(true)

            const ImageList = agencyImages?.AgencyImagesList

            for (let i = 0; i < ImageList?.length; i++) {
                const path = ImageList[i]?.url
                if (path?.includes("http")) {
                    console.log("Path====", path)
                }
                else {
                    const filename = new Date().getTime() + path.substring(path.lastIndexOf('/') + 1);
                    console.log("file", filename)
                    const reference = storage().ref(filename);
                    await reference.putFile(path);
                    const imageUrl = await storage().ref(filename).getDownloadURL();
                    console.log("imageUrl", imageUrl)
                    ImageList[i] = { id: i + 1, url: imageUrl }
                    console.log("Image List==", ImageList)
                }
            }
            const carRentalBody = {
                "car_agent_code": data?.car_agent_code,
                "agent_name": name,
                "agency_name": agencyName,
                "agency_image_url": ImageList[0],
                "fleet_image_url": ImageList,
                "agency_start_date": new Date(),
                "brief_introduction": agencyIntroduction,
                "number_of_cars": numberOfCars,
                "country": country,
                "country_code": countryCode,
                "city": city,
                "agency_address": agencyAddress,
                "phone": phone,
                "email": data?.email,
                "password": password,
                "registration_date": new Date(),
                "admin_approved": false,
                "admin_remarks": "",
                "log_last_login": new Date()
            }
            console.log(carRentalBody)

            try {


                const response = await CarServices.Edit_Profile(carRentalBody)
                if (response) {
                    console.log("Taxi response: ", response)
                    setLoading(false)
                    setUser(response?.data)
                    navigation.goBack()
                }

            } catch (error) {
                setLoading(false)
                alert(error?.response?.data)
                console.log(error)

            }
        }


    }

    const [agencyDate, setAgencyDate] = useState(new Date(data?.agency_start_date))
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
                <ScrollView contentContainerStyle={{ marginVertical: 30 }}>
                    <Text style={styles.loginHeading}>Car Rental Agency</Text>
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
                        <View style={{ ...styles.rowinputcontainer }}>
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
                        <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
                        <TextInput
                            style={styles.textInput}
                            placeholder={"Agency Name"}
                            placeholderTextColor={Colors.PrimaryColor}
                            value={agencyName}
                            onChangeText={(text) => { setAgencyName(text) }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
                        <TextInput
                            style={styles.textInput}
                            placeholder={"Agency Address"}
                            placeholderTextColor={Colors.PrimaryColor}
                            value={agencyAddress}
                            onChangeText={(text) => { setAgencyAddress(text) }}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
                        <TextInput
                            style={styles.textInput}
                            placeholder={"Number of Cars"}
                            placeholderTextColor={Colors.PrimaryColor}
                            value={numberOfCars}
                            onChangeText={(text) => { setNumberOfCars(text) }}
                        />
                    </View>

                    <View style={styles.descriptionbox}>
                        <MaterialIcons name={"description"} size={15} color={Colors.PrimaryColor} style={styles.descriptionicon} />
                        <TextInput
                            style={styles.textbox}
                            placeholder={"Brief Introduction"}
                            underlineColorAndroid="transparent"
                            multiline={true}
                            numberOfLines={8}
                            placeholderTextColor={Colors.PrimaryColor}
                            value={agencyIntroduction}
                            onChangeText={(text) => { setAgencyIntroduction(text) }}

                        />
                    </View>
                    {/* ==================Car Rent Image=================== */}
                    {/* <View style={styles.inputContainer}>
                        <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
                        <TextInput
                            style={styles.textInput}
                            placeholder={"Enter Images Url"}
                            placeholderTextColor={Colors.PrimaryColor}
                            value={agencyImages?.AgencyImageValue}
                            onChangeText={(text) => { setAgencyImages({ ...agencyImages, AgencyImage: text, AgencyImageValue: text }) }}

                        />
                    </View> */}

                    <TouchableOpacity onPress={() => { PickImage() }} style={styles.loadImageBtn}>
                        <Text style={{ color: Colors.WhiteColor }}>Select Image from Gallery</Text>
                    </TouchableOpacity>

                    <View style={{ flex: 1 }}>


                        <DraggableFlatList

                            data={agencyImages?.AgencyImagesList}
                            onDragEnd={({ data }) => setAgencyImages({ ...agencyImages, AgencyImagesList: data })}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                        />

                    </View>
                    <View style={{ ...styles.inputContainer, marginHorizontal: 15 }}>
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
                    <View style={styles.datecontainer}>
                        <FontAwesome5 name={"calendar-alt"} size={15} color={Colors.PrimaryColor} />
                        <TouchableOpacity style={styles.datebtn} onPress={() => { setShowDate(true) }}>
                            {showAgencyPlaceholder == true ? <Text style={styles.datetext}>Agency Start Date</Text> : <Text style={styles.datetext}>{moment(agencyDate).format('ll')}</Text>}
                            {showDate && <DateTimePicker
                                value={agencyDate}
                                onChange={handleDate}
                            />
                            }
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => { Submit() }} style={{ ...styles.btn, marginBottom: 50 }}>
                        <Text style={styles.btntext}>Save</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default EditCarRentalProfile