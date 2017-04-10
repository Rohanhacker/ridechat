import * as types from '../actions/types'

export const user = (state = {}, { type, payload}) => {
    switch (type) {
        case types.LOGIN:
            return payload
        case types.LOGIN_ERROR:
            return payload
        default:
            return state
    }
}