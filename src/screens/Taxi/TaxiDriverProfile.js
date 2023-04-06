import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { Avatar } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { get_data } from '../../components/Storage/Storage'
import { RootContext } from '../../components/ContextApi/ContextApi'
import { ScrollView } from 'react-native-gesture-handler'


const TaxiDriverProfile = ({ navigation }) => {

    const { user, setUser } = useContext(RootContext)

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    {/* <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons name='arrow-back' size={20} color={Colors.WhiteColor} />
                </TouchableOpacity> */}
                    <Text style={styles.headerText}>Profile</Text>
                    {/* <TouchableOpacity onPress={() => { navigation.navigate("BusinessAccountSignup", { userData: user, cat: "TD" }) }}>
                    <FontAwesome name='edit' size={20} color={Colors.WhiteColor} />
                </TouchableOpacity> */}
                </View>

                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Avatar
                            size="medium"
                            rounded
                            icon={{ name: 'user', type: 'font-awesome' }}
                            source={{
                                uri: user?.taxi_image_url,
                            }}
                            activeOpacity={0.7}
                            containerStyle={styles.avatar}
                        />
                    </View>
                    <Text style={styles.profileName}>{user?.driver_name}</Text>
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
                    <View style={styles.profileDetail}>
                        <Ionicons name='information-circle' size={20} color={Colors.PrimaryColor} />
                        <Text style={styles.profileText}>Admin Approved: {user?.admin_approved == false ? "Not Approved" : "Approved"}</Text>
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
    profileText: { textAlign: "center", color: Colors.PrimaryColor, marginLeft: 10 },
    profileDetail: { flexDirection: "row", marginLeft: 10, alignItems: "center" },
    profileDetailHeading: { fontWeight: "bold", marginHorizontal: 10, marginVertical: 10, color: Colors.PrimaryColor },
    btn: { backgroundColor: Colors.WhiteColor, margin: 10, height: 50, borderRadius: 10, alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, flexDirection: "row" },
    btnText: { fontWeight: "bold", color: Colors.PrimaryColor, fontSize: 15 },
    btnContainer: { flex: 1, justifyContent: "center", marginVertical: 10 }
})