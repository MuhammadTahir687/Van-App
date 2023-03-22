import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Trip1 from '../../assets/Trip1.jpg';
import Trip2 from '../../assets/Trip2.jpg';
import Trip3 from '../../assets/Trip3.jpg';
import { Colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserServices } from '../../services/userServices';
import axios from 'axios';

const TouristTourGuide = () => {

    const navigation = useNavigation();
    const [data, setData] = useState([])
    const [selectedCountry, setSelectedCountry] = useState([])
    const [countryFilter, setCountryFilter] = useState("All")
    const [filterbtn, setFilterbtn] = useState(0)
    const [search, setSearch] = useState("")

    const [countryData, setCountryData] = useState([])

    useEffect(() => {
        GetData()
    }, [])

    const GetData = async () => {
        try {
            // const response = await axios.get("https://eu-central-1.aws.data.mongodb-api.com/app/data_lookup-emecl/endpoint/showcountries");

            const resp = await UserServices.UserData('guidesTripPlans')
            if (resp) {
                // setCountryData(response?.data[0])
                setData(resp.data)
            }
        } catch (error) {
            console.log("Error", error)
        }
    }



    const HotelData = [
        { id: 1, name: "Hunza Skardu", address: "Pakistan", country: "Pakistan", image: Trip1, price: 200 },
        { id: 2, name: "Hunza Apricot and Cherry Blossom Trip", address: "Pakistan", country: "Pakistan", image: Trip2, price: 300 },
        { id: 3, name: "Naran Hunza", address: "Pakistan", country: "Pakistan", image: Trip3, price: 250 }
    ]
    const CountryFilter = [
        { id: 1, name: "All" },
        { id: 2, name: "Spain" },
        { id: 3, name: "Pakistan" },
        { id: 4, name: "Islamabad" },
    ]

    const CountryList = data?.map((item) => item.country)?.concat("All").sort()

    // const filterListCountry = Object.keys(countryData).filter((item, index) => CountryList.map((list) => countryData[item]?.name?.common == list))
    // // const filterData = data[filter]
    // console.log(filterListCountry)



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

    const filterTourlData = data?.filter((item) => item?.country?.includes(countryFilter));

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headertext}>Tour Guide</Text>
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
                    // keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => { setFilterbtn(index), setCountryFilter(item) }} key={index} style={{ ...styles.coutryBtn, backgroundColor: filterbtn == index ? Colors.PrimaryColor : "#e8e7e6" }}>
                            <Text style={{ color: filterbtn == index ? Colors.WhiteColor : "black" }}>{item}</Text>
                        </TouchableOpacity>
                    )}

                />
            </View>
            } */}

            <FlatList
                // data={countryFilter == "All" ? data?.filter((item) => item?.trip_name.toLowerCase().includes(search.toLowerCase())) : filterTourlData?.filter((item) => item?.trip_name.toLowerCase().includes(search.toLowerCase()))}
                data={data?.filter((item) => item?.trip_name.toLowerCase().includes(search.toLowerCase()) || item?.country.toLowerCase().includes(search.toLowerCase()))}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => { navigation.navigate("TourGuideDetail", { data: item }) }} style={styles.hotelCardContainer}>
                        <Image source={{ uri: item?.place_image_url }} style={styles.image} />
                        <View style={styles.hotelDescriptionContainer}>
                            <View>
                                <Text style={styles.hotelName}>{item?.trip_name}</Text>
                                <Text style={styles.hotelAddress}>{item?.city + ", " + item?.country}</Text>
                            </View>
                            <View>
                                <Text style={styles.hotelPrice}>{item?.currency + " " + item?.trip_fee}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}

export default TouristTourGuide

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