import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TaxiDriverCommision = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>No Data</Text>

            </View>
        </SafeAreaView>
    )
}

export default TaxiDriverCommision

const styles = StyleSheet.create({
    container: { flex: 1 }
})