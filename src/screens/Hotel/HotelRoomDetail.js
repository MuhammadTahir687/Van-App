import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, ImageBackground, useWindowDimensions } from 'react-native'
import { Colors } from '../../constants/Colors';
import { SwiperFlatList } from 'react-native-swiper-flatlist';


const HotelRoomDetail = ({ route, navigation }) => {

    const { width, height } = useWindowDimensions()
    const data = route?.params?.data

    const images = [{ id: 1, image: data?.room_image_url }]

    return (
        <SafeAreaView style={styles.HotelRoomDetailContainer}>
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
                    <View style={styles.RoomInfoContainer}>
                        <Text style={styles.RoomName}>{data?.room_name}</Text>
                        <Text style={styles.RoomPrice}>{data?.currency + " " + data?.unit_price}</Text>
                    </View>
                    <Text style={styles.RoomAddress}>Type: {data?.room_type}</Text>
                    {/* <View>
                        <Text style={styles.aboutItemHeading}>Room Amenities</Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", marginHorizontal: 20 }}>
                            {data?.amenities?.map((item, index) => (
                                <View key={index} style={{ marginHorizontal: 5, backgroundColor: Colors.PrimaryColor, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, marginTop: 10 }}>
                                    <Text style={{ color: Colors.WhiteColor }}>{item}</Text>
                                </View>
                            ))}
                        </View>

                    </View> */}
                    <Text style={styles.aboutItemHeading}>About this Room</Text>
                    <Text style={styles.aboutText}>{data?.room_description}</Text>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => { alert("Room Booked") }} style={styles.bookingBtn}>
                    <Text style={styles.btnText}>Book Now</Text>
                </TouchableOpacity>
            </View>





        </SafeAreaView>
    )
}

export default HotelRoomDetail

export const styles = StyleSheet.create({

    HotelRoomDetailContainer: { flex: 1, backgroundColor: "white" },
    swiperContainer: { flex: 1 },
    image: { height: 250, width: "100%", borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: "hidden" },
    RoomInfoContainer: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, alignItems: "center", marginVertical: 10 },
    RoomName: { color: "black", fontSize: 25, fontWeight: "bold" },
    RoomPrice: { fontSize: 20, color: "black" },
    aboutItemHeading: { color: "black", marginHorizontal: 20, marginVertical: 10, fontWeight: "bold", fontSize: 20 },
    aboutText: { marginHorizontal: 20, textAlign: "justify", color: "gray" },
    buttonContainer: { justifyContent: "flex-end", marginVertical: 10 },
    bookingBtn: { backgroundColor: Colors.PrimaryColor, marginHorizontal: 20, alignItems: "center", paddingVertical: 10, borderRadius: 10 },
    btnText: { color: "white", fontWeight: "bold" },
    RoomAddress: { color: "gray", marginHorizontal: 20 }
})