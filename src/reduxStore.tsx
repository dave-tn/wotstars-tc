import { createStore, combineReducers } from 'redux'

import { addTankOptionsReducer } from './reduxSlices/addTankSlice'
import { editTankConfigReducer } from './reduxSlices/editorSlice'

const combinedReducers = combineReducers({
    addTankOptions: addTankOptionsReducer,
    editTankConfig: editTankConfigReducer
})

const store = createStore(combinedReducers)

export type MainStore = ReturnType<typeof store.getState>;
export {
    store
}
