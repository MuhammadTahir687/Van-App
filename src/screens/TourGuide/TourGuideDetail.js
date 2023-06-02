import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, ImageBackground, useWindowDimensions } from 'react-native'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Colors } from '../../constants/Colors';
import Trip1 from '../../assets/Trip1.jpg';
import Trip2 from '../../assets/Trip2.jpg';
import Trip3 from '../../assets/Trip3.jpg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TourGuideCardList from '../../components/TourGuideCard/TourGuideCardList';
import Tour from '../../assets/tour.jpeg'

const TourGuideDetail = ({ route, navigation }) => {

    const { width, height } = useWindowDimensions()
    const data = route?.params?.data
    const placesData = route?.params?.placesData
    const images = [{ id: 1, image: data?.place_image_url }]

    const filterPlacesData = placesData?.filter((item) => item?.guide_code == data?.guide_code)

    return (
        <SafeAreaView style={styles.tourGuideDetailContainer}>
            <ScrollView>
                <View style={styles.swiperContainer}>
                    {data?.trips_view_url?.length > 0 ? <SwiperFlatList
                        showPagination
                        paginationActiveColor={Colors.PrimaryColor}
                        data={data?.trips_view_url}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item?.url }} style={{ width: width, height: 250 }} />
                        )}
                    />
                        :
                        <Image source={Tour} style={{ width: width, height: 250 }} />
                    }
                </View>
                {/* <ImageBackground source={data?.image} style={styles.image}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={20} color={'white'} style={{ margin: 20 }} />
                    </TouchableOpacity>
                </ImageBackground> */}
                <View>
                    <View style={styles.tourGuideInfoContainer}>
                        <Text style={styles.tourGuideName}>{data?.guide_name}</Text>

                        {/* <Text style={styles.tourGuidePrice}>{data?.currency + " " + data?.trip_fee}</Text> */}
                    </View>

                    <View style={styles.addressLimitContainer}>
                        <Text style={styles.tourGuideAddress}>{data?.city + ", " + data?.country}</Text>
                        {/* <Text style={styles.tourGuideAddress}>Limit:{data?.visitors_limit}</Text> */}
                    </View>


                    <Text style={styles.aboutItemHeading}>Tour Places</Text>
                    {filterPlacesData?.map((item, index) => (
                        <TouchableOpacity onPress={() => { navigation.navigate("TourPlacesDetail", { data: item }) }} key={index} style={{ flex: 1, marginVertical: 5, marginHorizontal: 10, flexDirection: "row" }}>
                            <Image source={{ uri: item?.place_image_url }} style={{ width: "50%", height: 100, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} />
                            <View style={{ backgroundColor: "white", elevation: 3, width: "50%", borderTopRightRadius: 10, borderBottomRightRadius: 10, paddingLeft: 10, justifyContent: "center" }}>
                                <Text style={{ fontWeight: "bold" }}>{item?.trip_name}</Text>
                                <Text>Price: {item?.currency + " " + item?.trip_fee}</Text>
                                <Text>Meeting Place: {item?.meeting_place}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                {/* <View>
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
                        <Text style={styles.cardHeading}>Standard $500</Text>
                        <TourGuideCardList text={"7 Days, 6 NIghts"} />
                        <TourGuideCardList text={"Hotel Stay"} />
                        <TourGuideCardList text={"Sightseeing (Tickets Not Included)"} />
                        <TouchableOpacity onPress={() => { alert("Guide is Booked") }} style={styles.cardBtn}>
                            <Text style={{ color: "#3D62C1" }}>Choose Plan</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.cardContainer, backgroundColor: "#FE3773" }}>
                        <Text style={styles.cardHeading}>Premium $700</Text>
                        <TourGuideCardList text={"7 Days, 6 NIghts"} />
                        <TourGuideCardList text={"Hotel Stay"} />
                        <TourGuideCardList text={"Sightseeing (Tickets Not Included)"} />
                        <TouchableOpacity onPress={() => { alert("Guide is Booked") }} style={styles.cardBtn}>
                            <Text style={{ color: "#FE3773" }}>Choose Plan</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
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
    addressLimitContainer: { flexDirection: "row", justifyContent: "space-between" }
})