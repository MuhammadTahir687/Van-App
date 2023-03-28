import { View, Text } from 'react-native'
import React from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'

const Alert = ({ showAlert, onCancelPressed, onConfirmPressed, message, color }) => {
    return (
        <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="Error"
            message={message}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={false}
            cancelText="Cancel"
            confirmText="Sign Up"
            confirmButtonColor="green"
            cancelButtonColor={color}
            onCancelPressed={onCancelPressed}
            onConfirmPressed={onConfirmPressed}
        />
    )
}

export default Alert