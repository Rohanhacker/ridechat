import React, { Component } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import { fetchMessages } from '../actions/index'
import firebase from '../firebase'

class Messages extends Component {
    static navigationOptions = {
        title: 'chat'
    }
    constructor(props) {
        super(props)
        this.state = { messages: [] }
        this.onSend = this.onSend.bind(this)
    }
    componentDidMount() {
        this.props.dispatch(fetchMessages(this.props.navigation.state.params.key))
    }
    componentWillMount() {
        this.setState({
            messages: [{
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: Date.now(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                },
                {
                    _id: 2,
                    text: 'yolo bro',
                    createdAt: Date.now(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                }
            ],
        })
    }
    onSend(messages = []) {
        console.log(messages)
        let temp = {
            user: {
                name: firebase.auth().currentUser.displayName || 'rohan',
                avatar: firebase.auth().currentUser.photoURL || 'http://static.tvtropes.org/pmwiki/pub/images/L__fancel__from_Death_Note_by_escaf.jpg'
            }
        }
        let ownmsg = Object.assign(messages[0], temp)
        ownmsg.user._id = 1
        ownmsg.createdAt = Date.now()
        let key = firebase.database().ref(firebase.auth().currentUser.uid).push().key
        let ref = firebase.database().ref(`${firebase.auth().currentUser.uid}/${key}`)
        ref.set(ownmsg)
        let othermsg = messages[0]
        othermsg.user._id = 2
        othermsg.createdAt = Date.now()
        ref = firebase.database().ref(`${this.props.navigation.state.params.key}/${key}`)
        ref.set(othermsg)
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            }
        })
    }
    render() {
        let texts = this.props.chats.reverse()
            // will add a filter here
        return ( <
            GiftedChat messages = { texts }
            onSend = { this.onSend }
            user = {
                {
                    _id: 1,
                }
            }
            />
        )
    }
}

const mapStateToProps = (state) => ({
    chats: state.chats
})

export default connect(mapStateToProps)(Messages)