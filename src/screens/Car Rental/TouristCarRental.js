import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CarRental1 from '../../assets/CarRental1.jpg';
import CarRental2 from '../../assets/CarRental2.jpg';
import CarRental3 from '../../assets/CarRental3.jpg';
import { Rating } from 'react-native-elements';
import { Colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserServices } from '../../services/userServices';


const TouristCarRental = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([])
    const [selectedCountry, setSelectedCountry] = useState([])
    const [countryFilter, setCountryFilter] = useState("All")
    const [filterbtn, setFilterbtn] = useState(0)
    const [search, setSearch] = useState("")

    useEffect(() => {
        GetData()
    }, [])

    const GetData = async () => {
        try {
            const resp = await UserServices.UserData('carRentalFleet')
            if (resp) {
                setData(resp.data)
            }
        } catch (error) {
            console.log("Error", error)
        }
    }

    const HotelData = [
        { id: 1, name: "Car Rental Agency #1", address: "Barcelona, Spain", country: "Spain", image: CarRental1, price: 200 },
        { id: 2, name: "Car Rental Agency #2", address: "Lahore, Pakistan", country: "Pakistan", image: CarRental2, price: 300 },
        { id: 3, name: "Car Rental Agency #3", address: "Lahore, Pakistan", country: "Pakistan", image: CarRental3, price: 250 }
    ]
    const CountryFilter = [
        { id: 1, name: "All" },
        { id: 2, name: "Spain" },
        { id: 3, name: "Pakistan" },
        { id: 4, name: "Islamabad" },
    ]

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

    const filterHotelData = HotelData.filter((item) => item.country.includes(countryFilter));

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headertext}>Car Rental</Text>
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
            {/* <View style={styles.countryFilterContainer}>
                <FlatList
                    horizontal
                    data={CountryFilter}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => { setFilterbtn(index), setCountryFilter(item.name) }} key={index} style={{ ...styles.coutryBtn, backgroundColor: filterbtn == index ? Colors.PrimaryColor : "#e8e7e6" }}>
                            <Text style={{ color: filterbtn == index ? Colors.WhiteColor : "black" }}>{item.name}</Text>
                        </TouchableOpacity>
                    )}

                />
            </View> */}

            <FlatList
                // data={countryFilter == "All" ? HotelData.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())) : filterHotelData.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))}
                data={data.filter((item) => item?.car_agent_code.toLowerCase().includes(search.toLowerCase()))}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => { navigation.navigate("CarRentalDetail", { data: item }) }} style={styles.hotelCardContainer}>
                        <Image source={{ uri: item?.car_image_url }} style={styles.image} />
                        <View style={styles.hotelDescriptionContainer}>
                            <View>
                                <Text style={styles.hotelName}>{item?.car_agent_code}</Text>
                                {/* <Text style={styles.hotelAddress}>{item?.address}</Text> */}
                            </View>
                            <View>
                                <Text style={styles.hotelPrice}>{item?.currency + " " + item?.hire_rate}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}

export default TouristCarRental

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
    hotelPrice: { fontWeight: "bold", fontSize: 15 }

})