import { combineReducers } from 'redux'

import { user } from './user'
import { find } from './find'
import { destination } from './destination'
import { peers } from './peers'
import { chats } from './chats'

export default combineReducers({
    user,
    find,
    destination,
    peers,
    chats
})
