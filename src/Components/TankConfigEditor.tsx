
import { FC, useReducer, useEffect } from 'react'

import { useQuery, gql } from '@apollo/client'
import { GQLTank } from './../AddTankComponents/SelectTankList'
import { Fingerprint, generateTankFingerprint } from './../utils/comparisonConfigUtils/generateTankFingerprint'

import { TankIntro } from './../Components/TankIntro'

import { SelectChassis } from './../AddTankComponents/SelectChassis'
import { SelectEngine } from './../AddTankComponents/SelectEngine'
import { SelectTurret } from './../AddTankComponents/SelectTurret'
import { SelectGun } from '../AddTankComponents/SelectGun'
import { SelectShot } from '../AddTankComponents/SelectShot'

import { objFromFingerprint } from '../utils/comparisonConfigUtils/generateTankFingerprint'

import { useDispatch, useSelector } from 'react-redux'
import { getFingerprintToEdit, setFingerprintToEdit } from './../reduxSlices/editorSlice'

import { useUpdateFingerprint } from './../hooks/useTankState'

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
            fingerprint
            user_string
            nation
            tier
            type_slug
            is_premium
            image_preview_url

            silver_bonus
            xp_bonus
            free_xp_bonus
            crew_bonus

            speeds
            camo

            chassis {
                index
                user_string
                level
                rotation_speed
            }

            engines {
                index
                user_string
                level
                power
            }

            turrets {
                index
                user_string
                level
                vision_radius
                rotation_speed

                guns {
                    index
                    user_string
                    level
                    reload_time
                    aiming_time
                    shot_dispersion_radius

                    shots {
                        index
                        user_string
                        # level
                        damage
                        piercing_power
                        is_premium
                        # dpm
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
}

type ReducerActions = 'SET_CHASSIS' | 'SET_ENGINE' | 'SET_TURRET' | 'SET_GUN' | 'SET_SHOT'
export interface TankConfigAction {
    type: ReducerActions
    payload: number
}

function configReducer(state: TankConfig, action: TankConfigAction) {
    switch (action.type) {
        case 'SET_CHASSIS': return { ...state, chassisIndex: action.payload }
        case 'SET_ENGINE': return { ...state, engineIndex: action.payload }
        case 'SET_TURRET': return { ...state, turretIndex: action.payload }
        case 'SET_GUN': return { ...state, gunIndex: action.payload }
        case 'SET_SHOT': return { ...state, shotIndex: action.payload }
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
    const { data, loading, error } = useQuery<TankQueryRes, TankQueryVars>(GET_TANK_Q, {
        variables: { id: tankConfigObj.id },
        // onCompleted: ({ tankTiers }) => setAvailableTiers(tankTiers)
    })

    const [ config, configDispatcher ] = useReducer(configReducer, {
        tankId: tankConfigObj.id,
        chassisIndex: tankConfigObj.chassisIndex,
        engineIndex: tankConfigObj.engineIndex,
        turretIndex: tankConfigObj.turretIndex,
        gunIndex: tankConfigObj.gunIndex,
        shotIndex: tankConfigObj.shotIndex
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
        close()
    }

    function close() {
        dispatch(setFingerprintToEdit(undefined))
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
                <div>Loading tank modules...</div>
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
