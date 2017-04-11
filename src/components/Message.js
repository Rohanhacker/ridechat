import React , { Component } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import { fetchMessages } from '../actions/index'

class Messages extends Component {
  constructor(props) {
    super(props)
    this.state = {messages: []}
    this.onSend = this.onSend.bind(this)
  }
  componentDidMount() {
      this.props.dispatch(fetchMessages(this.props.navigation.state.params.key))
  }
  componentWillMount() {
    this.setState({
      messages: [
        {
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
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      }
    })
  }
  render() {
      console.log(this.state)
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
      />
    )
  }
}

const mapStateToProps = (state) => ({
    chats: state.chats
})

export default connect(mapStateToProps)(Messages)