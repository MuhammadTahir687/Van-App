import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import { Colors } from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.replace("Auth")
        }, 1000)
    })
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar animated={true} backgroundColor={Colors.PrimaryColor} barStyle="light-content" />
            <Image source={require("../../assets/oneapp-logo1.png")} resizeMode="contain" style={styles.image} />
        </SafeAreaView>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.PrimaryColor
    },
    image: {
        width: 200,
        height: 200
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 35,
        bottom: 30
    }
})