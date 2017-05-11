import React, { Component } from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Chats from './chats'
import Find from './find'
import Profile from './profile'
import Message from './Message'
import Logout from './logout'

export const Chat = StackNavigator({
    List: {
        screen: Chats
    },
    Message: {
        screen: Message
    }
})

export const Main = TabNavigator({
    Find: {
        screen: Find
    },
    Chat: {
        screen: Chat
    },
    Profile: {
        screen: Logout
    }
})
