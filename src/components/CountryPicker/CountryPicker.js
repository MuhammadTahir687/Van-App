import React, { useState, useContext } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import CountryPicker from "react-native-country-picker-modal";
import { Colors } from '../../constants/Colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Languages from '../../constants/Localization/localization';
import { RootContext } from '../ContextApi/ContextApi';

const CountryPickerModal = ({ countryCode, setCountryCode, country, setCountry, setCountryValidation }) => {

    const { selectedLanguage, setselectedLanguage } = useContext(RootContext)
    const [withCountryNameButton, setWithCountryNameButton] = useState(true,)
    const [withCountryNameText, setWithCountryNameText] = useState(true,)
    const [withFlag, setWithFlag] = useState(true)
    const [withEmoji, setWithEmoji] = useState(true)
    const [withFilter, setWithFilter] = useState(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState(true)
    const [withCallingCode, setWithCallingCode] = useState(true)

    const onSelect = (country) => {
        setCountryCode(country.cca2)
        setCountry(country.name)
        setCountryValidation("")
        console.log(country.name)
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollcontainer}>
                {country == "" && <FontAwesome5 name={"globe-americas"} color={Colors.PrimaryColor} style={styles.countryicon} />}
                <CountryPicker
                    translation={selectedLanguage == "en" ? 'common' : selectedLanguage}
                    placeholder={<Text style={styles.countryplaceholder}>{Languages.pa_signup_country}</Text>}
                    theme={styles.countrytheme}
                    {...{
                        countryCode,
                        withFilter,
                        withFlag,
                        withCountryNameButton,
                        withCountryNameText,
                        withAlphaFilter,
                        withCallingCode,
                        withEmoji,
                        onSelect,
                    }} />
            </ScrollView>
        </View>
    )

}

export default CountryPickerModal

const styles = StyleSheet.create({
    container: { flex: 1, height: 50, borderWidth: 1, borderColor: Colors.PrimaryColor, borderRadius: 10, marginRight: 5 },
    scrollcontainer: { flexGrow: 1, alignItems: "center" },
    countryicon: { paddingRight: 10, paddingLeft: 5 },
    countryplaceholder: { color: Colors.PrimaryColor, fontSize: 14 },
    countrytheme: { fontSize: 13, primaryColor: 'red', primaryColorVariant: '#eee', placeholderTextColor: 'red', onBackgroundTextColor: Colors.PrimaryColor },
})