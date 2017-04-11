import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class Chats extends Component {
    static navigationOptions = {
        title: 'Chats'
    }
    render() {
        console.log(this.props.navigation.state.params)
        return (
            <View>
                <Text>Hello</Text>
                <TextInput />
            </View>
        )
    }
}