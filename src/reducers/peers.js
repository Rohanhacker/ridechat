import * as types from '../actions/types'

export const peers = (state=[], {type, payload}) => {
    switch (type) {
        case types.SEARCH:
            return [...state,payload]
        case types.CLEAR:
            return []
        default:
            return state
    }
}
