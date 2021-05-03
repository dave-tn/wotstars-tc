import { FC } from 'react'

import styles from './RowComponentStyles.module.css'

import { TankConfig } from './../utils/comparisonConfigUtils/getTankConfig'
import { MakeRowFromProperty } from './_MakeRowFromProperty'

interface Bonuses {
    uid: number
    [key: string]: number | undefined
}

const BonusesRow:FC<{ data: TankConfig[] }> = ({ data }) => {

    const bonusesData: Bonuses[] = data.map(tc => {
        if (!tc.selectedTurret || !tc.selectedGun || !tc.selectedAmmo) return { uid: tc.uid }
        return {
            uid: tc.uid,
            credit: (tc.rawData?.data.silver_bonus ?? 0) * 100,
            xp: (tc.rawData?.data.xp_bonus ?? 0) * 100,
            freeXp: Number((tc.rawData?.data.free_xp_bonus ?? 0)) * 100,
            crewXp: (tc.rawData?.data.crew_bonus ?? 0) * 100,
        }
    })

    return (
        <>
        <tr>
            <td className={styles.header} colSpan={9}>Bonuses</td>
        </tr>
        <MakeRowFromProperty title="Silver" data={bonusesData} para="credit" suffix="%" />
        <MakeRowFromProperty title="XP" data={bonusesData} para="xp" suffix="%" />
        <MakeRowFromProperty title="Free XP" data={bonusesData} para="freeXp" suffix="%" />
        <MakeRowFromProperty title="Crew XP" data={bonusesData} para="crewXp" suffix="%" />
        </>
    )
}
export {
    BonusesRow
}
