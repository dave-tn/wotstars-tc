
import { FC, useReducer, useEffect } from 'react'

import { useQuery, gql } from '@apollo/client'
import { GQLTank } from './AddTankComponents/SelectTankList'
import { Fingerprint, generateTankFingerprint } from './../utils/comparisonConfigUtils/generateTankFingerprint'
import { highestIndexFinder } from './AddTankComponents/SelectTankIndividual'

import { CenteredSpinnerWithText } from './Spinner'
import { TankIntro } from './../Components/TankIntro'

import { SelectChassis } from './AddTankComponents/SelectChassis'
import { SelectEngine } from './AddTankComponents/SelectEngine'
import { SelectTurret } from './AddTankComponents/SelectTurret'
import { SelectGun } from './AddTankComponents/SelectGun'
import { SelectShot } from './AddTankComponents/SelectShot'

import { objFromFingerprint } from '../utils/comparisonConfigUtils/generateTankFingerprint'

import { useDispatch, useSelector } from 'react-redux'
import { getFingerprintToEdit, setFingerprintToEdit } from './../reduxSlices/editorSlice'

import { useUpdateFingerprint } from './../hooks/useTankState'

import gtagHelper from './../utils/gtagHelper'

import styles from './TankConfigEditor.module.css'

interface TankQueryVars {
    id: number
}
interface TankQueryRes {
    tank: GQLTank
}
const GET_TANK_Q = gql`
    query tank($id: ID!) {
        tank(id: $id) {
            id
            user_string
            nation
            level
            type_slug
            is_premium
            image_preview_url

            chassis {
                index
                user_string
                rotation_speed
            }

            engines {
                index
                user_string
                power
            }

            turrets {
                index
                user_string
                vision_radius
                rotation_speed

                guns {
                    index
                    user_string
                    reload_time
                    aiming_time
                    shot_dispersion_radius

                    shots {
                        index
                        user_string
                        damage
                        piercing_power
                    }
                }
            }
        }
    }
`


interface TankConfig {
    tankId: number
    chassisIndex: number
    engineIndex: number
    turretIndex: number
    gunIndex: number
    shotIndex: number
    tankData: GQLTank | undefined
}

type ReducerActions = 'SET_CHASSIS' | 'SET_ENGINE' | 'SET_TURRET' | 'SET_GUN' | 'SET_SHOT'
export type TankConfigAction = {
    type: ReducerActions
    payload: number
} | {
    type: 'SET_TANK_DATA'
    payload: GQLTank | undefined
}

// TODO: Move side effects somewhere else...
function configReducer(state: TankConfig, action: TankConfigAction) {
    switch (action.type) {
        case 'SET_CHASSIS': {
            gtagHelper({ 'event': 'tank_config_editor_change_chassis' })
            return { ...state, chassisIndex: action.payload }
        }
        case 'SET_ENGINE': {
            gtagHelper({ 'event': 'tank_config_editor_change_engine' })
            return { ...state, engineIndex: action.payload }
        }
        case 'SET_TURRET': {
            gtagHelper({ 'event': 'tank_config_editor_change_turret' })

            // When we change the turret, we also want to pick the best 'default' gun available to that turret
            const gunIndex = state.tankData?.turrets
                .find(t => t.index === action.payload)
                ?.guns.reduce(highestIndexFinder, 0) ?? 0

            return { ...state,
                turretIndex: action.payload,
                gunIndex,
                shotIndex: 0
            }
        }
        case 'SET_GUN': {
            gtagHelper({ 'event': 'tank_config_editor_change_gun' })
            return { ...state,
                gunIndex: action.payload,
                shotIndex: 0
            }
        }
        case 'SET_SHOT': {
            gtagHelper({ 'event': 'tank_config_editor_change_shot' })
            return { ...state, shotIndex: action.payload }
        }
        case 'SET_TANK_DATA': {
            return {
                ...state,
                tankData: action.payload
            }
        }
        default: return state
    }
}


const Editor:FC<{
    fingerprint: Fingerprint
}> = ({
    fingerprint
}) => {

    const dispatch = useDispatch()
    const updateFingerprint = useUpdateFingerprint()

    const tankConfigObj = objFromFingerprint(fingerprint)
    const [ config, configDispatcher ] = useReducer(configReducer, {
        tankId: tankConfigObj.id,
        chassisIndex: tankConfigObj.chassisIndex,
        engineIndex: tankConfigObj.engineIndex,
        turretIndex: tankConfigObj.turretIndex,
        gunIndex: tankConfigObj.gunIndex,
        shotIndex: tankConfigObj.shotIndex,
        tankData: undefined
    })
    const { data, loading, error } = useQuery<TankQueryRes, TankQueryVars>(GET_TANK_Q, {
        variables: { id: tankConfigObj.id },
        onCompleted: ({ tank }) => configDispatcher({
            type: 'SET_TANK_DATA',
            payload: tank
        })
    })

    function dispatchUpdatedFingerprint() {
        const fp = generateTankFingerprint(
            config.tankId,
            config.chassisIndex,
            config.engineIndex,
            config.turretIndex,
            config.gunIndex,
            config.shotIndex)
        console.log(config)
        console.log('Updating fingerprint to:', fp)
        updateFingerprint(fp, tankConfigObj.uuid)
        gtagHelper({ 'event': 'close_tank_config_editor_via_save' })
        close()
    }

    function close() {
        dispatch(setFingerprintToEdit(undefined))
        gtagHelper({ 'event': 'close_tank_config_editor' })
    }

    useEffect(() => {
        const closeFn = (e: KeyboardEvent) => (e.key === 'Escape' && close())
        window.addEventListener('keyup', closeFn)
        return () => window.removeEventListener('keyup', closeFn)
    })

    const tank = data?.tank

    return (
        <>
        <div className={styles.editorBackgroundClose} onClick={close} data-isbg={true}></div>
        <div className={styles.editorBackgroundWrap}>
            <h1 className={styles.mainTitle}>Edit Tank Configuration</h1>
            {/* <div onClick={() => dispatch(setFingerprintToEdit(undefined))}>Close X</div> */}
            { loading &&
                <CenteredSpinnerWithText text="Loading tank modules..." />
            }
            { error &&
                <div>There was an error loading the tank configuration data. :(</div>
            }
            { tank &&
                <div>

                    <div className={styles.infoWrap}>
                        <TankIntro tank={tank}/>
                    </div>

                    <div style={{ flexBasis: '100%', color: '#5A5F5A' }}>
                        <p className={styles.selectLabel}>Chassis:</p>
                        <SelectChassis chassis={tank.chassis} currentChassisIndex={config.chassisIndex} onSelect={configDispatcher} />
                        <p className={styles.selectLabel}>Engine:</p>
                        <SelectEngine engines={tank.engines} currentEngineIndex={config.engineIndex} onSelect={configDispatcher} />
                        <p className={styles.selectLabel}>Turret:</p>
                        <SelectTurret turrets={tank.turrets} currentTurretIndex={config.turretIndex} onSelect={configDispatcher} />
                        <p className={styles.selectLabel}>Gun:</p>
                        <SelectGun guns={tank.turrets.find(t => t.index === config.turretIndex)!.guns} currentGunIndex={config.gunIndex} onSelect={configDispatcher} />
                        <p className={styles.selectLabel}>Shot/ammo:</p>
                        <SelectShot shots={tank.turrets.find(t => t.index === config.turretIndex)!.guns.find(g => g.index === config.gunIndex)!.shots} currentShotIndex={config.shotIndex} onSelect={configDispatcher} />
                    </div>

                    <div className={styles.optionsButtonsWrap}>
                        <button onClick={close}>Cancel</button>
                        <button onClick={dispatchUpdatedFingerprint}>Save / Update</button>
                    </div>

                </div>
            }
        </div>

        </>
    )

}

export const TankConfigEditor: FC = () => {
    const fingerprintToEdit = useSelector(getFingerprintToEdit)
    if (fingerprintToEdit) return <Editor fingerprint={fingerprintToEdit} />
    return null
}
