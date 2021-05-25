import { MainStore } from '../reduxStore'
import { TankTypeSlug } from '../typesStuff/Tank'


export interface AddTankOptionsState {
    selectedNations: string[]
    selectedTier: number
    selectedType: TankTypeSlug
}

type AddTankOptionsAction = {
    type: 'addTank/SELECT_TIER'
    payload: number
} | {
    type: 'addTank/SELECT_TYPE'
    payload: TankTypeSlug
}

const addTankOptionsState: AddTankOptionsState = {
    selectedNations: [],
    selectedTier: 10,
    selectedType: 'mediumTank'
}
export function addTankOptionsReducer(state = addTankOptionsState, action: AddTankOptionsAction) {

    switch (action.type) {
        case 'addTank/SELECT_TIER': return {
            ...state,
            selectedTier: action.payload
        }
        case 'addTank/SELECT_TYPE': return {
            ...state,
            selectedType: action.payload
        }
        // we need this as redux bootstraps the initial state without using one of the actions above
        default: return state
    }

}

// selectors
export const getSelectedTier = (({ addTankOptions }: MainStore) => addTankOptions.selectedTier)
export const getSelectedType = (({ addTankOptions }: MainStore) => addTankOptions.selectedType)
export const getAddTankOptions = (({ addTankOptions }: MainStore) => addTankOptions)

// action creators
export const setSelectedTier = (tier: number): AddTankOptionsAction => ({
    type: 'addTank/SELECT_TIER',
    payload: tier
})
export const setSelectedType = (type: TankTypeSlug): AddTankOptionsAction => ({
    type: 'addTank/SELECT_TYPE',
    payload: type
})
