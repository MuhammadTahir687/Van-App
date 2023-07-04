import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { Avatar } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Switch } from 'react-native-switch';
import { RootContext } from '../../components/ContextApi/ContextApi'
import { ScrollView } from 'react-native-gesture-handler'
import { AuthServices } from '../../services/authServices'
import Loader from '../../components/Loader/Loader'

const TaxiDriverProfile = ({ navigation }) => {

    const { user, setUser } = useContext(RootContext)
    const [loading, setLoading] = useState(false)
    console.log(user);

    const Submit = async () => {
        const body = {
            "biz_code": user?.taxi_driver_code,
            "biz_name": "",
            "manager_name": user?.driver_name,
            "biz_start_date": user?.registration_date,
            "biz_introduction": user?.brief_introduction,
            "country": user?.country,
            "country_code": user?.countryCode,
            "city": user?.city,
            "biz_address": "",
            "phone": user?.phone,
            "email": user?.email,
            "password": user?.password,
            "registration_date": new Date(),
            "biz_add_order": "",
            "admin_approved": false,
            "admin_remarks": "",
            "log_last_login": new Date()
        }
        console.log(body)

        try {

            setLoading(true)
            const response = await AuthServices.BA_Register(body)
            if (response) {
                console.log("response: ", response)
                setLoading(false)
                alert("Advertiser Account Registered Successfully")
            }

        } catch (error) {
            setLoading(false)
            alert("You Already Registered ")
            // alert(error?.response?.data)
            console.log(error?.response?.data)

        }



    }

    return (
        <SafeAreaView style={styles.container}>
            <Loader loading={loading} setLoading={setLoading} />
            <ScrollView>
                <View style={styles.headerContainer}>
                    {/* <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons name='arrow-back' size={20} color={Colors.WhiteColor} />
                </TouchableOpacity> */}
                    <Text style={styles.headerText}>Profile</Text>
                </View>

                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        {user?.taxi_image_url ? <Avatar
                            size="large"
                            rounded
                            icon={{ name: 'user', type: 'font-awesome' }}
                            source={{
                                uri: user?.taxi_image_url,
                            }}
                            activeOpacity={0.7}
                            containerStyle={styles.avatar}
                        />
                            :
                            <Avatar
                                size="large"
                                rounded
                                icon={{ name: 'user', type: 'font-awesome' }}
                                title={user?.driver_name?.split(" ")?.map((n) => n[0])?.join("")}
                                activeOpacity={0.7}
                                containerStyle={styles.avatar}
                            />}
                    </View>
                    <Text style={styles.profileName}>{user?.driver_name}</Text>
                    <Text style={styles.profileAdminText}>Admin Approved: {user?.admin_approved == true ? "Yes" : "No"}</Text>

                    <Text style={styles.profileDetailHeading}>Profile Detail</Text>
                    <View style={styles.profileDetail}>
                        <Ionicons name='mail' size={20} color={Colors.PrimaryColor} />
                        <Text style={styles.profileText}>{user?.email}</Text>
                    </View>
                    <View style={styles.profileDetail}>
                        <Ionicons name='call' size={20} color={Colors.PrimaryColor} />
                        <Text style={styles.profileText}>{user?.phone}</Text>
                    </View>
                    <View style={styles.profileDetail}>
                        <Ionicons name='earth' size={20} color={Colors.PrimaryColor} />
                        <Text style={styles.profileText}>{user?.country}</Text>
                    </View>
                </View>

                <View style={styles.profileCard}>
                    <Text style={styles.profileDetailHeading}>Taxi Detail</Text>
                    <View style={styles.profileDetail}>
                        <Ionicons name='car-sport' size={20} color={Colors.PrimaryColor} />
                        <Text style={styles.profileText}>Model: {user?.taxi_model_name}</Text>
                    </View>
                    <View style={styles.profileDetail}>
                        <Ionicons name='cash' size={20} color={Colors.PrimaryColor} />
                        <Text style={styles.profileText}>Rate: {user?.currency + " " + user?.hire_rate}</Text>
                    </View>
                    <View style={styles.profileDetail}>
                        <Ionicons name='earth' size={20} color={Colors.PrimaryColor} />
                        <Text style={styles.profileText}>Status: {user?.status_ready ? "Active" : "Inactive"}</Text>
                    </View>
                </View>


                <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={() => { navigation.navigate("EditTaxiDriverProfile", { userData: user }) }} style={styles.btn}>
                        <Text style={styles.btnText}>Edit Profile</Text>
                        <FontAwesome name='edit' size={20} color={Colors.PrimaryColor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Submit() }} style={styles.btn}>
                        <Text style={styles.btnText}>Advertise with us!</Text>
                        <MaterialCommunityIcons name='post' size={20} color={Colors.PrimaryColor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.reset({ index: 0, routes: [{ name: 'BusinessAccount' }], }) }} style={styles.btn}>
                        <Text style={styles.btnText}>Log Out</Text>
                        <Ionicons name='log-out-outline' size={20} color={Colors.PrimaryColor} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TaxiDriverProfile

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.PrimaryColor },
    // headerContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 10 },
    headerText: { color: Colors.WhiteColor, fontWeight: "bold", fontSize: 20, textAlign: "center", marginVertical: 10 },
    profileCard: { backgroundColor: Colors.WhiteColor, marginHorizontal: 10, borderRadius: 10, paddingVertical: 20, marginTop: 20 },
    avatar: { backgroundColor: Colors.PrimaryColor, },
    avatarContainer: { alignItems: "center" },
    profileName: { textAlign: "center", color: Colors.PrimaryColor, marginVertical: 5 },
    profileAdminText: { textAlign: "center", color: Colors.PrimaryColor, marginBottom: 5 },
    profileText: { textAlign: "center", color: Colors.PrimaryColor, marginLeft: 10 },
    profileDetail: { flexDirection: "row", marginLeft: 10, alignItems: "center" },
    profileDetailHeading: { fontWeight: "bold", marginHorizontal: 10, marginVertical: 10, color: Colors.PrimaryColor },
    btn: { backgroundColor: Colors.WhiteColor, margin: 10, height: 50, borderRadius: 10, alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, flexDirection: "row" },
    btnText: { fontWeight: "bold", color: Colors.PrimaryColor, fontSize: 15 },
    btnContainer: { flex: 1, justifyContent: "center", marginVertical: 10 },
    statusContainer: { marginHorizontal: 20, marginTop: 50, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 10 },
    statusText: { fontWeight: "bold", color: Colors.PrimaryColor },
    switchContainer: { flexDirection: "row", alignItems: "center" },
    switchLeftText: { marginRight: 10, fontSize: 10, color: Colors.PrimaryColor },
    switchRightText: { marginLeft: 10, fontSize: 10, color: Colors.PrimaryColor }
})