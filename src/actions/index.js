import * as types from './types'
import firebase from '../firebase'
import GeoFire from 'geofire'

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

export const getLift = () => {
    return {type: types.FIND, payload: 'Get Lift'}
}

export const shareRide = () => {
    return {type: types.FIND, payload: 'Share your Ride'}
}

export const setDestination = (loc) => {
    return {type: types.SET_DESTINATION, payload: loc}
}

export const findPeers = (destination,coordinates,type) => {

    return (dispatch) => {
        // find nearby people
        let ref = firebase.database().ref(`places/${destination}/${type}`)
        let geofire = new GeoFire(ref)
        let geoQuery = geofire.query({
            center: coordinates,
            radius: 100
        })
        geoQuery.on('key_entered', (key, location, distance) => {
            let ref = firebase.database().ref(`places/${destination}/${type}/${key}`)
            ref.once('value').then(function(snapshot) {
                let email = snapshot.val().email
                let displayName = snapshot.val().displayName
                let photoURL = snapshot.val().photoURL
                let peer = {
                    email,
                    displayName,
                    photoURL,
                    key,
                    distance
                }
                if(key!== firebase.auth().currentUser.uid) {
                    dispatch({type: types.SEARCH, payload: peer})
                }
            })
        })
    }
}

export const addToList = (destination,coordinates,type) => {
        let ref = ''
        let uid = firebase.auth().currentUser.uid
        if(type==='share') {
            ref = firebase.database().ref(`places/${destination}/lift/${uid}`)
        } else {
            ref = firebase.database().ref(`places/${destination}/share/${uid}`)
        }
        ref.remove()
        let newref = firebase.database().ref(`places/${destination}/${type}`)
        let geofire = new GeoFire(newref)
        geofire.set(uid, coordinates).then(() => {
            console.log('added')
            newref.child(uid).child('email').set(firebase.auth().currentUser.email)
            newref.child(uid).child('displayName').set(firebase.auth().currentUser.displayName)
            if(firebase.auth().currentUser.photoURL) {
                newref.child(uid).child('photoURL').set(firebase.auth().currentUser.photoURL)
            } else {
                newref.child(uid).child('photoURL').set('http://static.tvtropes.org/pmwiki/pub/images/L__fancel__from_Death_Note_by_escaf.jpg')
            }
        }, (err) => {
            console.log(err)
        })
    }
