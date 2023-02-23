import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Avatar } from "react-native-elements";
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MeIcon from '../../assets/me-icon.png';


const TouristTaxiBooking = () => {

    const [location, setLocation] = useState("");

    useEffect(() => { GetLocation() }, [])


    const data = [
        { id: 1, name: "Ali", Distance: "10 km", point: 10 },
        { id: 2, name: "Umer", Distance: "10 km", point: 5 },
        { id: 3, name: "David", Distance: "10 km", point: 10 },
        { id: 4, name: "Akram", Distance: "10 km", point: 5 },
        { id: 5, name: "Karim", Distance: "10 km", point: 10 },
        { id: 6, name: "Jhon", Distance: "10 km", point: 5 },
        { id: 7, name: "Thomas", Distance: "10 km", point: 10 },
        { id: 8, name: "Nik", Distance: "10 km", point: 5 },
    ]

    const GetLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log("Position ====", position);
                setLocation(position);
            },
            error => {
                // See error code charts below.
                console.log("error ===", error.code, error.message);
                setLocation(false);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
        );
        console.log("Location ====", location);
    };

    const region = { latitude: location != "" ? location?.coords?.latitude : 37.78825, longitude: location != "" ? location?.coords?.longitude : -122.4324, latitudeDelta: 0.000922, longitudeDelta: 0.000821 }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headertext}>Taxi</Text>
            </View>
            <View style={styles.mapcontainer}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.mapstyle}
                    region={region}
                >
                    {location != "" && <Marker
                        coordinate={{
                            latitude: location?.coords?.latitude,
                            longitude: location?.coords?.longitude,
                            latitudeDelta: 0.000922,
                            longitudeDelta: 0.000821,
                        }}>
                    </Marker>}
                </MapView>
            </View>

            <ScrollView style={styles.scrollcontainer}>
                {data.map((item, index) => (
                    <View style={styles.listcontainer} key={index}>
                        <Avatar
                            size="large"
                            rounded
                            icon={{ name: 'user', type: 'font-awesome' }}
                            source={{
                                uri:
                                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                            }}
                            activeOpacity={0.7}
                            containerStyle={styles.avatar}
                        />
                        <View style={styles.listdetailcontainer}>
                            <Text style={styles.name}>{item.name}</Text>
                            <View >
                                <Text>Point: {item.point}</Text>
                                <Text>Distance: {item.Distance}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => { alert("Taxi Booked") }} style={styles.listbtn}>
                            <Text style={styles.btntext}>Book Now</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}
export default TouristTaxiBooking;

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { paddingVertical: 10, backgroundColor: Colors.PrimaryColor, alignItems: "center" },
    headertext: { fontWeight: "bold", color: Colors.WhiteColor },
    mapcontainer: { margin: 10, overflow: "hidden", borderRadius: 10 },
    mapstyle: { width: "100%", height: 150 },
    scrollcontainer: { flexGrow: 1 },
    listcontainer: { flexDirection: "row", alignItems: "center", backgroundColor: "white", elevation: 5, marginVertical: 5, marginHorizontal: 10, borderRadius: 10, padding: 10 },
    avatar: { backgroundColor: Colors.PrimaryColor, marginHorizontal: 10 },
    listdetailcontainer: { flex: 1 },
    name: { fontWeight: "bold", marginVertical: 10 },
    listbtn: { backgroundColor: Colors.PrimaryColor, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 },
    btntext: { color: Colors.WhiteColor },
})