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
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const AddCarRentalFleet = ({ navigation, route }) => {

    const { user } = useContext(RootContext)
    const data = route?.params?.data;
    const [carCode, setCarCode] = useState(data?.car_code ?? "")
    const [carName, setCarName] = useState(data?.car_name ?? "")
    const [image, setImage] = useState(data?.car_image_url ?? "")
    const [showImage, setShowImage] = useState(true)
    const [currency, setCurrency] = useState(data?.currency ?? "")
    const [briefIntroduction, setBriefIntroduction] = useState(data?.brief_introduction_model ?? "")
    const [plateNo, setPlateNo] = useState(data?.plate_no ?? "")
    const [hireRate, setHireRate] = useState(data?.hire_rate ?? "")

    const [carCodeValidation, setCarCodeValidation] = useState("")
    const [carNameValidation, setCarNameValidation] = useState("")
    const [imageValidation, setImageValidation] = useState("")
    const [currencyValidation, setCurrencyValidation] = useState("")
    const [briefIntroductionValidation, setBriefIntroductionValidation] = useState("")
    const [plateNoValidation, setPlateNoValidation] = useState("")
    const [hireRateValidation, setHireRateValidation] = useState("")

    const [loading, setLoading] = useState(false)


    const Submit = async () => {
        if (data && carCode == "") setCarCodeValidation("Required*")
        if (carName == "") setCarNameValidation("Required*")
        else if (image == "") setImageValidation("Required*")
        else if (plateNo == "") setPlateNoValidation("Required*")
        else if (currency == "") setRoomTypeValidation("Required*")
        else if (hireRate == "") setHireRateValidation("Required*")
        else if (briefIntroduction == "") setBriefIntroductionValidation("Required*")

        else {

            const body = {
                "car_agent_code": user?.car_agent_code,
                "car_code": data ? carCode : user?.car_agent_code + "-" + new Date().getTime(),
                "car_name": carName,
                "car_image_url": image,
                "brief_introduction_model": briefIntroduction,
                "currency": currency,
                "hire_rate": hireRate,
                "plate_no": plateNo,
                "status_ready": false,
                "registration_date": new Date(),
                "log_last_edits": new Date(),
                "admin_remarks": ""
            }

            console.log("Body=================", body)
            setLoading(true)
            try {

                const response = data ? await CarServices?.Edit_CarFleet(data?.car_code, body) : await CarServices?.Add_CarFleet(body)
                if (response) {
                    console.log("Response==============", response?.data)
                    setLoading(false)
                    navigation.navigate("CarRentalFleets")

                }
            } catch (error) {
                setLoading(false)
                alert(JSON.stringify(error?.response?.data))

            }
        }
    }

    return (
        <SafeAreaView style={styles.maincontainer}>
            <Loader loading={loading} setLoading={setLoading} />
            <ScrollView contentContainerStyle={{ marginVertical: 20 }}>
                <Text style={styles.loginHeading}>{data ? "Edit Car Fleet" : "Add Car Fleet"}</Text>

                {data &&
                    <>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name={"meeting-room"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={"Car Code"}
                                placeholderTextColor={Colors.PrimaryColor}
                                value={carCode}
                                onChangeText={(text) => { setCarCode(text), setCarCodeValidation("") }}
                            />
                        </View>
                        {carCodeValidation && <ErrorMessage margin={10} error={carCodeValidation} />}
                    </>
                }
                <View style={styles.inputContainer}>
                    <MaterialIcons name={"meeting-room"} color={Colors.PrimaryColor} />
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Car Name"}
                        placeholderTextColor={Colors.PrimaryColor}
                        value={carName}
                        onChangeText={(text) => { setCarName(text), setCarNameValidation("") }}
                    />
                </View>
                {carNameValidation && <ErrorMessage margin={10} error={carNameValidation} />}



                {/* <View style={styles.inputContainer}>
                    <FontAwesome5 name={"globe-americas"} color={Colors.PrimaryColor} />
                    <TextInput
                        style={{ ...styles.textInput, paddingRight: 12 }}
                        placeholder={"Enter Image Url"}
                        placeholderTextColor={Colors.PrimaryColor}
                        value={image}
                        onChangeText={(text) => { setImage(text), setImageValidation("") }}

                    />
                </View>
                {imageValidation && <ErrorMessage error={imageValidation} />} */}

                <TouchableOpacity onPress={() => { PickImage() }} style={styles.loadImageBtn}>
                    <Text style={{ color: Colors.WhiteColor }}>Load Image</Text>
                </TouchableOpacity>
                {image != "" &&
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.roomImage} />
                    </View>}

                <View style={styles.inputContainer}>
                    <MaterialIcons name={"meeting-room"} color={Colors.PrimaryColor} />
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Plate Number"}
                        placeholderTextColor={Colors.PrimaryColor}
                        value={plateNo}
                        onChangeText={(text) => { setPlateNo(text), setPlateNoValidation("") }}

                    />
                </View>
                {plateNoValidation && <ErrorMessage margin={10} error={plateNoValidation} />}
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
                        placeholder={"Hire Rate"}
                        placeholderTextColor={Colors.PrimaryColor}
                        value={hireRate}
                        keyboardType={'numeric'}
                        onChangeText={(text) => { setHireRate(text), setHireRateValidation("") }}

                    />
                </View>
                {hireRateValidation && <ErrorMessage margin={10} error={hireRateValidation} />}

                <View style={styles.descriptionbox}>
                    <MaterialIcons name={"description"} size={15} color={Colors.PrimaryColor} style={styles.descriptionicon} />
                    <TextInput
                        style={styles.textbox}
                        placeholder={"Car Introduction"}
                        underlineColorAndroid="transparent"
                        multiline={true}
                        numberOfLines={8}
                        placeholderTextColor={Colors.PrimaryColor}
                        value={briefIntroduction}
                        onChangeText={(text) => { setBriefIntroduction(text), setBriefIntroductionValidation("") }}

                    />
                </View>
                {briefIntroductionValidation && <ErrorMessage margin={10} error={briefIntroductionValidation} />}



                <TouchableOpacity onPress={() => { Submit() }} style={{ ...styles.btn, marginBottom: 50 }}>
                    <Text style={styles.btntext}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddCarRentalFleet

