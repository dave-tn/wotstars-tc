
import { FC, useEffect } from 'react'

import { useQuery } from '@apollo/client'
import { GQLTank } from './AddTankComponents/SelectTankList'
import { Fingerprint } from './../utils/comparisonConfigUtils/generateTankFingerprint'

import { TankIntro } from './TankIntro'
import { TopPlayersRows } from './TankColumnTopPlayers'
import { MakeCell } from './../RowComponents/_MakeCell'

import { useRemoveTank } from '../hooks/useTankState'
import { objFromFingerprint } from '../utils/comparisonConfigUtils/generateTankFingerprint'
import { GET_TANK_Q } from './tankColumnGQLQuery'

import { useDispatch } from 'react-redux'
import { setFingerprintToEdit } from './../reduxSlices/editorSlice'

import gtagHelper from './../utils/gtagHelper'

import styles from './TankColumn.module.css'


interface TankQueryVars {
    id: number
    chassisIndex: number
    engineIndex: number
    turretIndex: number
    gunIndex: number
    shotIndex: number
}
interface TankQueryRes {
    tank: GQLTank
}

export const TankColumn: FC<{
    fingerprint: Fingerprint
    firstTank: GQLTank | undefined
    setFirstTank: React.Dispatch<React.SetStateAction<GQLTank | undefined>> | undefined
}> = ({ fingerprint, firstTank, setFirstTank }) => {

    const dispatch = useDispatch()

    const removeTank = useRemoveTank()
    const tankConfigObj = objFromFingerprint(fingerprint)

    const { data, loading, error } = useQuery<TankQueryRes, TankQueryVars>(GET_TANK_Q, {
        variables: tankConfigObj,
        // onCompleted: ({ tankTiers }) => setAvailableTiers(tankTiers)
    })

    useEffect(() => (setFirstTank && data?.tank && setFirstTank(data.tank)), [ data, setFirstTank ])

    // TODO: FIXME: We should return a loading component while the tank data is loading, and some kind of error component when there's an error
    if (!data || !data.tank) return null

    const tank = data.tank

    const tankWeight = ((tank.weight + tank.chassi.weight + tank.engine.weight + tank.turret.weight + tank.turret.gun.weight) / 1000)
    const enginePowerPerTonne = tank.engine.power / tankWeight

    const firstTankWeight = firstTank ? ((firstTank.weight + firstTank.chassi.weight + firstTank.engine.weight + firstTank.turret.weight + firstTank.turret.gun.weight) / 1000) : 0
    const firstTankEnginePowerPerTonne = firstTank ? firstTank.engine.power / firstTankWeight : 0


    return (
        <>
{/* INTRO */}
            <div style={{ position: 'relative' }}>
                <div className={styles.headerButtonsWrap}>
                    <div className={styles.headerRemoveTankButton} onClick={() => removeTank(tankConfigObj.uuid)}>-</div>
                    <div className={styles.headerEditTankButton} onClick={() => {
                        dispatch(setFingerprintToEdit(fingerprint))
                        gtagHelper({ 'event': 'open_tank_config_editor' })
                    }
                        }>🔧</div>
                </div>
                <TankIntro tank={tank} />
            </div>

{/* BONUSES*/}
            <div className={styles.cellWrap}>
                <MakeCell val={tank.silver_bonus * 100} compVal={(firstTank?.silver_bonus ?? 0) * 100} roundTo={0} suffix="%" />
                <MakeCell val={tank.xp_bonus * 100} compVal={(firstTank?.xp_bonus ?? 0) * 100} roundTo={0} suffix="%" />
            </div>
            <div className={styles.cellWrap}>
                <MakeCell val={tank.free_xp_bonus * 100} compVal={(firstTank?.free_xp_bonus ?? 0) * 100} roundTo={0} suffix="%" />
                <MakeCell val={tank.crew_bonus * 100} compVal={(firstTank?.crew_bonus ?? 0) * 100} roundTo={0} suffix="%" />
            </div>

{/* FIREPOWER */}
            <div>
                <MakeCell val={tank.turret.gun.shot.dpm} compVal={firstTank?.turret.gun.shot.dpm} roundTo={0} />
            </div>
            <div><MakeCell val={tank.turret.gun.shot.piercing_power} compVal={firstTank?.turret.gun.shot.piercing_power} roundTo={0} suffix="mm" /></div>
            <div><MakeCell val={tank.turret.gun.shot.damage} compVal={firstTank?.turret.gun.shot.damage} roundTo={0} /></div>
            <div>
                <MakeCell val={tank.turret.gun.rate_of_fire * (tank.turret.gun.shots_per_clip || 1)} compVal={(firstTank?.turret.gun.rate_of_fire || 0) * (firstTank?.turret.gun.shots_per_clip || 1)} roundTo={2} suffix="/min" />
            </div>
            <div>
                <MakeCell val={tank.turret.gun.reload_time} compVal={firstTank?.turret.gun.reload_time} biggerIsBetter={false} roundTo={2} suffix="s" />
            </div>
            <div><MakeCell val={tank.turret.gun.shots_per_clip} compVal={firstTank?.turret.gun.shots_per_clip} /></div>
            <div><MakeCell val={tank.turret.gun.shot.caliber} compVal={firstTank?.turret.gun.shot.caliber} roundTo={0} suffix="mm" /></div>

{/* WEAPON HANDLING */}
            <div><MakeCell val={tank.turret.gun.aiming_time} compVal={firstTank?.turret.gun.aiming_time} suffix="s" biggerIsBetter={false} /></div>
            <div><MakeCell val={tank.turret.gun.shot_dispersion_radius} compVal={firstTank?.turret.gun.shot_dispersion_radius} suffix="m" biggerIsBetter={false} /></div>
            <div className={styles.cellWrap}>
                <MakeCell val={tank.turret.gun.elevation} compVal={tank.turret.gun.elevation} roundTo={0} suffix="°" />
                <MakeCell val={tank.turret.gun.depression} compVal={firstTank?.turret.gun.depression} roundTo={0} suffix="°" />
            </div>

{/* MOVEMENT / MOBILITY */}
            <div className={styles.cellWrap}>
                <MakeCell val={tank.speeds[0]} compVal={firstTank?.speeds[0]} suffix="kph" />
                <MakeCell val={tank.speeds[1]} compVal={firstTank?.speeds[1]} suffix="kph" />
            </div>
            <div className={styles.cellWrap}>
                <MakeCell val={tank.chassi.rotation_speed} compVal={firstTank?.chassi.rotation_speed} suffix="°/s" />
                <MakeCell val={tank.turret.rotation_speed} compVal={firstTank?.turret.rotation_speed} suffix="°/s" />
            </div>
            <div><MakeCell val={tankWeight} compVal={firstTankWeight} roundTo={2} suffix="t" biggerIsBetter={false} /></div>
            <div className={styles.cellWrap}>
                <MakeCell val={tank.engine.power} compVal={firstTank?.engine.power} suffix="hp" />
                <MakeCell val={enginePowerPerTonne} compVal={firstTankEnginePowerPerTonne} suffix="hp/t" roundTo={2} />
            </div>
            <div className={styles.cellWrap}>
                <MakeCell val={tank.chassi.terrain_resistance[0]} compVal={firstTank?.chassi.terrain_resistance[0]} biggerIsBetter={false} />
                <MakeCell val={tank.chassi.terrain_resistance[1]} compVal={firstTank?.chassi.terrain_resistance[1]} biggerIsBetter={false} />
                <MakeCell val={tank.chassi.terrain_resistance[2]} compVal={firstTank?.chassi.terrain_resistance[2]} biggerIsBetter={false} />
            </div>

{/* Misc / other */}
            <div className={styles.cellwrap}><MakeCell val={tank.max_health} compVal={firstTank?.max_health} suffix="hp" /></div>
            <div className={styles.cellWrap}>
                <MakeCell val={tank.camo[0]} compVal={firstTank?.camo[0]} />
                <MakeCell val={tank.camo[1]} compVal={firstTank?.camo[1]} />
            </div>
            <div><MakeCell val={tank.turret.vision_radius} compVal={firstTank?.turret.vision_radius} suffix="m" /></div>
            
{/* TOP PLAYERS */}
            { TopPlayersRows({ players: tank.topPlayers })}


        </>
    )
}

