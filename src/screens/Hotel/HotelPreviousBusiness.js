import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Colors } from '../../constants/Colors'

const HotelPreviousBusiness = () => {

    const Buttons = [
        { id: 1, name: "My Bookings in Period" },
        { id: 2, name: "My Business by Date" },
        { id: 3, name: "My Due Commission by Date" },
    ]
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ margin: 10, marginTop: 30 }}>
                {Buttons.map((item, index) => (
                    <TouchableOpacity key={index} style={{ backgroundColor: Colors.PrimaryColor, paddingVertical: 10, borderRadius: 5, marginVertical: 5 }}>
                        <Text style={{ textAlign: "center", color: Colors.WhiteColor }}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>No Data</Text>

            </View>
        </SafeAreaView>
    )
}

export default HotelPreviousBusiness

const styles = StyleSheet.create({
    container: { flex: 1 }
})