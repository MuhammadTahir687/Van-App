import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { get_data } from '../../components/Storage/Storage'
import { RootContext } from '../../components/ContextApi/ContextApi'

const TourGuideBookings = () => {
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

export default TourGuideBookings
