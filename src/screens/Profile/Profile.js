import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { Avatar } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { get_data } from '../../components/Storage/Storage'
import { RootContext } from '../../components/ContextApi/ContextApi'


const Profile = ({ navigation }) => {

    const { user } = useContext(RootContext)


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                {/* <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons name='arrow-back' size={20} color={Colors.WhiteColor} />
                </TouchableOpacity> */}
                <Text style={styles.headerText}>Profile</Text>
                {/* <TouchableOpacity onPress={() => { navigation.navigate("PersonelAccountSignup") }}>
                    <FontAwesome name='edit' size={20} color={Colors.WhiteColor} />
                </TouchableOpacity> */}
            </View>

            <View style={styles.profileCard}>
                <View style={styles.avatarContainer}>
                    <Avatar
                        size="medium"
                        rounded
                        icon={{ name: 'user', type: 'font-awesome' }}
                        title={user?.tourist_name?.split(" ")?.map((n) => n[0])?.join("")}
                        activeOpacity={0.7}
                        containerStyle={styles.avatar}
                    />
                </View>
                <Text style={styles.profileName}>{user?.tourist_name}</Text>
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
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate("EditTouristProfile", { userData: user }) }}>
                    <Text style={styles.btnText}>Edit Profile</Text>
                    <FontAwesome name='edit' size={20} color={Colors.PrimaryColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.reset({ index: 0, routes: [{ name: 'PersonelAccount' }], }) }} style={styles.btn}>
                    <Text style={styles.btnText}>Log Out</Text>
                    <Ionicons name='log-out-outline' size={20} color={Colors.PrimaryColor} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Profile

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
    btnContainer: { flex: 1, justifyContent: "center" }
})