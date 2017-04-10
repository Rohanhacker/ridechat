import * as types from './types'
import firebase from '../firebase'

export const doLogin = (username, password) => {
    return (dispatch) => {
        // loading || in process

        // login async
        firebase.auth().signInWithEmailAndPassword(username, password).then((user) => {
                if(!user) {
                    throw new Error('incorrect password')
                }
                dispatch({type: types.LOGIN ,payload: user})
            }).catch((error) => {
                dispatch({type: types.LOGIN_ERROR, payload: {error: true}})
            })
    }
}