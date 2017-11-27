import React, { Component } from 'react'
import { StyleSheet, Text, View, AppRegistry, TextInput, Button, AsyncStorage, FlatList } from 'react-native'
import { saveDeck, getDecks, clear, saveDeckTitle, addCardToDeck } from './utils/api'
import { timeToString } from './utils/helpers'
import './ReactotronConfig'
import { CARDS_STORAGE_KEY } from './utils/_cards'
import { StackNavigator } from 'react-navigation'
import { List, ListItem } from "react-native-elements"
import DeckList from './components/DeckList'
import NewQuestion from './components/NewQuestion'
import DeckView from './components/DeckView'



const MainNavigator = StackNavigator({
  DeckList: {
    screen: DeckList
  },
  NewQuestion: {
    screen: NewQuestion
  },
  DeckView: {
    screen: DeckView
  }
})

export default class App extends Component {
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
    backgroundColor: '#f0ffff',
    margin: 50,
  }
})
