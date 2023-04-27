import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, ImageBackground, useWindowDimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../constants/Colors';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Loader from '../../components/Loader/Loader';
import { UserServices } from '../../services/userServices';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { RootContext } from '../../components/ContextApi/ContextApi';

const HotelRooms = () => {

    const navigation = useNavigation()
    const { user, setUser } = useContext(RootContext)
    const [hotelRoomsData, setHotelRoomsData] = useState([])
    const [loading, setLoading] = useState(false)


    useFocusEffect(
        React.useCallback(() => {
            GetData()

            return () => GetData();
        }, [])
    );


    const GetData = async () => {
        try {
            setLoading(true)
            const roomsResponse = await UserServices.UserData("hotelRooms")
            if (roomsResponse) {
                const filterRooms = roomsResponse?.data?.filter((item) => item?.manager_code == user?.manager_code)
                console.log(filterRooms)
                setHotelRoomsData(filterRooms)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log("Error", error)
        }
    }

    return (
        <SafeAreaView style={styles.hotelDetailContainer}>
            <Loader loading={loading} setLoading={setLoading} />
            <ScrollView style={{ flexGrow: 1 }}>
                <Text style={styles.aboutItemHeading}>Hotel Rooms</Text>
                {hotelRoomsData?.map((item, index) => (
                    <TouchableOpacity onPress={() => { navigation.navigate("HotelRoomDetail", { data: item }) }} key={index} style={{ flex: 1, marginVertical: 5, marginHorizontal: 10, flexDirection: "row" }}>
                        <Image source={{ uri: item?.room_image_url }} style={{ width: "50%", height: 100, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} />
                        <View style={{ backgroundColor: "white", elevation: 3, width: "50%", borderTopRightRadius: 10, borderBottomRightRadius: 10, paddingLeft: 10, justifyContent: "center" }}>
                            <Text style={{ fontWeight: "bold" }}>{item?.room_name}</Text>
                            <Text>Price: {item?.currency + " " + item?.unit_price}</Text>
                            <Text>Type: {item?.room_type}</Text>
                        </View>
                    </TouchableOpacity>
                ))}


            </ScrollView>
            <TouchableOpacity onPress={() => { navigation.navigate("AddHotelRooms") }} style={styles.addRoomsBtn}>
                <Text style={styles.addRoomsBtnText}>Add Rooms</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default HotelRooms

export const styles = StyleSheet.create({

    hotelDetailContainer: { flex: 1, backgroundColor: "white" },
    swiperContainer: { flex: 1 },
    image: { height: 250, width: "100%", borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: "hidden" },
    hotelInfoContainer: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, alignItems: "center", marginVertical: 10 },
    hotelName: { marginHorizontal: 20, color: "black", fontSize: 25, fontWeight: "bold" },
    hotelPrice: { marginHorizontal: 20, fontSize: 13, color: "gray" },
    aboutItemHeading: { textAlign: "center", backgroundColor: Colors.PrimaryColor, color: Colors.WhiteColor, paddingVertical: 10, marginBottom: 10, fontWeight: "bold", fontSize: 15 },
    aboutText: { marginHorizontal: 20, textAlign: "justify", color: "gray", marginTop: 10 },
    buttonContainer: { justifyContent: "flex-end", marginVertical: 10 },
    bookingBtn: { backgroundColor: Colors.PrimaryColor, marginHorizontal: 20, alignItems: "center", paddingVertical: 10, borderRadius: 10 },
    btnText: { color: "white", fontWeight: "bold" },
    hotelAddress: { color: "gray", marginHorizontal: 20 },
    amenitiesContainer: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: 20 },
    amenitiesView: { marginHorizontal: 5, backgroundColor: Colors.PrimaryColor, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, marginTop: 10 },
    amenitiesText: { color: Colors.WhiteColor, fontSize: 12 },
    addRoomsBtn: { backgroundColor: Colors.PrimaryColor, marginHorizontal: 10, padding: 10, borderRadius: 5, alignItems: "center", marginVertical: 10 },
    addRoomsBtnText: { color: Colors.WhiteColor }

})