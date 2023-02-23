import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../constants/Colors';

const HotelDetail = ({ route, navigation }) => {
    const data = route?.params?.data
    return (
        <SafeAreaView style={styles.hotelDetailContainer}>
            <ScrollView>
                <ImageBackground source={data?.image} style={styles.image}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={20} color={'white'} style={{ margin: 20 }} />
                    </TouchableOpacity>
                </ImageBackground>
                <View>
                    <View style={styles.hotelInfoContainer}>
                        <Text style={styles.hotelName}>{data?.name}</Text>
                        <Text style={styles.hotelPrice}>$ {data?.price}</Text>
                    </View>
                    <Text style={styles.hotelAddress}>{data?.address}</Text>
                    <Text style={styles.aboutItemHeading}>About this Hotel</Text>
                    <Text style={styles.aboutText}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</Text>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => { alert("Hotel Booked") }} style={styles.bookingBtn}>
                    <Text style={styles.btnText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default HotelDetail

export const styles = StyleSheet.create({

    hotelDetailContainer: { flex: 1, backgroundColor: "white" },
    image: { height: 250, width: "100%", borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: "hidden" },
    hotelInfoContainer: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, alignItems: "center", marginVertical: 10 },
    hotelName: { color: "black", fontSize: 25, fontWeight: "bold" },
    hotelPrice: { fontSize: 20, color: "black" },
    aboutItemHeading: { color: "black", marginHorizontal: 20, marginVertical: 10, fontWeight: "bold", fontSize: 20 },
    aboutText: { marginHorizontal: 20, textAlign: "justify", color: "gray" },
    buttonContainer: { justifyContent: "flex-end", marginVertical: 10 },
    bookingBtn: { backgroundColor: Colors.PrimaryColor, marginHorizontal: 20, alignItems: "center", paddingVertical: 10, borderRadius: 10 },
    btnText: { color: "white", fontWeight: "bold" },
    hotelAddress: { color: "gray", marginHorizontal: 20 }
})