import React, { Component } from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Chats from './chats'
import Find from './find'
import Profile from './profile'

export const Main = TabNavigator({
    Find: {
        screen: Find
    },
    Chat: {
        screen: Chats
    }
})
