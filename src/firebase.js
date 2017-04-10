import * as firebase from 'firebase'

const config = {
    apiKey: 'AIzaSyA39FmGzItxgXjwHSZcdkw83YPwgATG-r8',
    authDomain: 'ridechat-fda9a.firebaseapp.com',
    databaseURL: 'https://ridechat-fda9a.firebaseio.com',
    projectId: 'ridechat-fda9a',
    storageBucket: 'ridechat-fda9a.appspot.com',
    messagingSenderId: '107426729081'
}

firebase.initializeApp(config)

export default firebase
