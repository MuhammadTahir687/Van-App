import { View, Text } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootContext } from '../../components/ContextApi/ContextApi'
import { get_data } from '../../components/Storage/Storage'

const CarRentalBookings = () => {

    const { user, setUser } = useContext(RootContext)

    useEffect(() => {
        UserData()
    }, [])

    const UserData = async () => {
        const data = await get_data("user")
        console.log(data)
        setUser(data)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>No Data</Text>
            </View>
        </SafeAreaView>
    )
}

export default CarRentalBookings