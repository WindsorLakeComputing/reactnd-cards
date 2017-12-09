import { Notifications, Permissions } from 'expo'
import React from 'react'
import { AsyncStorage } from 'react-native'
import { StackNavigator } from 'react-navigation'
import DeckList from '../components/DeckList'
import NewQuestion from '../components/NewQuestion'
import NewDeck from '../components/NewDeck'
import DeckView from '../components/DeckView'
import QuizView from '../components/QuizView'


const NOTIFICATION_KEY = 'UdaciCards:notifications'


export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'You need to study!',
    body: "You haven't studied today. Do it NOW!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tdyThreePM = new Date()
              tdyThreePM.setDate(tdyThreePM.getDate() + 1)
              tdyThreePM.setHours(15);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tdyThreePM,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export const MainNavigator = StackNavigator({
  DeckList: {
    screen: DeckList
  },
  NewQuestion: {
    screen: NewQuestion
  },
  NewDeck: {
    screen: NewDeck
  },
  DeckView: {
    screen: DeckView
  },
  QuizView: {
    screen: QuizView
  }
})


