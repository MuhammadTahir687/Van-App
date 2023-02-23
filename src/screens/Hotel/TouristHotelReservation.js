import React from 'react';
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HotelRoom1 from '../../assets/HotelRoom1.jpeg';
import HotelRoom2 from '../../assets/HotelRoom2.jpeg';
import HotelRoom3 from '../../assets/HotelRoom3.jpg';
import { Rating } from 'react-native-elements';
import { Colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

const TouristHotelReservation = () => {
    const navigation = useNavigation();
    const HotelData = [
        { id: 1, name: "Lux Hotel", address: "Barcelona, Spain", image: HotelRoom1, price: 200 },
        { id: 2, name: "Royal Hotel", address: "Lahore, Pakistan", image: HotelRoom2, price: 300 },
        { id: 3, name: "Nova Hotel", address: "Lahore, Pakistan", image: HotelRoom3, price: 250 }
    ]
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headertext}>Hotel Reservation</Text>
            </View>
            <FlatList
                data={HotelData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => { navigation.navigate("HotelDetail", { data: item }) }} style={{ margin: 10, borderRadius: 10, backgroundColor: "white" }}>
                        <Image source={item.image} style={{ width: "100%", height: 150, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.name}</Text>
                                <Text style={{ color: "#ababab" }}>{item.address}</Text>
                            </View>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 15 }}>{'$ ' + item.price}</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}
export default TouristHotelReservation;

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { paddingVertical: 10, backgroundColor: Colors.PrimaryColor, alignItems: "center" },
    headertext: { fontWeight: "bold", color: Colors.WhiteColor },

})