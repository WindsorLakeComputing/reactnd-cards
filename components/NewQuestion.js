import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'


class NewQuestion extends Component {
    constructor(props) {
    super(props);
    this.state = { 
      question: 'Enter your question here',
      answer: 'Enter your answer here',
    };
  }

  componentDidMount(){
    console.log("Inside of NewQuestion.js ... deck ===", this.props.navigation.state.params.deck)
  }

  submit = () => {
    this.setState(() => ({ question: 'Enter your question here', answer: 'Enter your answer here' }))
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

export default NewQuestion