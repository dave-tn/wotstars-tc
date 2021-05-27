
import { FC, useEffect } from 'react'

import { useQuery, gql } from '@apollo/client'
import { GQLTank } from './../AddTankComponents/SelectTankList'
import { Fingerprint } from './../utils/comparisonConfigUtils/generateTankFingerprint'

import { TankIntro } from './TankIntro'
import { MakeCell } from './../RowComponents/_MakeCell'
import { useRemoveTank } from '../hooks/useTankState'
import { objFromFingerprint } from '../utils/comparisonConfigUtils/generateTankFingerprint'

import { useDispatch } from 'react-redux'
import { setFingerprintToEdit } from './../reduxSlices/editorSlice'

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
const GET_TANK_Q = gql`
    query tank($id: ID!, $chassisIndex: Int!, $engineIndex: Int!, $turretIndex: Int!, $gunIndex: Int!, $shotIndex: Int!) {
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

            chassi(index: $chassisIndex) {
                weight
                rotation_speed
                terrain_resistance
            }

            engine(index: $engineIndex) {
                power
                weight
            }

            turret(index: $turretIndex) {
                user_string
                rotation_speed
                weight
                vision_radius
                gun(index: $gunIndex) {
                    user_string
                    reload_time
                    rate_of_fire
                    weight
                    aiming_time
                    shots_per_clip
                    shot_dispersion_radius
                    elevation
                    depression
                    shot(index: $shotIndex) {
                        user_string
                        damage
                        piercing_power
                        dpm
                        caliber
                    }
                }
            }
        }
    }
`

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

    useEffect(() => {
        if (setFirstTank && data?.tank) {
            setFirstTank(data.tank)
        }
    }, [ data, setFirstTank ])

    // TODO: FIXME: We should return a loading component while the tank data is loading, and some kind of error component when there's an error
    if (!data || !data.tank) return null

    const tank = data.tank

    return (
        <>
{/* INTRO */}
            <div style={{ position: 'relative' }}>
                <div className={styles.headerButtonsWrap}>
                    <div className={styles.headerRemoveTankButton} onClick={() => removeTank(tankConfigObj.uuid)}>-</div>
                    <div className={styles.headerEditTankButton} onClick={() => dispatch(setFingerprintToEdit(fingerprint))}>🔧</div>
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
            <div className={styles.cellWrap}>
                <MakeCell val={tank.engine.power} compVal={firstTank?.engine.power} suffix="hp" />
                <MakeCell val={tank.engine.power} compVal={firstTank?.engine.power} suffix="hp/t" /> XX 
            </div>
            <div className={styles.cellWrap}>
                <MakeCell val={tank.chassi.terrain_resistance[0]} compVal={firstTank?.chassi.terrain_resistance[0]} biggerIsBetter={false} />
                <MakeCell val={tank.chassi.terrain_resistance[1]} compVal={firstTank?.chassi.terrain_resistance[1]} biggerIsBetter={false} />
                <MakeCell val={tank.chassi.terrain_resistance[2]} compVal={firstTank?.chassi.terrain_resistance[2]} biggerIsBetter={false} />
            </div>
            <div className={styles.cellWrap}>
                <MakeCell val={tank.camo[0]} compVal={firstTank?.camo[0]} />
                <MakeCell val={tank.camo[1]} compVal={firstTank?.camo[1]} />
            </div>
            <div><MakeCell val={tank.turret.vision_radius} compVal={firstTank?.turret.vision_radius} suffix="m" /></div>

            
        </>
    )
}
