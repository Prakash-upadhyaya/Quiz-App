import { View, Text } from 'react-native'
import React from 'react'
import HomeNavigation from './src/navigation/HomeNavigation'
import { Provider } from 'react-redux'
import store from './src/redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <HomeNavigation />
    </Provider>
  )
}

export default App