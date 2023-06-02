import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Colors } from '../../constants/Colors'

const TourGuideCardList = ({ text }) => {
    return (
        <View style={styles.listContainer}>
            <FontAwesome5 name={"check-circle"} color={Colors.WhiteColor} />
            <Text style={styles.listText}>{text}</Text>
        </View>
    )
}

export default TourGuideCardList

const styles = StyleSheet.create({
    listContainer: { flexDirection: "row", marginHorizontal: 10, alignItems: "center" },
    listText: { color: Colors.WhiteColor, marginLeft: 10 }

})