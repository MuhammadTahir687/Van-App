import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Trip1 from '../../assets/Trip1.jpg';
import Trip2 from '../../assets/Trip2.jpg';
import Trip3 from '../../assets/Trip3.jpg';
import { Colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserServices } from '../../services/userServices';
import axios from 'axios';
import Tour from '../../assets/tour.jpeg'

const TouristTourGuide = () => {

    const navigation = useNavigation();
    const [data, setData] = useState([])
    const [selectedCountry, setSelectedCountry] = useState([])
    const [guidesTripPlans, setGuideTripPlans] = useState([])
    const [countryFilter, setCountryFilter] = useState("All")
    const [filterbtn, setFilterbtn] = useState(0)
    const [search, setSearch] = useState("")
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        GetData()
    }, [])


    const GetData = async () => {
        try {

            const resp = await UserServices.UserData('guides')
            const placesResponse = await UserServices.UserData("guidesTripPlans")
            if (resp) {
                setRefreshing(false)
                console.log("Data====", resp?.data)
                setData(resp?.data)
                setGuideTripPlans(placesResponse?.data)
            }
        } catch (error) {
            setRefreshing(false)
            console.log("Error", error)
        }
    }




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
                refreshControl={<RefreshControl progressBackgroundColor={Colors.PrimaryColor} colors={[Colors.WhiteColor]} refreshing={refreshing} onRefresh={() => { setRefreshing(true), GetData() }} />}
                data={data?.filter((item) => item?.guide_name.toLowerCase().includes(search.toLowerCase()) || item?.country.toLowerCase().includes(search.toLowerCase()))}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => { navigation.navigate("TourGuideDetail", { data: item, placesData: guidesTripPlans }) }} style={styles.hotelCardContainer}>
                            {item?.profile_image_url?.url ? < Image source={{ uri: item?.profile_image_url?.url }} style={styles.image} />
                                : <Image source={Tour} style={styles.image} />
                            }
                            <View style={styles.hotelDescriptionContainer}>
                                <View>
                                    {/* <Text style={styles.hotelName}>{item?.guide_code}</Text> */}
                                    <Text style={styles.hotelName}>{item?.guide_name}</Text>
                                    <Text style={styles.hotelAddress}>{item?.city + ", " + item?.country}</Text>
                                </View>
                                {/* <View>
                                    <Text style={styles.hotelPrice}>{item?.currency + " " + item?.trip_fee}</Text>
                                </View> */}
                            </View>
                        </TouchableOpacity>
                    )
                }}
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