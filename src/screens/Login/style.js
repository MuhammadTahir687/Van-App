import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: Colors.PrimaryColor,
        // justifyContent: "center",
    },
    maincontent: {
        justifyContent: "center",
        flexGrow: 1,
        // paddingBottom:50
    },
    container: {
        flex: 1,
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
        paddingBottom: 20
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
        paddingHorizontal: 15,
        paddingVertical: 15,
        alignItems: "center",
        justifyContent: "center",

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
        marginVertical: 10,
        borderRadius: 10,
        marginHorizontal: 15,
    },
    textInput: {
        marginHorizontal: 10,
        height: 50,
        width: "100%",
        color: Colors.PrimaryColor
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
        width: '100%',
        marginBottom: 10,
    },
    languagedropdowncontainer: {
        zIndex: 1,
        marginTop: 20,
        width: "85%",
    }
})