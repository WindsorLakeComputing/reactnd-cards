import React, { Component } from 'react'
import { StyleSheet, Text, View, AppRegistry, TextInput, Button, AsyncStorage, FlatList } from 'react-native'
import { saveDeck, getDecks, clear, saveDeckTitle, addCardToDeck } from '../utils/api'
import '../ReactotronConfig'
import { CARDS_STORAGE_KEY } from '../utils/_cards'
import { StackNavigator } from 'react-navigation'
import { List, ListItem } from "react-native-elements"

class DeckList extends Component {
    constructor(props) {
    super(props);
    this.state = {
      loading: false,
      decksOfCards: {}
    };
  }

  async componentDidMount(){
    //var deckOfCards = 
    //this.setState({decksOfCards: Object.keys(JSON.parse(await getDecks()))});
    //var deckOfCards = Object.keys(JSON.parse(await getDecks()));
    this.setState({ loading: true, decksOfCards: JSON.parse(await getDecks())});

    console.log("deckOfCards is ... ", this.state.decksOfCards);

    //console.log("Inside of componentDidMount() ... The Deck of Cards are ", deckOfCards);
    /**
    console.log("Deck keys are ", Object.keys(deckOfCards));
     var aCard = { 
      question: 'Where do babies come from?',
      answer: 'The stork',
    };
    await saveDeckTitle("SmallTalk");
    await addCardToDeck("SmallTalk", aCard)
    */
    
  }

  render() {
    return (
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
            { deck: this.state.decksOfCards[item]})}
          />
        )}
      />
    </List>
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

export default DeckList;