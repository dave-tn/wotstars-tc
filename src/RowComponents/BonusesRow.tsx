import { FC } from 'react'

import styles from './RowComponentStyles.module.css'

import { MakeRowFromProperty } from './_MakeRowFromProperty'
import { GQLTank } from '../AddTankComponents/SelectTankList'

interface Bonuses {
    fingerprint: string
    [key: string]: number | number[] | string | undefined
}

const BonusesRow:FC<{ data: GQLTank[] }> = ({ data }) => {

    const bonusesData: Bonuses[] = data.map(tc => {
        // if (!tc.selectedTurret || !tc.selectedGun || !tc.selectedAmmo) return { uid: tc.fingerprint }

        const silver = (tc.silver_bonus ?? 0) * 100
        const xp = (tc.xp_bonus ?? 0) * 100
        const freeXp = (tc.free_xp_bonus ?? 0) * 100
        const crewXp = (tc.crew_bonus ?? 0) * 100
        return {
            fingerprint: tc.fingerprint,
            silverAndXp: [ silver, xp ],
            freeAndCrewXp: [ freeXp, crewXp ]
        }
    })

    return (
        <>
        <tr>
            <th className={styles.header} colSpan={9}>Bonuses</th>
        </tr>
        <MakeRowFromProperty title="Silver / Base XP" data={bonusesData} para="silverAndXp" roundTo={0} suffix="%" />
        <MakeRowFromProperty title="Free XP / Crew XP" data={bonusesData} para="freeAndCrewXp" suffix="%" />
        </>
    )
}
export {
    BonusesRow
}
