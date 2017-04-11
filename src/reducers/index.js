import { combineReducers } from 'redux'

import { user } from './user'
import { find } from './find'
import { destination } from './destination'
import { peers } from './peers'

export default combineReducers({
    user,
    find,
    destination,
    peers
})
