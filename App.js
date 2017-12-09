import React, { Component } from 'react'
import { StyleSheet, Text, View, AppRegistry, TextInput, Button, AsyncStorage, FlatList } from 'react-native'
import { saveDeck, getDecks, clear, saveDeckTitle, addCardToDeck } from './utils/api'
import { timeToString } from './utils/helpers'
import './ReactotronConfig'
import { CARDS_STORAGE_KEY } from './utils/_cards'
import { List, ListItem } from "react-native-elements"
import { setLocalNotification } from './utils/helpers'
import { MainNavigator } from './utils/helpers'
import { lightBlue } from './utils/colors'


export default class App extends Component {

  componentDidMount() {
    setLocalNotification()
}

  render() {
    
    return (
      <View style={{flex: 1}}>

          <MainNavigator />
       </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  box: {
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: lightBlue,
    margin: 50,
  }
})
