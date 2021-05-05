import { FC } from 'react'

import styles from './RowComponentStyles.module.css'

import { TankConfig } from '../utils/comparisonConfigUtils/getTankConfig'
import { MakeRowFromProperty } from './_MakeRowFromProperty'

interface WeaponHandling {
    uid: number
    [key: string]: number | number[] | undefined
}

const WeaponHandlingRow:FC<{ data: TankConfig[] }> = ({ data }) => {

    const weaponHandlingData: WeaponHandling[] = data.map(tc => {
        if (!tc.selectedTurret || !tc.selectedGun || !tc.selectedAmmo) return { uid: tc.uid }
        return {
            uid: tc.uid,
            aimingTime: tc.selectedGun.aiming_time,
            dispersion: tc.selectedGun.shot_dispersion_radius,
            // can we find more dispersion values? eg. stationary, on move, on turret rotation
            eleDep: [tc.selectedGun.elevation, tc.selectedGun.depression ]
        }
    })

    return (
        <>
        <tr>
            <th className={styles.header} colSpan={9}>Weapon Handling</th>
        </tr>
        <MakeRowFromProperty title="Aim Time" data={weaponHandlingData} para="aimingTime" biggerIsBetter={false} suffix="s" />
        <MakeRowFromProperty title="Dispersion" data={weaponHandlingData} para="dispersion" biggerIsBetter={false} />
        <MakeRowFromProperty title="Elevation / Depression" data={weaponHandlingData} para="eleDep" suffix="°" />
        </>
    )
}
export { WeaponHandlingRow }
