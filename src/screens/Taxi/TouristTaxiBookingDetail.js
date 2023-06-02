import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Taxi from '../../assets/taxi.jpeg';
import { Colors } from '../../constants/Colors';
import { getDistance } from 'geolib';

const TouristTaxiBookingDetail = ({ navigation, route }) => {
    const { data, location } = route?.params;
    const Distance = getDistance(
        { latitude: location?.coords?.latitude, longitude: location?.coords?.longitude },
        { latitude: "51° 31' N", longitude: "7° 28' E" }
    );
    return (
        <SafeAreaView style={styles.container}>
            {data?.taxi_image_url ?
                <Image source={{ uri: data?.taxi_image_url }} style={styles.image} /> :
                <Image source={Taxi} style={styles.image} />
            }
            <View style={styles.detailContainer}>

                <View style={styles.rowContainer}>
                    <Text style={styles.text}>Driver Name: {data?.driver_name}</Text>
                    <Text style={styles.text}>{data?.currency} {data?.hire_rate}</Text>
                </View>
                <Text style={styles.text}>Model: {data?.taxi_model_name}</Text>
                <Text style={styles.text}>Country: {data?.country}</Text>
                <Text style={styles.text}>Phone: {data?.phone}</Text>
                <Text style={styles.text}>Email: {data?.email}</Text>
                <Text style={styles.text}>Distance: {Distance / 1000} km</Text>
                <Text style={styles.text}>Breif Introduction:</Text>
                <Text style={styles.introduction}>{data?.brief_introduction}</Text>


            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Confirm</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default TouristTaxiBookingDetail

const styles = StyleSheet.create({
    container: { flex: 1 },
    image: { width: "100%", height: 200, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
    text: { fontWeight: "bold", color: "black", padding: 5 },
    introduction: { color: "black", padding: 5, textAlign: "justify" },
    detailContainer: { margin: 10 },
    btn: { backgroundColor: Colors?.PrimaryColor, alignItems: "center", marginHorizontal: 20, borderRadius: 50 },
    btnText: { color: "white", fontWeight: "bold", padding: 10 },
    btnContainer: { flex: 1, justifyContent: "flex-end", marginVertical: 10 },
    rowContainer: { flexDirection: "row", justifyContent: "space-between" }
})