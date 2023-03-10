import React from 'react'
import { StatusBar, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { styles } from './style';
import { Colors } from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native';


const Auth = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.maincontainer}>
            <StatusBar animated={true} backgroundColor={Colors.PrimaryColor} barStyle="light-content" />
            <View style={styles.container}>
                <Image source={require("../../assets/Logo.png")} resizeMode="contain" style={styles.image} />
                <View style={styles.subcontainer}>
                    <Text style={styles.loginHeading}>Get Started</Text>
                    <Text style={styles.authtext}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </Text>
                    <TouchableOpacity onPress={() => { navigation.navigate("PersonelAccount") }} style={styles.btn}>
                        <Text style={styles.btntext}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btntext}>Create an account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    )
}

export default Auth

