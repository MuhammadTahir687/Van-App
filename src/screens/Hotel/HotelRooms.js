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
const HotelRooms = () => {

    const [loading, setLoading] = useState(false)

    const [roomName, setRoomName] = useState("")
    const [roomType, setRoomType] = useState("")
    const [currency, setCurrency] = useState("")
    const [roomPrice, setRoomPrice] = useState("")
    const [roomDescription, setRoomDescription] = useState("")

    const [hotelImages, setHotelImages] = useState({ showHotelImage: false, hotelImagesList: [], hotelImage: "", hotelImageValue: "" })

    const [showDate, setShowDate] = useState(false)
    const [roomAvailableDate, setRoomAvailableDate] = useState(new Date())
    const [showRoomDatePlaceholder, setShowRoomDatePlaceholder] = useState(true)

    const [roomNameValidation, setRoomNameValidation] = useState("")
    const [roomTypeValidation, setRoomTypeValidation] = useState("")
    const [currencyValidation, setCurrencyValidation] = useState("")
    const [roomPriceValidation, setRoomPriceValidation] = useState("")
    const [roomAvailableDateValidation, setRoomAvailableDateValidation] = useState("")
    const [roomDescriptionValidation, setRoomDescriptionValidation] = useState("")
    const [roomImageValidation, setRoomImageValidation] = useState("")


    const handleDate = (event, selectedDate) => {
        if (selectedDate) {
            const currentDate = selectedDate;
            setShowDate(false)
            setRoomAvailableDate(currentDate);
            setShowRoomDatePlaceholder(false)
            console.log("Date ==", currentDate)
        }
        else {
            setShowDate(false)
            setShowRoomDatePlaceholder(true)
            setRoomAvailableDate(new Date())
        }
    }

    const Submit = async () => {
        if (roomName == "") setRoomNameValidation("Required*")
        else if (roomType == "") setRoomTypeValidation("Required*")
        else if (!hotelImages?.hotelImagesList.length > 0) setRoomImageValidation("Required*")
        else if (currency == "") setRoomTypeValidation("Required*")
        else if (roomPrice == "") setRoomPriceValidation("Required*")
        else if (roomDescription == "") setRoomDescriptionValidation("Required*")
        else if (roomAvailableDate == "") setRoomAvailableDateValidation("Required*")
        else {
            const body = {
                "manager_code": "HM-101",
                "room_code": "HR-101",
                "room_type": roomType,
                "room_name": roomName,
                "room_image_url": hotelImages?.hotelImagesList[0],
                "room_description": roomDescription,
                "currency": currency,
                "unit_price": roomPrice,
                "available_on_date": roomAvailableDate,
                "log_last_edits": new Date(),
                "admin_remarks": ""
            }
            console.log(body)
        }
    }



    return (
        <SafeAreaView style={styles.maincontainer}>
            <Loader loading={loading} setLoading={setLoading} />
            <ScrollView contentContainerStyle={{ marginVertical: 20 }}>
                <Text style={styles.loginHeading}>Add  Rooms</Text>

                <View style={styles.inputContainer}>
                    <MaterialIcons name={"meeting-room"} color={Colors.PrimaryColor} />
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Room Name"}
                        placeholderTextColor={Colors.PrimaryColor}
                        value={roomName}
                        onChangeText={(text) => { setRoomName(text), setRoomNameValidation("") }}
                    />
                </View>
                {roomNameValidation && <ErrorMessage margin={10} error={roomNameValidation} />}

                <View style={styles.inputContainer}>
                    <MaterialIcons name={"meeting-room"} color={Colors.PrimaryColor} />
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Room Type"}
                        placeholderTextColor={Colors.PrimaryColor}
                        value={roomType}
                        onChangeText={(text) => { setRoomType(text), setRoomTypeValidation("") }}
                    />
                </View>
                {roomTypeValidation && <ErrorMessage margin={10} error={roomTypeValidation} />}

                <View style={styles.inputContainer}>
                    <FontAwesome5 name={"globe-americas"} color={Colors.PrimaryColor} />
                    <TextInput
                        style={{ ...styles.textInput, paddingRight: 20 }}
                        placeholder={"Enter Image Url"}
                        placeholderTextColor={Colors.PrimaryColor}
                        value={hotelImages?.hotelImageValue}
                        onChangeText={(text) => { setHotelImages({ ...hotelImages, hotelImage: text, hotelImageValue: text }), setRoomImageValidation("") }}

                    />
                </View>
                {roomImageValidation && <ErrorMessage margin={10} error={roomImageValidation} />}

                <TouchableOpacity onPress={() => { setHotelImages({ ...hotelImages, hotelImagesList: [...hotelImages?.hotelImagesList, { id: hotelImages?.hotelImagesList?.length + 1, url: hotelImages?.hotelImage }], hotelImageValue: "" }) }} style={styles.imageLoadBtn}>
                    <Text style={{ color: Colors.WhiteColor }}>Load Image</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {hotelImages?.hotelImagesList?.length > 0 &&
                        hotelImages?.hotelImagesList?.map((item, index) => (
                            <>
                                {/* <TouchableOpacity onPress={() => { RemoveHotelImage(item) }} style={{ top: 15, zIndex: 10, left: 65 }}>
                                                    <Ionicons name={"close"} size={15} style={{ backgroundColor: "red", color: "white", borderRadius: 50 }} />
                                                </TouchableOpacity> */}
                                <Image source={{ uri: item?.url }} style={{ width: 50, height: 50, margin: 10, borderRadius: 10 }} />
                            </>

                        ))
                    }
                </View>
                <View style={styles.inputContainer}>
                    <MaterialIcons name={"meeting-room"} color={Colors.PrimaryColor} />
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
                    <MaterialIcons name={"meeting-room"} color={Colors.PrimaryColor} />
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Room Price"}
                        placeholderTextColor={Colors.PrimaryColor}
                        value={roomPrice}
                        keyboardType={'numeric'}
                        onChangeText={(text) => { setRoomPrice(text), setRoomPriceValidation("") }}

                    />
                </View>
                {roomPriceValidation && <ErrorMessage margin={10} error={roomPriceValidation} />}

                <View style={styles.descriptionbox}>
                    <MaterialIcons name={"description"} size={15} color={Colors.PrimaryColor} style={styles.descriptionicon} />
                    <TextInput
                        style={styles.textbox}
                        placeholder={"Room Description"}
                        underlineColorAndroid="transparent"
                        multiline={true}
                        numberOfLines={8}
                        placeholderTextColor={Colors.PrimaryColor}
                        value={roomDescription}
                        onChangeText={(text) => { setRoomDescription(text), setRoomDescriptionValidation("") }}

                    />
                </View>
                {roomDescriptionValidation && <ErrorMessage margin={10} error={roomDescriptionValidation} />}


                <View style={styles.datecontainer}>
                    <FontAwesome5 name={"calendar-alt"} size={15} color={Colors.PrimaryColor} />
                    <TouchableOpacity style={styles.datebtn} onPress={() => { setShowDate(true) }}>
                        {showRoomDatePlaceholder == true ? <Text style={styles.datetext}>Room Avaliable Date</Text> : <Text style={styles.datetext}>{moment(roomAvailableDate).format('ll')}</Text>}
                        {showDate && <DateTimePicker
                            value={roomAvailableDate}
                            onChange={handleDate}
                        />
                        }
                    </TouchableOpacity>
                </View>
                {roomAvailableDateValidation && <ErrorMessage margin={10} error={roomAvailableDateValidation} />}


                <TouchableOpacity onPress={() => { Submit() }} style={{ ...styles.btn, marginBottom: 50 }}>
                    <Text style={styles.btntext}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HotelRooms
