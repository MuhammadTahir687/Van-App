import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, ImageBackground, useWindowDimensions } from 'react-native'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Colors } from '../../constants/Colors';
import Trip1 from '../../assets/Trip1.jpg';
import Trip2 from '../../assets/Trip2.jpg';
import Trip3 from '../../assets/Trip3.jpg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TourGuideCardList from '../../components/TourGuideCard/TourGuideCardList';

const TourGuideDetail = ({ route }) => {

    const { width, height } = useWindowDimensions()
    const data = route?.params?.data
    const images = [{ id: 1, image: Trip1 }, { id: 2, image: Trip2 }, { id: 3, image: Trip3 }]

    return (
        <SafeAreaView style={styles.tourGuideDetailContainer}>
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
                    <View style={styles.tourGuideInfoContainer}>
                        <Text style={styles.tourGuideName}>{data?.name}</Text>
                        {/* <Text style={styles.tourGuidePrice}>$ {data?.price}</Text> */}
                    </View>
                    <Text style={styles.tourGuideAddress}>{data?.address}</Text>
                    <Text style={styles.aboutItemHeading}>About this Trip</Text>
                    <Text style={styles.aboutText}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</Text>
                </View>
                <View>
                    <View style={{ ...styles.cardContainer, backgroundColor: "#3CADA9" }}>
                        <Text style={styles.cardHeading}>Basic $200</Text>
                        <TourGuideCardList text={"7 Days, 6 NIghts"} />
                        <TourGuideCardList text={"Hotel Stay"} />
                        <TourGuideCardList text={"Sightseeing (Tickets Not Included)"} />
                        <TouchableOpacity onPress={() => { alert("Guide is Booked") }} style={styles.cardBtn}>
                            <Text style={{ color: "#3CADA9" }}>Choose Plan</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.cardContainer, backgroundColor: '#3D62C1' }}>
                        <Text style={styles.cardHeading}>Basic $200</Text>
                        <TourGuideCardList text={"7 Days, 6 NIghts"} />
                        <TourGuideCardList text={"Hotel Stay"} />
                        <TourGuideCardList text={"Sightseeing (Tickets Not Included)"} />
                        <TouchableOpacity onPress={() => { alert("Guide is Booked") }} style={styles.cardBtn}>
                            <Text style={{ color: "#3D62C1" }}>Choose Plan</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.cardContainer, backgroundColor: "#FE3773" }}>
                        <Text style={styles.cardHeading}>Basic $200</Text>
                        <TourGuideCardList text={"7 Days, 6 NIghts"} />
                        <TourGuideCardList text={"Hotel Stay"} />
                        <TourGuideCardList text={"Sightseeing (Tickets Not Included)"} />
                        <TouchableOpacity onPress={() => { alert("Guide is Booked") }} style={styles.cardBtn}>
                            <Text style={{ color: "#FE3773" }}>Choose Plan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TourGuideDetail

const styles = StyleSheet.create({
    tourGuideDetailContainer: { flex: 1, backgroundColor: "white" },
    swiperContainer: { flex: 1 },
    image: { height: 250, width: "100%", borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: "hidden" },
    tourGuideInfoContainer: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, alignItems: "center", marginVertical: 10 },
    tourGuideName: { color: "black", fontSize: 25, fontWeight: "bold" },
    tourGuidePrice: { fontSize: 20, color: "black" },
    aboutItemHeading: { color: "black", marginHorizontal: 20, marginVertical: 10, fontWeight: "bold", fontSize: 20 },
    aboutText: { marginHorizontal: 20, textAlign: "justify", color: "gray" },
    buttonContainer: { justifyContent: "flex-end", marginVertical: 10 },
    bookingBtn: { backgroundColor: Colors.PrimaryColor, marginHorizontal: 20, alignItems: "center", paddingVertical: 10, borderRadius: 10 },
    btnText: { color: "white", fontWeight: "bold" },
    tourGuideAddress: { color: "gray", marginHorizontal: 20 },
    cardContainer: { flex: 1, margin: 10, paddingVertical: 10, borderRadius: 10 },
    cardHeading: { textAlign: "center", color: Colors.WhiteColor, fontSize: 25, fontWeight: "bold" },
    cardBtn: { borderRadius: 10, alignItems: "center", backgroundColor: Colors.WhiteColor, alignSelf: "center", margin: 10, padding: 10 },
})