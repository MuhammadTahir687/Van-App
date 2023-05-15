import React, { useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, ImageBackground, useWindowDimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../constants/Colors';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const CarRentalDetail = ({ route, navigation }) => {

    const { width, height } = useWindowDimensions()
    const data = route?.params?.data;
    const fleetData = route?.params?.fleetData;
    const filterfleetData = fleetData?.filter((item) => item?.car_agent_code == data?.car_agent_code)

    const images = [{ id: 1, image: data?.car_image_url }]

    return (
        <SafeAreaView style={styles.carRentalDetailContainer}>
            <ScrollView>

                <View style={styles.swiperContainer}>
                    <SwiperFlatList
                        showPagination
                        paginationActiveColor={Colors.PrimaryColor}
                        data={data?.fleet_image_url}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item }} style={{ width: width, height: 250 }} />
                        )}
                    />
                </View>
                {/* <ImageBackground source={data?.image} style={styles.image}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={20} color={'white'} style={{ margin: 20 }} />
                    </TouchableOpacity>
                </ImageBackground> */}
                <View>
                    <View style={styles.carRentalInfoContainer}>
                        <Text style={styles.carRentalName}>{data?.agency_name}</Text>
                        <Text style={styles.carRentalPrice}>{data?.city + ", " + data?.country}</Text>
                        <Text style={styles.carRentalPrice}>{data?.agency_address}</Text>
                        <Text style={styles.carRentalPrice}>Total Cars: {data?.number_of_cars}</Text>

                    </View>
                    {/* <Text style={styles.carRentalAddress}>{data?.address}</Text> */}
                    <Text style={styles.aboutItemHeading}>About this Agency</Text>
                    <Text style={styles.aboutText}>{data?.brief_introduction}</Text>
                </View>
                <Text style={styles.aboutItemHeading}>Car Rental Fleets</Text>
                {filterfleetData?.map((item, index) => (
                    <TouchableOpacity onPress={() => { navigation.navigate("CarFleetDetail", { data: item }) }} key={index} style={{ flex: 1, marginVertical: 5, marginHorizontal: 10, flexDirection: "row" }}>
                        <Image source={{ uri: item?.car_image_url }} style={{ width: "50%", height: 100, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} />
                        <View style={{ backgroundColor: "white", elevation: 3, width: "50%", borderTopRightRadius: 10, borderBottomRightRadius: 10, paddingLeft: 10, justifyContent: "center" }}>
                            <Text style={{ fontWeight: "bold" }}>{item?.car_name}</Text>
                            <Text>Price: {item?.currency + " " + item?.hire_rate}</Text>
                            <Text>Plate#: {item?.plate_no}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => { alert("Car is Booked") }} style={styles.bookingBtn}>
                    <Text style={styles.btnText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default CarRentalDetail

export const styles = StyleSheet.create({

    carRentalDetailContainer: { flex: 1, backgroundColor: "white" },
    swiperContainer: { flex: 1 },
    image: { height: 250, width: "100%", borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: "hidden" },
    carRentalInfoContainer: { marginHorizontal: 20, marginVertical: 10 },
    carRentalName: { color: "black", fontSize: 20, fontWeight: "bold" },
    carRentalPrice: { fontSize: 15, color: "gray" },
    aboutItemHeading: { color: "black", marginHorizontal: 20, marginVertical: 5, fontWeight: "bold", fontSize: 15 },
    aboutText: { marginHorizontal: 20, textAlign: "justify", color: "gray" },
    buttonContainer: { justifyContent: "flex-end", marginVertical: 10 },
    bookingBtn: { backgroundColor: Colors.PrimaryColor, marginHorizontal: 20, alignItems: "center", paddingVertical: 10, borderRadius: 10 },
    btnText: { color: "white", fontWeight: "bold" },
    carRentalAddress: { color: "gray", marginHorizontal: 20 }
})