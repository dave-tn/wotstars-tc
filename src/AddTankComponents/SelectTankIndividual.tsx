import { FC, useReducer, useState } from 'react'

import { GQLTank } from './SelectTankList'
// import { Fingerprint } from '../utils/comparisonConfigUtils/generateTankFingerprint'
import { TankIntro } from '../Components/TankIntro'

import { SelectChassis } from './SelectChassis'
import { SelectEngine } from './SelectEngine'
import { SelectTurret } from './SelectTurret'

import { useAddTank } from '../hooks/useTankState'
import { generateTankFingerprint } from '../utils/comparisonConfigUtils/generateTankFingerprint'

import styles from './Selects.module.css'

interface TankConfig {
    tankId: number
    chassisIndex: number
    engineIndex: number
    turretIndex: number
    gunIndex: number
    shotIndex: number
}

type ReducerActions = 'SET_CHASSIS' | 'SET_ENGINE' | 'SET_TURRET' | 'SET_GUN' | 'SET_SHOT'
interface TankConfigAction {
    type: ReducerActions
    payload: number
}

function configReducer(state: TankConfig, action: TankConfigAction) {
    switch (action.type) {
        case 'SET_CHASSIS': return { ...state, chassisIndex: action.payload }
        case 'SET_ENGINE': return { ...state, engineIndex: action.payload }
        case 'SET_TURRET': return { ...state, turretIndex: action.payload }
        case 'SET_GUN': return { ...state, turretIndex: action.payload }
        case 'SET_SHOT': return { ...state, shotIndex: action.payload }
        default: return state
    }
}

export const SelectTankIndividual: FC<{
    tank: GQLTank
}> = ({
    tank
}) => {
    const addTank = useAddTank()
    const [ openEditor, setOpenEditor ] = useState(false)

    const [ config, dispatch ] = useReducer(configReducer, {
        tankId: tank.id,
        chassisIndex: 0,
        engineIndex: 0,
        turretIndex: 0,
        gunIndex: 0,
        shotIndex: 0
    })

    function configToFingerprint() {
        const fp = generateTankFingerprint(
            config.tankId,
            config.chassisIndex,
            config.engineIndex,
            config.turretIndex,
            config.gunIndex,
            config.shotIndex)
        addTank(fp)
    }

    return (
        <div className={styles.tankSelectionItemWrap}>
            <div style={{ padding: '5px' }}>
                <TankIntro tank={tank} />
            </div>
            <div className={styles.tankSelectionButtonsWrap}>
                <div className={styles.addTankButton} onClick={configToFingerprint}>
                    <span>Add tank</span>
                    <span className={styles.defaultConfigText}>(default config)</span>
                </div>
                <div className={styles.editConfigButton} onClick={() => setOpenEditor(!openEditor)}>Edit config</div>
            </div>
            { openEditor &&
                <div>
                    <SelectChassis chassis={tank.chassis} />
                    <SelectEngine engines={tank.engines} />
                    <SelectTurret turrets={tank.turrets} />
                    {/* Select Gun */}
                    {/* Select Ammo */}
                    {/* <button onClick={configToFingerprint}>ADD THIS TANK WITH THIS CONFIG</button> */}
                </div>
            }
            {/* { tank.user_string } */}
        </div>
    )

}

