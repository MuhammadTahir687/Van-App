import React, { useContext, useEffect, useState } from 'react'
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
import { HotelServices } from '../../services/hotelServices';
import { RootContext } from '../../components/ContextApi/ContextApi';
import { CarServices } from '../../services/carServices';
import { TripServices } from '../../services/tripServices';

const AddTripPlans = ({ route, navigation }) => {


    const data = route?.params?.tripData;
    console.log(data?._id)
    const [loading, setLoading] = useState(false)
    const [tripName, setTripName] = useState(data?.trip_name ?? "")
    const [image, setImage] = useState(data?.place_image_url ?? "")
    const [showImage, setShowImage] = useState(data?.place_image_url ? true : false)
    const [currency, setCurrency] = useState(data?.currency ?? "")
    const [country, setCountry] = useState(data?.country ?? "")
    const [countryCode, setCountryCode] = useState(data?.country_code ?? '')
    const [city, setCity] = useState(data?.city ?? "")
    const [tripDescription, setTripDescription] = useState(data?.trip_description ?? "")
    const [visitorsLimit, setVisitorsLimit] = useState(data?.visitors_limit ?? "")
    const [meetingPlace, setMeetingPlace] = useState(data?.meeting_place ?? "")
    const [tripFee, setTripFee] = useState(data?.trip_fee ?? "")

    const [tripNameValidation, setTripNameValidation] = useState("")
    const [tripFeeValidation, setTripFeeValidation] = useState("")
    const [imageValidation, setImageValidation] = useState("")
    const [currencyValidation, setCurrencyValidation] = useState("")
    const [countryValidation, setCountryValidation] = useState("")
    const [cityValidation, setCityValidation] = useState("")
    const [tripDescritionValidation, setTripDescriptionValidation] = useState("")
    const [visitorLimitValidation, setVisitorLimitValidation] = useState("")
    const [meetingPlaceValidation, setMeetingPlaceValidation] = useState("")


    const Submit = async () => {
        if (tripName == "") setTripNameValidation("Required*")
        else if (image == "") setImageValidation("Required*")
        else if (country == "") setCountryValidation("Required*")
        else if (visitorsLimit == "") setVisitorLimitValidation("Required*")
        else if (meetingPlace == "") setMeetingPlaceValidation("Required*")
        else if (currency == "") setCurrencyValidation("Required*")
        else if (tripFee == "") setTripFeeValidation("Required*")
        else if (tripDescription == "") setTripDescriptionValidation("Required*")

        else {

            const body = {
                "guide_code": data ? data?.guide_code : new Date()?.getTime(),
                "trip_name": tripName,
                "trip_time": tripDate,
                "country": country,
                "country_code": countryCode,
                "city": city,
                "meeting_place": meetingPlace,
                "visitors_limit": visitorsLimit,
                "place_image_url": image,
                "trip_description": tripDescription,
                "currency": currency,
                "trip_fee": tripFee,
                "admin_approved": false,
                "admin_remarks": "",
                "log_last_edits": new Date()
            }


            console.log("Body=================", body)
            setLoading(true)
            try {

                const response = data ? await TripServices?.Edit_TripPlan(data?._id, body) : await TripServices?.Add_TripPlan(body)
                if (response) {
                    console.log("Response==============", response?.data)
                    setLoading(false)
                    navigation.navigate("TourGuidePlans")

                }
            } catch (error) {
                setLoading(false)
                alert(JSON.stringify(error?.response?.data))

            }
        }
    }
    const [tripDate, setTripDate] = useState(new Date())
    const [showDate, setShowDate] = useState(false)
    const [showtripDatePlaceholder, setShowtripDatePlaceholder] = useState(false)

    const handleDate = (event, selectedDate) => {
        if (selectedDate) {
            const currentDate = selectedDate;
            setShowDate(false)
            setTripDate(currentDate);
            setShowtripDatePlaceholder(false)
            console.log("Date ==", currentDate)
        }
        else {
            setShowDate(false)
            setShowtripDatePlaceholder(true)
            setTripDate(new Date())
        }
    }

    return (
        <SafeAreaView style={styles.maincontainer}>
            <Loader loading={loading} setLoading={setLoading} />
            <ScrollView contentContainerStyle={{ marginVertical: 20 }}>
                <Text style={styles.loginHeading}>Add Trip Plan</Text>

                <View style={styles.inputContainer}>
                    <FontAwesome5 name={"mountain"} color={Colors.PrimaryColor} />
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Trip Name"}
                        placeholderTextColor={Colors.PrimaryColor}
                        value={tripName}
                        onChangeText={(text) => { setTripName(text), setTripNameValidation("") }}
                    />
                </View>
                {tripNameValidation && <ErrorMessage margin={10} error={tripNameValidation} />}



                <View style={styles.inputContainer}>
                    <FontAwesome5 name={"image"} color={Colors.PrimaryColor} />
                    <TextInput
                        style={{ ...styles.textInput, paddingRight: 12 }}
                        placeholder={"Enter Image Url"}
                        placeholderTextColor={Colors.PrimaryColor}
                        value={image}
                        onChangeText={(text) => { setImage(text), setImageValidation("") }}

                    />
                </View>
                {imageValidation && <ErrorMessage error={imageValidation} />}

                <TouchableOpacity onPress={() => { setShowImage(true) }} style={styles.loadImageBtn}>
                    <Text style={{ color: Colors.WhiteColor }}>Load Image</Text>
                </TouchableOpacity>
                {showImage == true && image != "" &&
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.roomImage} />
                    </View>}

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
                                onChangeText={(text) => { setCity(text), setCityValidation("") }}

                            />
                        </View>
                        {cityValidation && <ErrorMessage error={cityValidation} />}

                    </View>

                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome5 name={"mountain"} color={Colors.PrimaryColor} />
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Visitors Limit"}
                        placeholderTextColor={Colors.PrimaryColor}
                        keyboardType="numeric"
                        value={visitorsLimit}
                        onChangeText={(text) => { setVisitorsLimit(text), setVisitorLimitValidation("") }}

                    />
                </View>
                {visitorLimitValidation && <ErrorMessage margin={10} error={visitorLimitValidation} />}
                <View style={styles.inputContainer}>
                    <FontAwesome5 name={"mountain"} color={Colors.PrimaryColor} />
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Meeting Place"}
                        placeholderTextColor={Colors.PrimaryColor}
                        value={meetingPlace}
                        onChangeText={(text) => { setMeetingPlace(text), setMeetingPlaceValidation("") }}

                    />
                </View>
                {meetingPlaceValidation && <ErrorMessage margin={10} error={meetingPlaceValidation} />}
                <View style={styles.inputContainer}>
                    <FontAwesome5 name={"mountain"} color={Colors.PrimaryColor} />
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Currency"}
                        placeholderTextColor={Colors.PrimaryColor}
                        value={currency}
                        onChangeText={(text) => { setCurrency(text), setCurrencyValidation("") }}

                    />
                </View>
                {currencyValidation && <ErrorMessage margin={10} error={currencyValidation} />}

                <View style={styles.inputContainer}>
                    <FontAwesome5 name={"mountain"} color={Colors.PrimaryColor} />
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Trip Fee"}
                        placeholderTextColor={Colors.PrimaryColor}
                        keyboardType="numeric"
                        value={tripFee}
                        onChangeText={(text) => { setTripFee(text), setTripFeeValidation("") }}

                    />
                </View>
                {tripFeeValidation && <ErrorMessage margin={10} error={tripFeeValidation} />}


                <View style={styles.descriptionbox}>
                    <MaterialIcons name={"description"} size={15} color={Colors.PrimaryColor} style={styles.descriptionicon} />
                    <TextInput
                        style={styles.textbox}
                        placeholder={"Trip Description"}
                        underlineColorAndroid="transparent"
                        multiline={true}
                        numberOfLines={8}
                        placeholderTextColor={Colors.PrimaryColor}
                        value={tripDescription}
                        onChangeText={(text) => { setTripDescription(text), setTripDescriptionValidation("") }}

                    />
                </View>
                {tripDescritionValidation && <ErrorMessage margin={10} error={tripDescritionValidation} />}
                <View style={styles.datecontainer}>
                    <FontAwesome5 name={"calendar-alt"} size={15} color={Colors.PrimaryColor} />
                    <TouchableOpacity style={styles.datebtn} onPress={() => { setShowDate(true) }}>
                        {showtripDatePlaceholder == true ? <Text style={styles.datetext}>Trip Start Date</Text> : <Text style={styles.datetext}>{moment(tripDate).format('ll')}</Text>}
                        {showDate && <DateTimePicker
                            value={tripDate}
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
    )
}

export default AddTripPlans
