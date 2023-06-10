import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import { styles } from './style';
import { Colors } from '../../constants/Colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
import { RootContext } from '../../components/ContextApi/ContextApi';
import { HotelServices } from '../../services/hotelServices';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const EditHotelManagerProfile = ({ route }) => {

    const navigation = useNavigation();

    const { user, setUser } = useContext(RootContext)

    const userData = route?.params?.userData;

    const [loading, setLoading] = useState(false)

    const [country, setCountry] = useState(userData?.country ?? "")
    const [countryCode, setCountryCode] = useState(userData?.country_code ?? '')
    const [countryValidation, setCountryValidation] = useState("")

    const [name, setName] = useState(userData?.manager_name ?? "")
    const [email, setEmail] = useState(userData?.email ?? "")
    const [city, setCity] = useState(userData?.city ?? "")
    const [phone, setPhone] = useState(userData?.phone ?? "")
    const [password, setPassword] = useState(userData?.password ?? "")
    const [image, setImage] = useState(userData?.taxi_image_url ?? "")
    const [showImage, setShowImage] = useState(userData?.taxi_image_url ? true : false)
    const [currency, setCurrency] = useState(userData?.currency ?? "")

    const [nameValidation, setNameValidation] = useState("")
    const [emailValidation, setEmailValidation] = useState("")
    const [passwordValidation, setPasswordValidation] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [imageValidation, setImageValidation] = useState("")



    // Hotel

    const [hotelName, setHotelName] = useState(userData?.hotel_name ?? '')
    const [hotelAddress, setHotelAddress] = useState(userData?.hotel_address ?? '')
    const [hotelRooms, setHotelRooms] = useState(userData?.number_of_rooms ?? '')
    const [showDate, setShowDate] = useState(false)
    const [hotelDate, setHotelDate] = useState(new Date(userData?.foundation_date))
    const [showHotelPlaceholder, setShowHotelPlaceholder] = useState(false)
    const [amenitiesOpen, setAmenitiesOpen] = useState(false)
    const [amenities, setamenities] = useState(userData?.amenities ?? [])
    const [hotelDescription, setHotelDescription] = useState(userData?.brief_introduction ?? '')
    const [hotelImages, setHotelImages] = useState({ showHotelImage: userData?.hotel_view_url ? true : false, hotelImagesList: userData?.hotel_view_url ?? [], hotelImage: "", hotelImageValue: "" })

    const [hotelNameValidation, setHotelNameValidation] = useState("")
    const [hotelAddressValidation, setHotelAddressValidation] = useState("")
    const [hotelImagesValidation, setHotelImagesValidation] = useState("")

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

    const PickImage = async () => {
        await ImagePicker.openPicker({
            cropping: false
        }).then(async image => {
            const { path } = image;
            setHotelImages({ ...hotelImages, hotelImagesList: [...hotelImages?.hotelImagesList, { id: hotelImages?.hotelImagesList?.length + 1, url: path }], hotelImageValue: "" })
        });
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



    const Submit = async () => {
        if (name == "") setNameValidation("Required*")
        else if (password == "") setPasswordValidation("Required*")
        else if (country == "") setCountryValidation("Required*")
        // else if (!hotelImages?.hotelImagesList?.length > 0) setHotelImagesValidation("Required*")
        else {
            setLoading(true)

            const ImageList = hotelImages?.hotelImagesList

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





            const managerCode = user?.manager_code;

            const body = {
                "manager_name": name,
                "hotel_name": hotelName,
                "hotel_image_url": ImageList[0],
                "hotel_view_url": ImageList,
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
                "amenities": amenities
            }

            try {


                const response = await HotelServices.Edit_HotelManagersProfile(managerCode, body)
                if (response) {
                    console.log("response: ", response?.data)
                    setLoading(false)
                    setUser(response?.data)
                    navigation.goBack()
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
                {nameValidation && <ErrorMessage margin={10} error={nameValidation} />}

                <View style={{ ...styles.inputContainer }}>
                    <FontAwesome5 name={"lock"} color={Colors.PrimaryColor} />
                    <TextInput
                        style={styles.textInput}
                        placeholder={Languages.ba_signup_password}
                        secureTextEntry={passwordVisible}
                        placeholderTextColor={Colors.PrimaryColor}
                        value={password}
                        onChangeText={(text) => { setPassword(text), setPasswordValidation("") }}

                    />
                    <TouchableOpacity onPress={() => { setPasswordVisible(!passwordVisible) }} >
                        <FontAwesome5 name={passwordVisible ? "eye-slash" : "eye"} color={Colors.PrimaryColor} />
                    </TouchableOpacity>

                </View>
                {passwordValidation && <ErrorMessage margin={10} error={passwordValidation} />}


                <View style={styles.rowcontainer}>
                    <View style={{ flex: 1 }}>
                        <CountryPickerModal
                            countryCode={countryCode}
                            setCountryCode={setCountryCode}
                            country={country}
                            setCountry={setCountry}
                            setCountryValidation={setCountryValidation}
                        />
                        {countryValidation && <ErrorMessage margin={10} error={countryValidation} />}
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

                    {/* <View style={styles.rowinputcontainer}>
                        <FontAwesome5 name={"user-alt"} color={Colors.PrimaryColor} style={{ marginLeft: 5 }} />
                        <TextInput
                            style={styles.rowtextInput}
                            placeholder={Languages.ba_signup_age}
                            placeholderTextColor={Colors.PrimaryColor}
                            value={age}
                            keyboardType={"numeric"}
                            onChangeText={(text) => { setAge(text) }}
                        />
                    </View> */}

                </View>

                <View style={styles.inputContainer}>
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
                {hotelNameValidation && <ErrorMessage margin={10} error={hotelNameValidation} />}
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
                {hotelAddressValidation && <ErrorMessage margin={10} error={hotelAddressValidation} />}

                {/* ==================Hotel Image=================== */}
                {/* <View style={styles.inputContainer}>
                    <FontAwesome5 name={"globe-americas"} color={Colors.PrimaryColor} />
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Enter Image Url"}
                        placeholderTextColor={Colors.PrimaryColor}
                        value={hotelImages?.hotelImageValue}
                        onChangeText={(text) => { setHotelImages({ ...hotelImages, hotelImage: text, hotelImageValue: text }) }}

                    />
                </View>
                {hotelImagesValidation && <ErrorMessage margin={10} error={hotelImagesValidation} />} */}
                <TouchableOpacity onPress={() => { PickImage() }} style={styles.loadImageBtn}>
                    <Text style={{ color: Colors.WhiteColor }}>Select Image from Gallery</Text>
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

                <TouchableOpacity onPress={() => { Submit() }} style={{ ...styles.btn, marginBottom: 50 }}>
                    <Text style={styles.btntext}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditHotelManagerProfile

