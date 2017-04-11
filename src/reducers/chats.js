import * as types from '../actions/types'

export const chats = (state = {}, { type, payload}) => {
    switch (type) {
        case types.SENDMESSAGE:
            return Object.assign(state, payload)
        case types.NEWMESSAGE:
            return Object.assign(state, payload)
        default:
            return state
    }
}
