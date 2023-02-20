import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { styles } from './style';
import { Colors } from '../../constants/Colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import DropdownPicker from '../../components/DropdownPicker/DropdownPicker';
import Languages from '../../constants/Localization/localization';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const BusinessAccount = () => {

    const navigation = useNavigation();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(true)

    const [passwordValidation, setPasswordValidation] = useState("")
    const [emailValidation, setEmailValidation] = useState("")
    const [categoryValidation, setCategoryValidation] = useState("")

    const data = [
        { label: 'Taxi', value: 'Taxi' },
        { label: 'Tour Guide', value: 'Tour Guide' },
        { label: 'Car Rent', value: 'Car Rent' },
        { label: 'Hotel Reservation', value: 'Hotel Reservation' },
        { label: 'Business Advertisement', value: 'Business Advertisement' },
    ]

    const Submit = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (value == null) {
            setCategoryValidation("Required*")
        }
        else if (email == "") {
            setEmailValidation("Required*")
        }
        else if (reg.test(email) == false) {
            setEmailValidation("Enter a valid email address")
        }
        else if (password == "") {
            setPasswordValidation("Required")
        }
        else {
            alert("Succeed")
        }


    }

    return (
        <SafeAreaView style={styles.maincontainer}>
            <ScrollView contentContainerStyle={styles.maincontent}>
                <View style={{ alignItems: "center" }}>
                    <Image source={require("../../assets/oneapp-logo1.png")} resizeMode="contain" style={styles.image} />
                </View>
                <View style={styles.container}>
                    <View style={styles.subcontainer}>
                        <Text style={styles.loginHeading}>{Languages.ba_login_screen_h}</Text>
                        <View style={styles.dropdowncontainer}>
                            <DropdownPicker
                                listMode={"SCROLLVIEW"}
                                placeholder={Languages.ba_login_category}
                                open={open}
                                value={value}
                                data={data}
                                setOpen={setOpen}
                                setValue={(value) => { setValue(value), setCategoryValidation("") }}

                            />
                        </View>
                        {categoryValidation && <ErrorMessage error={categoryValidation} />}

                        <View style={styles.inputContainer}>
                            <FontAwesome5 name={"mail-bulk"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholderTextColor={Colors.PrimaryColor}
                                placeholder={Languages.ba_login_email}
                                keyboardType={"email-address"}
                                value={email}
                                onChangeText={(text) => { setEmail(text), setEmailValidation("") }}
                            />
                        </View>
                        {emailValidation && <ErrorMessage error={emailValidation} />}
                        <View style={{ ...styles.inputContainer, marginHorizontal: 20 }}>
                            <FontAwesome5 name={"lock"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={Languages.ba_login_password}
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
                            <Text style={styles.btntext}>{Languages.ba_login_btn_txt}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.btn}>
                            <Text style={styles.btntext}>{Languages.ba_login_pa_btn_txt}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default BusinessAccount

