import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Login from './components/login'
import { store } from './store'
import { persistStore } from 'redux-persist'
import { AsyncStorage, Text } from 'react-native'



export default class App extends Component {
    constructor() {
        super()
        this.state = {
            rehydrated: false
        }
    }
    componentDidMount() {
        persistStore(store, {storage: AsyncStorage}, () => {
            console.log('restored')
            this.setState({
                rehydrated: true
            })
        })
    }
    render() {
        if(this.state.rehydrated) {
            return (
                <Provider store={store} >
                    <Login />
                </Provider>
            )
        } else {
            return (
                <Text>Loading..</Text>
            )
        }
    }
}

