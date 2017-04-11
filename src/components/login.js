import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'
import { Button} from 'native-base'
import { connect } from 'react-redux'
import { doLogin } from '../actions/index'
import { Main } from './Router'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            width: 0,
            height: 0
        }
    }
    onChangeLayout = (e) => {
        this.setState({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height
        })
    }
    onPress = (e) => {
        this.props.dispatch(doLogin(this.state.username,this.state.password))
    }
    onUsername = (e) => {
        this.setState({
            username: e
        })
    }
    onPassword = (e) => {
        this.setState({
            password: e
        })
    }
    render() {
        if(!this.props.user.email) {
            return (
                <View style={styles.container} onLayout={this.onChangeLayout}>
                    <Image source={require('../../bg.jpeg')} style={[styles.imgContainer,{height: this.state.height},{width: this.state.width}]}>
                        <Text style={styles.branding}>rideChat</Text>
                        <View style={styles.formContainer}>
                            <View style={styles.usernameInput}>
                                <TextInput value={this.state.username} onChangeText={this.onUsername} style={styles.input} placeholder='Username or Email'/>
                            </View>
                            <View style={styles.usernameInput}>
                                <TextInput value={this.state.password} onChangeText={this.onPassword} style={styles.input} secureTextEntry  placeholder='Password'/>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={this.onPress}>
                                    <View style={styles.loginBtn}>
                                        <Text style={styles.login}>LogIn</Text>
                                    </View>
                                </TouchableOpacity>
                                <Text style={{color: 'white'}}>or</Text>
                                <TouchableOpacity>
                                    <Text style={styles.signup}>Signup</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Image>
                </View>
            )
        } else {
            return (
                <Main />
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    imgContainer: {
        flex: 1,
        alignItems: 'center'
    },
    branding: {
        color: 'white',
        fontSize: 60,
        marginTop: 90
    },
    formContainer: {
        flex: 1,
        width: 300,
        justifyContent: 'center'
    },
    usernameInput: {
        margin: 10,
        backgroundColor: 'white'
    },
    input: {
        fontSize: 16,
        padding: 12
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 20
    },
    loginBtn: {
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        margin: 10
    },
    login: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    signup: {
        color: 'white',
        fontSize: 20,
        margin: 10
    }
})

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Login)