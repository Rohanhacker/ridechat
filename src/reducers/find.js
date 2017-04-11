import * as types from '../actions/types'

export const find = (state = '', { type, payload}) => {
    switch (type) {
        case types.FIND:
            return payload
        default:
            return state
    }
}