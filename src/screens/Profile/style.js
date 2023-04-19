import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: Colors.WhiteColor,
        justifyContent: "center",

    },
    maincontent: {
        // justifyContent: "center",
        // flex: 1,
        // paddingBottom:50
    },
    container: {
        flex: 1,
        marginHorizontal: 20,
    },
    image: {
        width: 200,
        height: 100,
        marginVertical: 20
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
        justifyContent: "center"

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
        width: "90%",
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
        height: 50,
        flexDirection: "row",
        marginVertical: 5,
        marginHorizontal: 15
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
        width: '91%',
        marginBottom: 5,
        marginHorizontal: 15
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
        marginHorizontal: 15,
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
    fieldName: {
        textAlign: "left",
        width: "100%",
        left: 10,
        color: Colors.PrimaryColor
    },
    imageBtn: {
        backgroundColor: Colors.PrimaryColor,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 10,
        marginHorizontal: 15,
        marginTop: 5
    },
    imageBtnText: {
        color: Colors.WhiteColor,
        textAlign: "center"
    },
    imageContainer: {
        alignItems: "center"
    },
    taxiImage: {
        width: 200,
        height: 200,
        margin: 10,
        borderRadius: 10
    }
})