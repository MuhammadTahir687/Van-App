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


const AddHotelRooms = ({ route, navigation }) => {

    const roomsData = route?.params?.roomsData;
    const { user } = useContext(RootContext)
    const [loading, setLoading] = useState(false)


    const [roomName, setRoomName] = useState(roomsData?.room_name ?? "")
    const [roomType, setRoomType] = useState(roomsData?.room_type ?? "")
    const [currency, setCurrency] = useState(roomsData?.currency ?? "")
    const [roomPrice, setRoomPrice] = useState(roomsData?.unit_price ?? "")
    const [roomDescription, setRoomDescription] = useState(roomsData?.room_description ?? "")

    const [image, setImage] = useState(roomsData?.room_image_url ?? "")
    const [showImage, setShowImage] = useState(true)

    const [showDate, setShowDate] = useState(false)
    const [roomAvailableDate, setRoomAvailableDate] = useState(roomsData?.available_on_date ? new Date(roomsData?.available_on_date) : new Date())
    const [showRoomDatePlaceholder, setShowRoomDatePlaceholder] = useState(roomsData?.available_on_date ? false : true)



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
        else if (image == "") setRoomImageValidation("Required*")
        else if (currency == "") setRoomTypeValidation("Required*")
        else if (roomPrice == "") setRoomPriceValidation("Required*")
        else if (roomDescription == "") setRoomDescriptionValidation("Required*")
        else if (roomAvailableDate == "") setRoomAvailableDateValidation("Required*")
        else {

            const body = {
                "manager_code": user?.manager_code,
                "room_code": roomsData ? roomsData?.room_code : new Date(),
                "room_type": roomType,
                "room_name": roomName,
                "room_image_url": image,
                "room_description": roomDescription,
                "currency": currency,
                "unit_price": roomPrice,
                "available_on_date": roomAvailableDate,
                "log_last_edits": new Date(),
                "admin_remarks": ""
            }

            console.log("Body=================", body)
            setLoading(true)
            try {

                const response = roomsData ? await HotelServices?.Edit_HotelRooms(body) : await HotelServices.Add_HotelRooms(body)
                if (response) {
                    console.log("Response==============", response?.data)
                    setLoading(false)
                    navigation.navigate("HotelRooms")

                }
            } catch (error) {
                setLoading(false)
                alert(error?.response?.data)

            }
        }
    }



    return (
        <SafeAreaView style={styles.maincontainer}>
            <Loader loading={loading} setLoading={setLoading} />
            <ScrollView contentContainerStyle={{ marginVertical: 20 }}>
                <Text style={styles.loginHeading}>{roomsData ? "Edit Rooms" : "Add  Rooms"}</Text>

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
                        style={{ ...styles.textInput, paddingRight: 12 }}
                        placeholder={"Enter Image Url"}
                        placeholderTextColor={Colors.PrimaryColor}
                        value={image}
                        onChangeText={(text) => { setImage(text), setRoomImageValidation("") }}

                    />
                </View>
                {roomImageValidation && <ErrorMessage error={roomImageValidation} />}

                <TouchableOpacity onPress={() => { setShowImage(true) }} style={styles.loadImageBtn}>
                    <Text style={{ color: Colors.WhiteColor }}>Load Image</Text>
                </TouchableOpacity>
                {showImage == true && image != "" &&
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.roomImage} />
                    </View>}
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

export default AddHotelRooms
