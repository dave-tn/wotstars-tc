import { FC } from 'react'

import styles from './RowComponentStyles.module.css'

import { MakeRowFromProperty } from './_MakeRowFromProperty'
import { GQLTank } from '../AddTankComponents/SelectTankList'

interface Firepower {
    fingerprint: string
    [key: string]: number | string | undefined
}

const FirepowerRow:FC<{ data: GQLTank[] }> = ({ data }) => {

    const firepowerData: Firepower[] = data.map(tc => {
        // if (!tc.selectedTurret || !tc.selectedGun || !tc.selectedAmmo) return { uid: tc.uid }
        return {
            fingerprint: tc.fingerprint,
            dpm: tc.turret.gun.shot.dpm,

            penetration: tc.turret.gun.shot.piercing_power,
            damage: tc.turret.gun.shot.damage,

            rof: tc.turret.gun.rate_of_fire,
            reload: tc.turret.gun.reload_time,
            clip: tc.turret.gun.shots_per_clip ?? '-',
            calibre: tc.turret.gun.shot.caliber
        }
    })

    return (
        <>
        <tr>
            <th className={styles.header} colSpan={9}>Firepower</th>
        </tr>
        <MakeRowFromProperty title="DPM" data={firepowerData} para="dpm" roundTo={0} />
        <MakeRowFromProperty title="Penetration" data={firepowerData} para="penetration" suffix="mm" />
        <MakeRowFromProperty title="Alpha" data={firepowerData} para="damage" />
        <MakeRowFromProperty title="Rate of Fire" data={firepowerData} para="rof" roundTo={2} suffix="/min" />
        <MakeRowFromProperty title="Reload" data={firepowerData} para="reload" roundTo={2} biggerIsBetter={false} suffix="s" />
        <MakeRowFromProperty title="Clip" data={firepowerData} para="clip" biggerIsBetter={true} />
        <MakeRowFromProperty title="Calibre" data={firepowerData} para="calibre" suffix="mm" />
        </>
    )
}
export { FirepowerRow }
