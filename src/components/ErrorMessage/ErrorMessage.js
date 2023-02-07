import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const ErrorMessage = ({error}) => {
  return (
      <View style={styles.container}>
          <Text style={styles.text}>{error}</Text>
      </View>
  )
}

export default ErrorMessage

const styles=StyleSheet.create({
    container:{width:"100%"},
    text:{ textAlign: "left", marginLeft: 10,color:"red" }
})