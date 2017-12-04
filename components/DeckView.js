import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'


class DeckView extends Component {
    constructor(props) {
    	super(props);
    }

  addCard = () => {
    this.props.navigation.navigate('NewQuestion',
      { deckTitle: this.props.navigation.state.params.deckTitle})
  }

  startQuiz = () => {
    this.props.navigation.navigate('QuizView',
      { deck: this.props.navigation.state.params.deck})
  }

  render() {
    return (
      <View style={styles.container}>
      	<Text
      	style={styles.title}>udacicards</Text>
      	<Text
      	style={styles.listing}>{this.props.navigation.state.params.deck.length} cards</Text>
        <Button 
          onPress={this.addCard} 
          title="Add Card" 
          color="#000000" 
          accessibilityLabel="Submit your question and answer" />
          <View/>
         {
        this.props.navigation.state.params.deck.length > 0 ? (
        <Button 
          onPress={this.startQuiz} 
          title="Start Quiz" 
          color="#000000" 
          accessibilityLabel="Begin the quiz" />
         ) : (
         null )}
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
  title: {
	fontSize: 31,
	textAlign: 'center',
	margin: 10,
  },
  listing: {
	fontSize: 16,
	textAlign: 'center',
	color: '#333333',
	marginBottom: 5,
  },
  box: {
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: '#f0ffff',
    margin: 50,
  }
})

export default DeckView