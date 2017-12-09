import React, { Component } from 'react'
import { StyleSheet, Text, View, AppRegistry, TextInput, Button, AsyncStorage, FlatList } from 'react-native'
import { saveDeck, getDecks, clear, saveDeckTitle, addCardToDeck } from '../utils/api'
import '../ReactotronConfig'
import { CARDS_STORAGE_KEY } from '../utils/_cards'
import { StackNavigator } from 'react-navigation'
import { List, ListItem } from "react-native-elements"
import { black, lightBlue } from '../utils/colors'

class DeckList extends Component {
    constructor(props) {
    super(props);
    this.state = {
      loading: false,
      decksOfCards: {}
    };
  }

  async componentDidMount(){
    this.setState({ loading: true, decksOfCards: JSON.parse(await getDecks())});
  }

  addNewDeck = () => {
    this.props.navigation.navigate('NewDeck')
  }

  render() {
    return (
      <View style={styles.container}>
      <Button 
          onPress={this.addNewDeck}
          title="Add a New Deck" 
          color={black} 
          accessibilityLabel="Submit your question and answer" />
      <List>
      <FlatList
        data={Object.keys(this.state.decksOfCards)}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <ListItem
            title={item}
            key={item}
            subtitle={Object.keys(this.state.decksOfCards[item]).length}
            onPress={() => this.props.navigation.navigate('DeckView',
            { deck: this.state.decksOfCards[item], deckTitle: item})}
          />
        )}
      />
    </List>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  box: {
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: lightBlue,
    margin: 50,
  }
})

export default DeckList;