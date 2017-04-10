import rootReducer from './reducers/index'
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'
const loggerMiddleware = createLogger()

export const store = compose(applyMiddleware(thunkMiddleware,loggerMiddleware),autoRehydrate())(createStore)(rootReducer)


// createStore(
//     rootReducer,
//     compose(
        // applyMiddleware(
        //     thunkMiddleware,
        //     loggerMiddleware
        // ),
//         autoRehydrate()
//     )
// )

