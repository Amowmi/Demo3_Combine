import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {account,favorite,Folder,Preview,Mode} from '../reducers/Reducers'

const rootReducer = combineReducers({account,favorite,Folder,Preview,Mode});
//maybe wrong
export const Store = createStore(rootReducer,applyMiddleware(thunk));