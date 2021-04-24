import { FC } from 'react'

import styles from './RowComponentStyles.module.css'

import { TankConfig } from '../utils/comparisonConfigUtils/getTankConfig'
// import { MakeCell } from './_MakeCell'
import { MakeRowFromProperty } from './_MakeRowFromProperty'

interface WeaponHandling {
    [key: string]: number
}

const WeaponHandlingRow:FC<{ data: TankConfig[] }> = ({ data }) => {

    const weaponHandlingData: WeaponHandling[] = data.map(tc => {
        if (!tc.selectedTurret || !tc.selectedGun || !tc.selectedAmmo) return {} as WeaponHandling
        return {
            aimingTime: tc.selectedGun.aiming_time,
            dispersion: tc.selectedGun.shot_dispersion_radius,
            // other dispersion vals??
            depression: tc.selectedGun.depression,
            elevation: tc.selectedGun.elevation,
            turretRotation: tc.selectedTurret.rotation_speed
        } as WeaponHandling
    })

    return (
        <>
        <tr>
            <td className={styles.header} colSpan={9}>Weapon Handling</td>
        </tr>
        <MakeRowFromProperty title="Aim Time" data={weaponHandlingData} para="aimingTime" />
        <MakeRowFromProperty title="Dispersion" data={weaponHandlingData} para="dispersion" />
        <MakeRowFromProperty title="Elevation" data={weaponHandlingData} para="elevation" />
        <MakeRowFromProperty title="Depression" data={weaponHandlingData} para="depression" />
        <MakeRowFromProperty title="Turret Rotation" data={weaponHandlingData} para="turretRotation" />
        {/* <MakeRowFromProperty title="Calibre" data={weaponHandlingData} para="calibre" /> */}
        </>
    )
}
export { WeaponHandlingRow }
