import { FC } from 'react'

import styles from './RowComponentStyles.module.css'

import { TankConfig } from './../utils/comparisonConfigUtils/getTankConfig'
import { MakeRowFromProperty } from './_MakeRowFromProperty'

interface Bonuses {
    uid: number
    [key: string]: number | number[] | undefined
}

const BonusesRow:FC<{ data: TankConfig[] }> = ({ data }) => {

    const bonusesData: Bonuses[] = data.map(tc => {
        if (!tc.selectedTurret || !tc.selectedGun || !tc.selectedAmmo) return { uid: tc.uid }

        const silver = (tc.rawData?.data.silver_bonus ?? 0) * 100
        const xp = (tc.rawData?.data.xp_bonus ?? 0) * 100
        const freeXp = Number((tc.rawData?.data.free_xp_bonus ?? 0)) * 100
        const crewXp = (tc.rawData?.data.crew_bonus ?? 0) * 100
        return {
            uid: tc.uid,
            silverAndXp: [ silver, xp ],
            freeAndCrewXp: [ freeXp, crewXp ]
        }
    })

    return (
        <>
        <tr>
            <td className={styles.header} colSpan={9}>Bonuses</td>
        </tr>
        <MakeRowFromProperty title="Silver / Base XP" data={bonusesData} para="silverAndXp" suffix="%" />
        <MakeRowFromProperty title="Free XP / Crew XP" data={bonusesData} para="freeAndCrewXp" suffix="%" />
        </>
    )
}
export {
    BonusesRow
}
