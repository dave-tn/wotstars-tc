import { MainStore } from '../reduxStore'

import { Fingerprint } from './../utils/comparisonConfigUtils/generateTankFingerprint'

export interface EditTankConfigState {
    fingerprint: Fingerprint | undefined
}

type EditTankConfigAction = {
    type: 'editTank/SET_FINGERPRINT'
    payload: Fingerprint | undefined
}

const editTankConfigState: EditTankConfigState = {
    fingerprint: undefined
} 
export function editTankConfigReducer(state = editTankConfigState, action: EditTankConfigAction): EditTankConfigState {

    switch (action.type) {
        case 'editTank/SET_FINGERPRINT': return {
            ...state,
            fingerprint: action.payload
        }
        // we need this as redux bootstraps the initial state without using one of the actions above
        default: return state
    }

}

// selectors
export const getFingerprintToEdit = (({ editTankConfig }: MainStore) => editTankConfig.fingerprint)

// action creators
export const setFingerprintToEdit = (fingerprint: Fingerprint | undefined): EditTankConfigAction => ({
    type: 'editTank/SET_FINGERPRINT',
    payload: fingerprint
})
