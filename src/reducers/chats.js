import * as types from '../actions/types'

export const chats = (state = [], { type, payload}) => {
    switch (type) {
        case types.SENDMESSAGE:
            let o = Object.keys(payload).map(function (key) { return payload[key]; })
            return o
        case types.NEWMESSAGE:
            let k = Object.keys(payload).map(function (key) { return payload[key]; })
            console.log(k)
            return k
        default:
            return state
    }
}
