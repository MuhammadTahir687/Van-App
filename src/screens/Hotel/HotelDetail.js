import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, ImageBackground, useWindowDimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../constants/Colors';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import HotelRoom1 from '../../assets/HotelRoom1.jpeg';
import HotelRoom2 from '../../assets/HotelRoom2.jpeg';
import HotelRoom3 from '../../assets/HotelRoom3.jpg';

const HotelDetail = ({ route, navigation }) => {

    const { width, height } = useWindowDimensions()
    const data = route?.params?.data
    const hotelRoomsData = route?.params?.hotelRooms;

    const filterHotelRooms = hotelRoomsData?.filter((item) => item?.manager_code == data?.manager_code)
    const images = [{ id: 1, image: data?.hotel_image_url }]

    return (
        <SafeAreaView style={styles.hotelDetailContainer}>
            <ScrollView style={{ flexGrow: 1 }}>
                <View style={styles.swiperContainer}>
                    <SwiperFlatList
                        showPagination
                        paginationActiveColor={Colors.PrimaryColor}
                        data={images}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item.image }} style={{ width: width, height: 250 }} />
                        )}
                    />
                </View>
                {/* <ImageBackground source={data?.image} style={styles.image}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={20} color={'white'} style={{ margin: 20 }} />
                    </TouchableOpacity>
                </ImageBackground> */}
                <View>

                    <Text style={styles.hotelName}>{data?.hotel_name}</Text>
                    <Text style={styles.hotelPrice}>Rooms: {data?.number_of_rooms}</Text>
                    <Text style={styles.hotelAddress}>{data?.hotel_address}</Text>
                    <View>
                        <Text style={styles.aboutItemHeading}>Hotel Amenities</Text>
                        <View style={styles.amenitiesContainer}>
                            {data?.amenities?.map((item, index) => (
                                <View key={index} style={styles.amenitiesView}>
                                    <Text style={styles.amenitiesText}>{item}</Text>
                                </View>
                            ))}
                        </View>

                    </View>
                    {/* <Text style={styles.aboutItemHeading}>About this Hotel</Text> */}
                    <Text style={styles.aboutText}>{data?.brief_introduction}</Text>
                </View>
                <Text style={styles.aboutItemHeading}>Hotel Rooms</Text>
                {filterHotelRooms?.map((item, index) => (
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
            {/* <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => { alert("Hotel Booked") }} style={styles.bookingBtn}>
                    <Text style={styles.btnText}>Book Now</Text>
                </TouchableOpacity>
            </View> */}
        </SafeAreaView>
    )
}

export default HotelDetail

export const styles = StyleSheet.create({

    hotelDetailContainer: { flex: 1, backgroundColor: "white" },
    swiperContainer: { flex: 1 },
    image: { height: 250, width: "100%", borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: "hidden" },
    hotelInfoContainer: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, alignItems: "center", marginVertical: 10 },
    hotelName: { marginHorizontal: 20, color: "black", fontSize: 25, fontWeight: "bold" },
    hotelPrice: { marginHorizontal: 20, fontSize: 13, color: "gray" },
    aboutItemHeading: { color: "black", marginHorizontal: 20, marginVertical: 10, fontWeight: "bold", fontSize: 15 },
    aboutText: { marginHorizontal: 20, textAlign: "justify", color: "gray", marginTop: 10 },
    buttonContainer: { justifyContent: "flex-end", marginVertical: 10 },
    bookingBtn: { backgroundColor: Colors.PrimaryColor, marginHorizontal: 20, alignItems: "center", paddingVertical: 10, borderRadius: 10 },
    btnText: { color: "white", fontWeight: "bold" },
    hotelAddress: { color: "gray", marginHorizontal: 20 },
    amenitiesContainer: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: 20 },
    amenitiesView: { marginHorizontal: 5, backgroundColor: Colors.PrimaryColor, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, marginTop: 10 },
    amenitiesText: { color: Colors.WhiteColor, fontSize: 12 }

})