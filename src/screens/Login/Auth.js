import React, { useEffect, useState, useContext } from 'react'
import { StatusBar, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { styles } from './style';
import { Colors } from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Languages from '../../constants/Localization/localization';
import DropdownPicker from '../../components/DropdownPicker/DropdownPicker';
import { RootContext } from '../../components/ContextApi/ContextApi';

const Auth = () => {


    const navigation = useNavigation();

    const { selectedLanguage, setselectedLanguage } = useContext(RootContext)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("en");



    const data = [
        { label: 'English', value: 'en' },
        { label: 'Persian', value: 'per' },
        { label: 'Turkey', value: 'tur' }
    ]

    return (
        <SafeAreaView style={styles.maincontainer}>
            <StatusBar animated={true} backgroundColor={Colors.PrimaryColor} barStyle="light-content" />
            <View style={{ alignItems: "center" }}>
                <Image source={require("../../assets/oneapp-logo1.png")} resizeMode="contain" style={styles.image} />
            </View>
            <View style={styles.container}>
                <View style={styles.subcontainer}>
                    <Text style={styles.loginHeading}>Get Started</Text>
                    <Text style={styles.authtext}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </Text>
                    <View style={styles.languagedropdowncontainer}>
                        <Text style={styles.languageHeading}>Select Language</Text>
                        <DropdownPicker
                            listMode={"SCROLLVIEW"}
                            data={data}
                            value={value}
                            setValue={setValue}
                            open={open}
                            setOpen={setOpen}
                            onChangeValue={() => { Languages.setLanguage(value), setselectedLanguage(value) }}
                        />
                    </View>
                    <TouchableOpacity onPress={() => { navigation.navigate("PersonelAccount") }} style={styles.btn}>
                        <Text style={styles.btntext}>{Languages.auth_login_btn_txt}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate("PersonelAccountSignup") }} style={styles.btn}>
                        <Text style={styles.btntext}>{Languages.auth_signup_btn_txt}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    )
}

export default Auth

