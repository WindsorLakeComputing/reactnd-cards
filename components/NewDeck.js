import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { black, lightGrey } from '../utils/colors'

class NewDeck extends Component {
    constructor(props) {
    super(props);
    this.state = { 
      title: 'Deck Title',
    };
  }

  submit = () => {
    saveDeckTitle(this.state.title).then((data) =>{
      this.props.navigation.navigate('DeckView',
        { deck: [], deckTitle: this.state.title})})
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text
        style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
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
    backgroundColor: lightGrey,
    margin: 50,
  },
  title: {
    fontSize: 31,
    textAlign: 'center',
    margin: 10,
  },
})

export default NewDeck