import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HotelRoom1 from '../../assets/HotelRoom1.jpeg';
import HotelRoom2 from '../../assets/HotelRoom2.jpeg';
import HotelRoom3 from '../../assets/HotelRoom3.jpg';
import { Rating } from 'react-native-elements';
import { Colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserServices } from '../../services/userServices';


const TouristHotelReservation = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([])
    const [hotelRoomsData, setHotelRoomsData] = useState([])
    const [selectedCountry, setSelectedCountry] = useState([])
    const [countryFilter, setCountryFilter] = useState("All")
    const [filterbtn, setFilterbtn] = useState(0)
    const [search, setSearch] = useState("")

    useEffect(() => { GetData() }, [])


    const GetData = async () => {
        try {
            const resp = await UserServices.UserData('hotelManagers')
            const roomsResponse = await UserServices.UserData("hotelRooms")
            if (resp) {
                setData(resp.data)
                setHotelRoomsData(roomsResponse.data)
            }
        } catch (error) {
            console.log("Error", error)
        }
    }

    const SelectedItems = (item) => {
        if (!selectedCountry.includes(item)) {
            setSelectedCountry([...selectedCountry, item])
        } else {
            let newSelectedCountry = selectedCountry
            const findIndex = selectedCountry.findIndex(f => f === item)
            newSelectedCountry.splice(findIndex, 1)
            setSelectedCountry([...newSelectedCountry])
        }
    }

    const CountryList = data?.map((item) => item?.country)?.concat("All")?.sort()
    const filterHotelData = data?.filter((item) => item?.country?.includes(countryFilter));


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headertext}>Hotel Reservation</Text>
            </View>
            <View style={styles.searchContainer}>
                <Ionicons name={"search"} size={20} color={Colors.WhiteColor} />
                <TextInput
                    placeholder='Search'
                    placeholderTextColor={Colors.WhiteColor}
                    value={search}
                    onChangeText={(text) => { setSearch(text) }}
                    style={styles.searchInput}
                />
            </View>
            {/* {data.length > 0 && <View style={styles.countryFilterContainer}>
                <FlatList
                    horizontal
                    data={CountryList?.filter((value, index, array) => array.indexOf(value) === index)}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => { setFilterbtn(index), setCountryFilter(item) }} key={index} style={{ ...styles.coutryBtn, backgroundColor: filterbtn == index ? Colors.PrimaryColor : "#e8e7e6" }}>
                            <Text style={{ color: filterbtn == index ? Colors.WhiteColor : "black" }}>{item}</Text>
                        </TouchableOpacity>
                    )}

                />
            </View>
            } */}

            <FlatList
                // data={countryFilter == "All" ? data.filter((item) => item?.hotel_name?.toLowerCase().includes(search.toLowerCase())) : filterHotelData.filter((item) => item?.hotel_name?.toLowerCase().includes(search.toLowerCase()))}
                data={data.filter((item) => item?.hotel_name?.toLowerCase().includes(search.toLowerCase()) || item?.country?.toLowerCase().includes(search.toLowerCase()))}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => { navigation.navigate("HotelDetail", { data: item, hotelRooms: hotelRoomsData }) }} style={styles.hotelCardContainer}>
                        <Image source={{ uri: item?.hotel_image_url }} style={styles.image} />
                        <View style={styles.hotelDescriptionContainer}>
                            <View>
                                <Text style={styles.hotelName}>{item?.hotel_name}</Text>
                                <Text style={styles.hotelPrice}>Rooms: {item?.number_of_rooms}</Text>
                                <Text style={styles.hotelAddress}>{item?.city + ", " + item?.country}</Text>
                                <Text style={styles.hotelAddress}>{item?.hotel_address}</Text>

                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}
export default TouristHotelReservation;

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { paddingVertical: 10, backgroundColor: Colors.PrimaryColor, alignItems: "center" },
    headertext: { fontWeight: "bold", color: Colors.WhiteColor },
    searchContainer: { flexDirection: "row", margin: 10, alignItems: "center", backgroundColor: Colors.PrimaryColor, borderRadius: 10, paddingHorizontal: 10 },
    searchInput: { flex: 1, width: "100%", paddingHorizontal: 10, color: Colors.WhiteColor },
    countryFilterContainer: { marginHorizontal: 10 },
    coutryBtn: { marginHorizontal: 5, paddingHorizontal: 20, paddingVertical: 5, height: 30, marginVertical: 10, borderRadius: 50, alignItems: "center", justifyContent: "center" },
    hotelCardContainer: { margin: 10, borderRadius: 10, backgroundColor: "white" },
    image: { width: "100%", height: 150, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
    hotelDescriptionContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: 10 },
    hotelName: { fontSize: 15, fontWeight: "bold" },
    hotelAddress: { color: "#ababab" },
    hotelPrice: { color: "#ababab" }

})