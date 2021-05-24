import { createStore } from 'redux'


export interface AddTankOptionsState {
    selectedNations: string[]
    selectedTier: number
    selectedType: string
}
type AddTankOptionsAction = {
    type: 'SELECT_TIER'
    payload: number
} | {
    type: 'SELECT_TYPE'
    payload: string
}

const addTankOptionsState: AddTankOptionsState = {
    selectedNations: [],
    selectedTier: 10,
    selectedType: 'mediumTank'
}
function addTankOptionsReducer(state: AddTankOptionsState = addTankOptionsState, action: AddTankOptionsAction) {

    switch (action.type) {
        case 'SELECT_TIER': return {
            ...state,
            selectedTier: action.payload
        }
        case 'SELECT_TYPE': return {
            ...state,
            selectedType: action.payload
        }
        // we do need this as redux bootstraps the initial state without using one of the actions above
        default: return state
    }

}

const store = createStore(addTankOptionsReducer)

export {
    store
}
