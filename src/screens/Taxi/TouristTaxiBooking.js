import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Avatar } from "react-native-elements";
import { TouchableOpacity } from 'react-native-gesture-handler';

const TouristTaxiBooking = () => {
    const data = [
        { id: 1, name: "Ali", Distance: "10 km", point: 10 },
        { id: 2, name: "Umer", Distance: "10 km", point: 5 },
    ]
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ paddingVertical: 10, backgroundColor: Colors.PrimaryColor, alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", color: Colors.WhiteColor }}>Taxi</Text>
            </View>
            {data.map((item, index) => (
                <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", elevation: 10, marginTop: 10, marginHorizontal: 10, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10 }} key={index}>
                    <Avatar
                        rounded
                        icon={{ name: 'user', type: 'font-awesome' }}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                        containerStyle={{ backgroundColor: Colors.PrimaryColor, marginHorizontal: 10 }}
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: "bold", marginVertical: 10 }}>{item.name}</Text>
                        <View style={{ width: "70%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text>Point: {item.point}</Text>
                            <Text>Distance: {item.Distance}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => { alert("Taxi Booked") }} style={{ backgroundColor: Colors.PrimaryColor, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 }}>
                        <Text style={{ color: Colors.WhiteColor }}>Book Now</Text>
                    </TouchableOpacity>

                </View>
            ))}
        </SafeAreaView>
    )
}
export default TouristTaxiBooking;