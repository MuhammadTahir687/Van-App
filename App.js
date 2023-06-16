import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import StackNavigation from './src/navigation/Stack/index'
import ContextProvider from './src/components/ContextApi/ContextApi'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ContextProvider>
        <StackNavigation />
      </ContextProvider>
    </GestureHandlerRootView>

  )
}

export default App