import { FC } from 'react'

import styles from './RowComponentStyles.module.css'

import { TankConfig } from '../utils/comparisonConfigUtils/getTankConfig'
import { MakeRowFromProperty } from './_MakeRowFromProperty'

interface WeaponHandling {
    uid: number
    [key: string]: number | undefined
}

const WeaponHandlingRow:FC<{ data: TankConfig[] }> = ({ data }) => {

    const weaponHandlingData: WeaponHandling[] = data.map(tc => {
        if (!tc.selectedTurret || !tc.selectedGun || !tc.selectedAmmo) return { uid: tc.uid }
        return {
            uid: tc.uid,
            aimingTime: tc.selectedGun.aiming_time,
            dispersion: tc.selectedGun.shot_dispersion_radius,
            // other dispersion vals??
            depression: tc.selectedGun.depression,
            elevation: tc.selectedGun.elevation,
            turretRotation: tc.selectedTurret.rotation_speed
        }
    })

    return (
        <>
        <tr>
            <td className={styles.header} colSpan={9}>Weapon Handling</td>
        </tr>
        <MakeRowFromProperty title="Aim Time" data={weaponHandlingData} para="aimingTime" biggerIsBetter={false} />
        <MakeRowFromProperty title="Dispersion" data={weaponHandlingData} para="dispersion" biggerIsBetter={false} />
        <MakeRowFromProperty title="Elevation" data={weaponHandlingData} para="elevation" />
        <MakeRowFromProperty title="Depression" data={weaponHandlingData} para="depression" />
        <MakeRowFromProperty title="Turret Rotation" data={weaponHandlingData} para="turretRotation" />
        </>
    )
}
export { WeaponHandlingRow }
