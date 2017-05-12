import React, { Component } from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Chats from './chats'
import Find from './find'
import Profile from './profile'
import Message from './Message'
import Logout from './logout'
import Signup from './signup'
import Login from './login'

export const Chat = StackNavigator({
    List: {
        screen: Chats
    },
    Message: {
        screen: Message
    }
})

export const Home = StackNavigator({
    Signup: {
        screen: Signup
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
