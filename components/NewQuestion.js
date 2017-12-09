import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native'
import { addCardToDeck } from '../utils/api'
import { lightBlue, black } from '../utils/colors'

class NewQuestion extends Component {
    constructor(props) {
    super(props);
    this.state = { 
      question: 'Enter your question here',
      answer: 'Enter your answer here',
    };
  }

  submit = () => {
    this.setState(() => ({ question: 'Enter your question here', answer: 'Enter your answer here' }))
    var newCard = {
      question: this.state.question,
      answer: this.state.answer,
    }
    let newDeck = this.props.navigation.state.params.deck;
    newDeck.push(newCard);
    addCardToDeck(this.props.navigation.state.params.deckTitle, newCard);
    this.props.navigation.navigate('DeckView',
            { deck: newDeck, 
              deckTitle: this.props.navigation.state.params.deckTitle});
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
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
          color={black}
          accessibilityLabel="Submit your question and answer" />
      </KeyboardAvoidingView>
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

export default NewQuestion