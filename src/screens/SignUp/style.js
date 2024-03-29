import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: Colors.PrimaryColor,
        justifyContent: "center",
    },
    maincontent: {
        // justifyContent: "center",
        // flex: 1,
        // paddingBottom:50
    },
    container: {
        flex: 1,
        flexGrow: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
        paddingBottom: 20
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 20,
        borderRadius: 5,
        resizeMode: "contain"
    },
    authtext: {
        color: Colors.PrimaryColor,
        textAlign: "center"
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 35,
        bottom: 30
    },
    subcontainer: {
        width: "100%",
        backgroundColor: Colors.WhiteColor,
        paddingHorizontal: 10,
        borderRadius: 20,
        paddingVertical: 15,
        alignItems: "center",


    },
    loginHeading: {
        fontWeight: "bold",
        color: Colors.PrimaryColor,
        fontSize: 20,
        textAlign: "center",
        marginVertical: 15
    },
    languageHeading: {
        fontWeight: "bold",
        color: Colors.PrimaryColor,
        fontSize: 15,
        textAlign: "center",
        marginBottom: 10
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.PrimaryColor,
        paddingHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        marginHorizontal: 15,
    },
    descriptionicon: {
        marginTop: 12
    },
    descriptionbox: {
        flexDirection: "row",
        alignItems: "flex-start",
        borderWidth: 1,
        borderColor: Colors.PrimaryColor,
        paddingHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        marginHorizontal: 15,
    },
    textbox: {
        marginHorizontal: 5,
        height: 100,
        width: "100%",
        color: Colors.PrimaryColor,
        textAlignVertical: 'top',
    },
    textInput: {
        marginHorizontal: 5,
        height: 50,
        width: "100%",
        color: Colors.PrimaryColor
    },
    rowtextInput: {
        marginLeft: 5,
        height: 50,
        width: "80%",
        color: Colors.PrimaryColor
    },
    rowinputcontainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.PrimaryColor,
    },
    rowcontainer: {
        flex: 1,
        // height:50,
        flexDirection: "row",
        marginVertical: 5,
        marginHorizontal: 5
    },
    btn: {
        backgroundColor: Colors.PrimaryColor,
        alignSelf: "center",
        paddingHorizontal: 50,
        paddingVertical: 10,
        marginTop: 10,
        borderRadius: 10,
        width: "85%",
        height: 50,
        justifyContent: "center"
    },
    btntext: {
        fontSize: 15,
        color: Colors.WhiteColor,
        textAlign: "center",
    },
    dropdowncontainer: {
        zIndex: 1,
        width: '97%',
        marginBottom: 5,
    },
    languagedropdowncontainer: {
        zIndex: 1,
        marginTop: 20,
        width: "85%",
    },
    datecontainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 4,
        marginVertical: 5,
        height: 50,
        borderColor: Colors.PrimaryColor,
        paddingHorizontal: 5
    },
    datebtn: {
        flex: 1,
        justifyContent: "center",
        width: "100%",
        marginHorizontal: 5
    },
    datetext: {
        color: Colors.PrimaryColor,
        marginLeft: 5
    },
    imageContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    loadImageBtn: {
        backgroundColor: Colors.PrimaryColor,
        paddingHorizontal: 40,
        marginVertical: 10,
        paddingVertical: 10,
        borderRadius: 10
    },
    removeImageIcon: {
        borderRadius: 50,
        backgroundColor: "red",
        alignSelf: "flex-end",
        position: "absolute",
        right: 5,
        zIndex: 10
    },
    closeIcon: {
        color: "white",
    },
    hotelImages: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 10
    },
    subContainerHeight: {
        width: "100%",
        backgroundColor: Colors.WhiteColor,
        paddingHorizontal: 10,
        borderRadius: 20,
        paddingVertical: 15,
        alignItems: "center"
    },
    subMainContainer: {
        flex: 1,
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
        paddingBottom: 20
    },
    carRentalImgContainer: {
        marginVertical: 5,
        width: "100%",
    },
    carRentalImage: {
        width: 200,
        height: 100,
        borderRadius: 5
    },
    carRemoveImageIcon: {
        borderRadius: 50,
        backgroundColor: "red",
        alignSelf: "flex-end",
        position: "absolute",
        top: -5,
        zIndex: 10
    },
    signupImagesContainer: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    listBtn: {
        margin: 5,
        alignItems: "center"
    },
    listImages: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    listText: {
        color: Colors.PrimaryColor,
        marginTop: 5,
        fontWeight: "bold",
        fontSize: moderateScale(12)
    }
})