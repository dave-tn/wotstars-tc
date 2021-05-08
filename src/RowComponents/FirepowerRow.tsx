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
            dpm: (tc.selectedAmmo.damage * (tc.selectedGun.shots_per_clip ?? 1)) * tc.selectedGun.reload_time, // this is messed up because of WG's naming, see below...
            penetration: tc.selectedAmmo.piercing_power,
            alpha: tc.selectedAmmo.damage,

            // Wargaming has these values messed up in their data?!
            rateOfFire: tc.selectedGun.reload_time,
            reload: 60 / tc.selectedGun.reload_time,
            clip: tc.selectedGun.shots_per_clip ?? '-',
            calibre: tc.selectedAmmo.caliber
        }
    })

    return (
        <>
        <tr>
            <th className={styles.header} colSpan={9}>Firepower</th>
        </tr>
        <MakeRowFromProperty title="DPM" data={firepowerData} para="dpm" roundTo={0} />
        <MakeRowFromProperty title="Penetration" data={firepowerData} para="penetration" suffix="mm" />
        <MakeRowFromProperty title="Alpha" data={firepowerData} para="alpha" />
        <MakeRowFromProperty title="Rate of Fire" data={firepowerData} para="rateOfFire" roundTo={2} suffix="/min" />
        <MakeRowFromProperty title="Reload" data={firepowerData} para="reload" roundTo={2} biggerIsBetter={false} suffix="s" />
        <MakeRowFromProperty title="Clip" data={firepowerData} para="clip" biggerIsBetter={true} />
        <MakeRowFromProperty title="Calibre" data={firepowerData} para="calibre" suffix="mm" />
        </>
    )
}
export { FirepowerRow }
