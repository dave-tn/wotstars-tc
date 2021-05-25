import { createStore, combineReducers } from 'redux'

import { addTankOptionsReducer } from './reduxSlices/addTankSlice'

const combinedReducers = combineReducers({
    addTankOptions: addTankOptionsReducer
})

const store = createStore(combinedReducers)

export type MainStore = ReturnType<typeof store.getState>;
export {
    store
}
