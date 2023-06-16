import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, StyleSheet, RefreshControl, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Avatar } from "react-native-elements";
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { UserServices } from '../../services/userServices';
import Taxi from '../../assets/taxi.jpeg';



const TouristTaxiBooking = ({ navigation }) => {

    const [location, setLocation] = useState("");
    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => { GetLocation(), GetData() }, [])


    const GetData = async () => {
        try {

            const resp = await UserServices.UserData('taxiDrivers')
            if (resp) {
                setData(resp.data)
                setRefreshing(false)
            }
        } catch (error) {
            console.log("Error", error)
        }
    }

    const GetLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log("Position ====", position);
                setLocation(position);
            },
            error => {
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

            <ScrollView refreshControl={<RefreshControl progressBackgroundColor={Colors.PrimaryColor} colors={[Colors.WhiteColor]} refreshing={refreshing} onRefresh={() => { setRefreshing(true), GetData() }} />} style={styles.scrollcontainer}>
                {data?.filter((item) => item.status_ready == true)?.map((item, index) => (
                    <View style={styles.listcontainer} key={index}>
                        {item?.taxi_image_url !== "" && item?.taxi_image_url !== undefined ?
                            <Avatar
                                size="large"
                                rounded
                                icon={{ name: 'user', type: 'font-awesome' }}
                                source={{ uri: item?.taxi_image_url }}
                                containerStyle={styles.avatar}
                            /> :
                            <Avatar
                                size="large"
                                rounded
                                icon={{ name: 'user', type: 'font-awesome' }}
                                source={Taxi}
                                containerStyle={styles.avatar}
                            />
                        }
                        <View style={styles.listdetailcontainer}>
                            <Text style={styles.name}>{item?.driver_name}</Text>
                            <View>
                                <View style={styles.modelbtncontainer}>
                                    <Text style={{ flex: 1 }}>Model: {item?.taxi_model_name}</Text>
                                    <TouchableOpacity onPress={() => { navigation.navigate("TouristTaxiBookingDetail", { data: item, location: location }) }} style={styles.listbtn}>
                                        <Text style={styles.btntext}>Book Now</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text>{item?.currency} {item?.hire_rate}</Text>
                                <Text>Plate#: {item?.plate_no}</Text>
                                {/* <Text>Point: {item.point}</Text>
                                <Text>Distance: {item.Distance}</Text> */}
                            </View>
                        </View>

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
    listbtn: { backgroundColor: Colors.PrimaryColor, height: 30, paddingVertical: 5, borderRadius: 5, flex: 1, alignItems: "center" },
    btntext: { color: Colors.WhiteColor },
    modelbtncontainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }
})