import { Button, Overlay } from 'react-native-elements';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors';

const Loader = ({ loading, setLoading }) => {


    const toggleOverlay = () => {
        setLoading(!loading);
    };

    return (
        <Overlay visible={loading} onBackdropPress={toggleOverlay} >
            <ActivityIndicator loading={loading} animating={true} color={"black"} />
        </Overlay>
    )
}

export default Loader

const styles = StyleSheet.create({})