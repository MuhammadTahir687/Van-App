import React, { useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, ImageBackground, useWindowDimensions } from 'react-native'
import { Colors } from '../../constants/Colors';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { RootContext } from '../../components/ContextApi/ContextApi';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CarFleetDetail = ({ route, navigation }) => {

    const { width, height } = useWindowDimensions()
    const { user } = useContext(RootContext)
    const data = route?.params?.data

    const images = [{ id: 1, image: data?.car_image_url }]

    return (
        <SafeAreaView style={styles.HotelRoomDetailContainer}>
            <ScrollView style={{ flexGrow: 1 }}>
                {user?.car_agent_code == data?.car_agent_code &&
                    <TouchableOpacity onPress={() => { navigation.navigate("AddCarRentalFleet", { data: data }) }} style={{ position: "absolute", zIndex: 10, alignSelf: "flex-end", marginTop: 10, backgroundColor: Colors.PrimaryColor, borderRadius: 5, padding: 10, right: 10 }}>
                        <FontAwesome name='edit' size={20} color={Colors.WhiteColor} />
                    </TouchableOpacity>
                }
                <View style={styles.swiperContainer}>
                    <SwiperFlatList
                        // showPagination
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
                        <Text style={styles.RoomName}>{data?.car_name}</Text>

                    </View>
                    <Text style={styles.RoomPrice}>{data?.currency + " " + data?.hire_rate}</Text>
                    <Text style={styles.RoomAddress}>Plate#: {data?.plate_no}</Text>
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
                    <Text style={styles.aboutItemHeading}>About this Fleet</Text>
                    <Text style={styles.aboutText}>{data?.brief_introduction_model}</Text>
                </View>
            </ScrollView>
            {user?.car_agent_code != data?.car_agent_code &&
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => { alert("Fleet Booked") }} style={styles.bookingBtn}>
                        <Text style={styles.btnText}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            }





        </SafeAreaView>
    )
}

export default CarFleetDetail

export const styles = StyleSheet.create({

    HotelRoomDetailContainer: { flex: 1, backgroundColor: "white" },
    swiperContainer: { flex: 1 },
    image: { height: 250, width: "100%", borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: "hidden" },
    RoomInfoContainer: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, alignItems: "center", marginVertical: 10 },
    RoomName: { color: "black", fontSize: 25, fontWeight: "bold" },
    RoomPrice: { marginLeft: 20, fontSize: 20, color: "black" },
    aboutItemHeading: { color: "black", marginHorizontal: 20, marginVertical: 10, fontWeight: "bold", fontSize: 15 },
    aboutText: { marginHorizontal: 20, textAlign: "justify", color: "gray" },
    buttonContainer: { justifyContent: "flex-end", marginVertical: 10 },
    bookingBtn: { backgroundColor: Colors.PrimaryColor, marginHorizontal: 20, alignItems: "center", paddingVertical: 10, borderRadius: 10 },
    btnText: { color: "white", fontWeight: "bold" },
    RoomAddress: { color: "gray", marginHorizontal: 20 }
})