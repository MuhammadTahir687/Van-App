import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, ImageBackground, useWindowDimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../constants/Colors';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import CarRental1 from '../../assets/CarRental1.jpg';
import CarRental2 from '../../assets/CarRental2.jpg';
import CarRental3 from '../../assets/CarRental3.jpg';

const CarRentalDetail = ({ route, navigation }) => {

    const { width, height } = useWindowDimensions()
    const data = route?.params?.data
    const images = [{ id: 1, image: CarRental1 }, { id: 2, image: CarRental2 }, { id: 3, image: CarRental3 }]

    return (
        <SafeAreaView style={styles.carRentalDetailContainer}>
            <ScrollView>
                <View style={styles.swiperContainer}>
                    <SwiperFlatList
                        showPagination
                        paginationActiveColor={Colors.PrimaryColor}
                        data={images}
                        renderItem={({ item }) => (
                            <Image source={item.image} style={{ width: width, height: 250 }} />
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
                        <Text style={styles.carRentalName}>{data?.name}</Text>
                        <Text style={styles.carRentalPrice}>$ {data?.price}</Text>
                    </View>
                    <Text style={styles.carRentalAddress}>{data?.address}</Text>
                    <Text style={styles.aboutItemHeading}>About this Agency</Text>
                    <Text style={styles.aboutText}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</Text>
                </View>
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
    carRentalInfoContainer: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, alignItems: "center", marginVertical: 10 },
    carRentalName: { color: "black", fontSize: 25, fontWeight: "bold" },
    carRentalPrice: { fontSize: 20, color: "black" },
    aboutItemHeading: { color: "black", marginHorizontal: 20, marginVertical: 10, fontWeight: "bold", fontSize: 20 },
    aboutText: { marginHorizontal: 20, textAlign: "justify", color: "gray" },
    buttonContainer: { justifyContent: "flex-end", marginVertical: 10 },
    bookingBtn: { backgroundColor: Colors.PrimaryColor, marginHorizontal: 20, alignItems: "center", paddingVertical: 10, borderRadius: 10 },
    btnText: { color: "white", fontWeight: "bold" },
    carRentalAddress: { color: "gray", marginHorizontal: 20 }
})