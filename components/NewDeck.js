import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { saveDeckTitle } from '../utils/api'


class NewDeck extends Component {
    constructor(props) {
    super(props);
    this.state = { 
      title: 'Deck Title',
    };
  }

  submit = () => {
    saveDeckTitle(this.state.title).then((data) =>{
      this.props.navigation.navigate('DeckList');
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
        style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
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
  },
  title: {
    fontSize: 31,
    textAlign: 'center',
    margin: 10,
  },
})

export default NewDeck