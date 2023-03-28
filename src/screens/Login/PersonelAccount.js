import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { styles } from "./style"
import { Colors } from '../../constants/Colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import Languages from '../../constants/Localization/localization';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { AuthServices } from '../../services/authServices';
import Loader from '../../components/Loader/Loader';
import AwesomeAlert from 'react-native-awesome-alerts';
import { save_data } from '../../components/Storage/Storage';

const PersonelAccount = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [passwordValidation, setPasswordValidation] = useState("")
    const [emailValidation, setEmailValidation] = useState("")
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)


    const Submit = async () => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (email == "") {
            setEmailValidation("Required*")
        }
        else if (reg.test(email) == false) {
            setEmailValidation("Enter a valid email address")
        }
        else if (password == "") {
            setPasswordValidation("Required")
        }
        else {
            const body = {
                email: email,
                password: password
            }
            console.log(body)
            try {
                setLoading(true)
                const resp = await AuthServices.PA_Login(body)

                if (resp.data) {
                    console.log(resp.data)
                    setLoading(false)
                    await save_data("user", resp.data[0])
                    // navigation.replace("TabScreens")
                    navigation.reset({ index: 0, routes: [{ name: 'TabScreens' }] });
                }

            } catch (error) {
                setLoading(false)
                setShowAlert(true)
                console.log("Error: ", error)
            }
        }
    }



    return (
        <SafeAreaView style={styles.maincontainer}>
            <Loader loading={loading} setLoading={setLoading} />
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Error"
                message="Invalid Credentials"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Cancel"
                confirmText="Sign Up"
                confirmButtonColor="green"
                cancelButtonColor='red'
                onCancelPressed={() => { setShowAlert(false) }}
                onConfirmPressed={() => { setShowAlert(false), navigation.replace("PersonelAccountSignup") }}
            />
            <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={styles.maincontent}>
                <View style={{ alignItems: "center" }}>
                    <Image source={require("../../assets/oneapp-logo1.png")} resizeMode="contain" style={styles.image} />
                </View>
                <View style={styles.container}>
                    <View style={styles.subcontainer}>
                        <Text style={styles.loginHeading}>{Languages.pa_login_screen_h}</Text>
                        <View style={styles.inputContainer}>
                            <FontAwesome5 name={"mail-bulk"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholderTextColor={Colors.PrimaryColor}
                                placeholder={Languages.pa_login_email}
                                keyboardType={"email-address"}
                                autoCapitalize='none'
                                value={email}
                                onChangeText={(text) => { setEmail(text), setEmailValidation("") }}
                            />
                        </View>
                        {emailValidation && <ErrorMessage error={emailValidation} />}
                        <View style={{ ...styles.inputContainer, marginHorizontal: 20 }}>
                            <FontAwesome5 name={"lock"} color={Colors.PrimaryColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder={Languages.pa_login_password}
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
                            <Text style={styles.btntext}>{Languages.pa_login_btn_txt}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate("BusinessAccount") }} style={styles.btn}>
                            <Text style={styles.btntext}>{Languages.pa_login_ba_btn_txt}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default PersonelAccount

