import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import StackNavigation from './src/navigation/Stack/index'
import ContextProvider from './src/components/ContextApi/ContextApi'
import OneSignal from 'react-native-onesignal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {

  useEffect(() => {
    GetDeviceData()
  }, [

  ])

  const GetDeviceData = async () => {
    const data = await OneSignal.getDeviceState();

  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ContextProvider>
        <StackNavigation />
      </ContextProvider>
    </GestureHandlerRootView>

  )
}

export default App