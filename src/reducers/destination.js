import * as types from '../actions/types'

export const destination = (state = '', { type, payload}) => {
    switch (type) {
        case types.SET_DESTINATION:
            return payload
        default:
            return state
    }
}