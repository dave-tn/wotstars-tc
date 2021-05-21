import { FC } from 'react'

import styles from './RowComponentStyles.module.css'

import { MakeRowFromProperty } from './_MakeRowFromProperty'
import { GQLTank } from '../AddTankComponents/SelectTankList'

interface WeaponHandling {
    fingerprint: string
    [key: string]: number | number[] | string | undefined
}

const WeaponHandlingRow:FC<{ data: GQLTank[] }> = ({ data }) => {

    const weaponHandlingData: WeaponHandling[] = data.map(tc => {
        // if (!tc.selectedTurret || !tc.selectedGun || !tc.selectedAmmo) return { uid: tc.uid }
        return {
            fingerprint: tc.fingerprint,
            aimingTime: tc.turret.gun.aiming_time,
            dispersion: tc.turret.gun.shot_dispersion_radius,
            // can we find more dispersion values? eg. stationary, on move, on turret rotation
            eleDep: [tc.turret.gun.elevation, tc.turret.gun.depression ]
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
