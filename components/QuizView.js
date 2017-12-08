import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native'
import FlipCard from 'react-native-flip-card'
import {
  getDailyReminderValue,
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers'


class QuizView extends Component {
    constructor(props) {
    super(props);
    this.state = { 
      curDeck: {},
      flip: false,
      numCorrect: 0,
      numIncorrect: 0
    };
  }

  componentWillMount(){
    this.setState(() => ({ curDeck: this.props.navigation.state.params.deck }))
  }

  onCorrect = () => {
    this.setState((state) => ({
      numCorrect: state.numCorrect +1}))
    this.advanceCard()
  }

  onIncorrect = () => {
    this.setState((state) => ({
      numIncorrect: state.numIncorrect +1}))
    this.advanceCard()
  }

  restartQuiz = () => {
    this.setState(() => ({ curDeck: this.props.navigation.state.params.deck }))
    this.setState(() => ({ numCorrect: 0 }))
    this.setState(() => ({ numIncorrect: 0 }))
  }

  returnToDeckView = () => {
    this.props.navigation.navigate('DeckView',
      { deck: this.props.navigation.state.params.deck, 
        deckTitle: this.props.navigation.state.params.deckTitle})
  }

  advanceCard = () => {
    this.setState((state) => ({
      curDeck: state.curDeck.slice(1, state.curDeck.length)}))
  }

  calcScore = () => {
    return (this.state.numCorrect / (this.state.numCorrect + this.state.numIncorrect)) * 100;
  }

  clearNotifs = () => {
    clearLocalNotification()
      .then(setLocalNotification)
  }

  render() {
    return (
      <View style={styles.container}>
      {
        this.state.curDeck.length > 0 ? (
        <View style={{flex: .8}}>
       <FlipCard
          style={styles.card}
          flip={this.state.flip}
          friction={6}
          perspective={20}
          clickable={false}
       >
        {/* Face Side */}
        <View style={styles.face}>
          <Text>{this.state.curDeck[0]['question']}</Text>
        </View>
        {/* Back Side */}
        <View style={styles.back}>
          <Text>{this.state.curDeck[0]['answer']}</Text>
        </View>
       </FlipCard>
      <TouchableOpacity onPress={()=>{this.setState({flip: !this.state.flip})}}> 
          <Text>Answer</Text>
      </TouchableOpacity>
        <Text
        style={styles.listing}>{this.state.curDeck.length} cards left</Text>
        <Button 
          onPress={this.onCorrect}
          title="Correct" 
          color="#000000" 
          accessibilityLabel="Submit your question and answer" />
          <View/>
        <Button 
          onPress={this.onIncorrect} 
          title="Incorrect" 
          color="#000000" 
          accessibilityLabel="Begin the quiz" />
          </View>
          ) : (
          <View style={{flex: .8}}>
          <Text style={styles.title}>Thanks for playing!</Text>
          <Text style={styles.listing}>You scored {this.calcScore()}%</Text>
        <Button 
          onPress={this.restartQuiz}
          title="Restart Quiz" 
          color="#000000" 
          accessibilityLabel="Restart Quiz" />
          <View/>
        <Button 
          onPress={this.returnToDeckView} 
          title="Return to Deck" 
          color="#000000" 
          accessibilityLabel="Begin the quiz" />
          {this.clearNotifs()}
          </View>
         )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width:100,
    margin: 3,
  },
  face: {
    flex:1,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    flex:1,
    backgroundColor: '#f1c40f',
    justifyContent: 'center',
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

export default QuizView