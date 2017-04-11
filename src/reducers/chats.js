import * as types from '../actions/types'

export const chats = (state = [], { type, payload}) => {
    switch (type) {
        case types.SENDMESSAGE:
            return [...state,payload]
        case types.NEWMESSAGE:
            return [...state,payload]
        default:
            return state
    }
}