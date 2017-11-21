import React, { Component } from 'react'
import { StyleSheet, Text, View, AppRegistry, TextInput, Button } from 'react-native'
import { submitCard, removeCard, getAll, saveDeck, getDeck, getDecks, clear, saveDeckTitle, addCardToDeck } from './utils/api'
import { timeToString } from './utils/helpers'
import './ReactotronConfig'
import { AsyncStorage } from 'react-native'
import { CARDS_STORAGE_KEY } from './utils/_cards'

export default class App extends Component {
    constructor(props) {
    super(props);
    this.state = { 
      question: 'Enter your question here',
      answer: 'Enter your answer here',
    };
  }

  async componentDidMount(){
    var deckOfCards = JSON.parse(await getDecks());
    console.log("Inside of componentDidMount() ... The Deck of Cards are ", deckOfCards);
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

  submit = () => {
    var deckOfCards = {
      "JavaScript" : [
      {
        "question" : "what is UP???",
        "answer" : "big bucks"
      },
      {
        "question" : "Anything new???",
        "answer" : "yup"
      },
      {
        "question" : "What\'s the matter ?",
        "answer" : "nothing"
      }
  ],
      "ReactJS" : [
      {
        "question" : "Favorite book?",
        "answer" : "Wizard of Oz"
      },
      {
        "question" : "Favorite car?",
        "answer" : "Taurus"
      },
      {
        "question" : "Favorite food?",
        "answer" : "hamburger"
      }
  ]
}
    console.log("The DICT is BEFORE stringify ... ", deckOfCards);
    //console.log("The DICT is AFTER stringify ... ", JSON.stringify({deckOfCards}));
    //clear();
    saveDeck(deckOfCards)
    console.log("Here comes the keys");


    this.setState(() => ({ question: 'Enter your question here', answer: 'Enter your answer here' }))

    // Clear local notification
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
        onChangeText={(question) => this.setState({question})}
        value={this.state.question}
        style={styles.box}/>
        <TextInput
        onChangeText={(answer) => this.setState({answer})}
        value={this.state.answer}
        style={styles.box}/>
        <Button 
        onPress={this.submit} 
        title="Submit" 
        color="#000000" 
        accessibilityLabel="Submit your question and answer" />
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

//export default FlexboxExamples;