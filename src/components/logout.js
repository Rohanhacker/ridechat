import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import * as types from '../actions/types'
import { Logout } from '../actions/index'
import firebase from '../firebase'

class Profile extends Component {
    static navigationOptions = {
        title: 'Profile'
    }
    onPress = () => {
        firebase.auth().signOut().then(() => {
            console.log('logged out')
        })
        this.props.dispatch(Logout())
    }
    render() {
        return (
            <Button title='LOGOUT' onPress={this.onPress} />
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Profile)