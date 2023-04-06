import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Switch } from 'react-native-switch';
import { TaxiServices } from '../../services/taxiServices';
import { get_data, save_data } from '../../components/Storage/Storage';
import { RootContext } from '../../components/ContextApi/ContextApi';


const TaxiDriverBookings = () => {

    const { user, setUser } = useContext(RootContext)

    useEffect(() => {
        UserData()
    }, [])

    const UserData = async () => {
        const data = await get_data("user")
        console.log(data)
        setUser(data)
    }

    console.log("Data==========", user?.status_ready)


    const [status, setStatus] = useState(false)
    const [status1, setStatus1] = useState(false)


    const Submit = async (val) => {
        try {
            const response = await TaxiServices.TaxiDriverStatus(user?.taxi_driver_code, val)
            if (response) {
                console.log(response.data)
                await save_data("user", response.data)
                UserData()
            }

        } catch (error) {
            console.log("error: ", error)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.statusContainer}>
                <Text style={styles.statusText}>Taxi Driver Status</Text>
                <View style={styles.switchContainer}>
                    <Text style={{ marginRight: 10, fontSize: 10 }}>Inactive</Text>
                    <Switch
                        value={user?.status_ready}
                        onValueChange={(val) => { setStatus(val), Submit(val) }}
                        disabled={false}
                        activeText={''}
                        inActiveText={''}
                        circleSize={30}
                        barHeight={20}
                        circleBorderWidth={1}
                        backgroundActive={'green'}
                        backgroundInactive={'red'}
                        circleActiveColor={'#30a566'}
                        circleInActiveColor={'red'}

                    />
                    <Text style={{ marginLeft: 10, fontSize: 10 }}>Active</Text>
                </View>
            </View>
            <View style={styles.statusContainer}>
                <Text style={styles.statusText}>Taxi Driver Status (Review Only)</Text>
                <TouchableOpacity onPress={() => setStatus1(!status1)} style={{ right: 20, backgroundColor: status1 == false ? "red" : "green", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }}>
                    <Text style={{ color: "white" }}>{status1 == false ? "Inactive" : "Active"}</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.dataContainer}>
                <Text>No Data</Text>

            </View>
        </SafeAreaView>
    )
}

export default TaxiDriverBookings

const styles = StyleSheet.create({
    container: { flex: 1 },
    statusContainer: { marginHorizontal: 20, marginTop: 50, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 10 },
    statusText: { fontWeight: "bold" },
    switchContainer: { flexDirection: "row", alignItems: "center" },
    dataContainer: { flex: 1, alignItems: "center", justifyContent: "center" }


})