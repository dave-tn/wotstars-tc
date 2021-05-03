import { FC } from 'react'

import styles from './RowComponentStyles.module.css'

import { TankConfig } from './../utils/comparisonConfigUtils/getTankConfig'
import { MakeRowFromProperty } from './_MakeRowFromProperty'

interface Firepower {
    uid: number
    [key: string]: number | undefined
}

const FirepowerRow:FC<{ data: TankConfig[] }> = ({ data }) => {

    const firepowerData: Firepower[] = data.map(tc => {
        if (!tc.selectedTurret || !tc.selectedGun || !tc.selectedAmmo) return { uid: tc.uid }
        return {
            uid: tc.uid,
            dpm: tc.selectedAmmo.damage * (60 / tc.selectedGun.reload_time),
            penetration: tc.selectedAmmo.piercing_power,
            alpha: tc.selectedAmmo.damage,
            rateOfFire: 60 / tc.selectedGun.reload_time,
            reload: tc.selectedGun.reload_time,
            calibre: tc.selectedAmmo.caliber
        }
    })

    return (
        <>
        <tr>
            <td className={styles.header} colSpan={9}>Firepower</td>
        </tr>
        <MakeRowFromProperty title="DPM" data={firepowerData} para="dpm" />
        <MakeRowFromProperty title="Penetration" data={firepowerData} para="penetration" />
        <MakeRowFromProperty title="Alpha" data={firepowerData} para="alpha" />
        <MakeRowFromProperty title="Rate of Fire" data={firepowerData} para="rateOfFire" />
        <MakeRowFromProperty title="Reload" data={firepowerData} para="reload" roundTo={2} />
        <MakeRowFromProperty title="Calibre" data={firepowerData} para="calibre" />
        </>
    )
}
export { FirepowerRow }
