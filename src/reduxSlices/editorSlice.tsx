import { MainStore } from '../reduxStore'


export interface EditTankConfigState {
    uuid: number | undefined
}

type EditTankConfigAction = {
    type: 'editTank/SET_UUID'
    payload: number | undefined
}

const editTankConfigState: EditTankConfigState = {
    uuid: undefined
} 
export function editTankConfigReducer(state = editTankConfigState, action: EditTankConfigAction) {

    switch (action.type) {
        case 'editTank/SET_UUID': return {
            ...state,
            selectedTier: action.payload
        }
        // we need this as redux bootstraps the initial state without using one of the actions above
        default: return state
    }

}

// selectors
export const getUuid = (({ editTankConfig }: MainStore) => editTankConfig.uuid)

// action creators
export const setUuidToEdit = (uuid: number | undefined): EditTankConfigAction => ({
    type: 'editTank/SET_UUID',
    payload: uuid
})
