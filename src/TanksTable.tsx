import { FC } from 'react'

import { Tank } from './typesStuff/Tank'

import { useTankState } from './hooks/useTankState'
import { HeaderRow } from './RowComponents/HeaderRow'
import { BonusesRow } from './RowComponents/BonusesRow'
import { FirepowerRow } from './RowComponents/FirepowerRow'
import { WeaponHandlingRow } from './RowComponents/WeaponHandlingRow'
import { MovementRow } from './RowComponents/MovementRow'

import { useQuery, gql } from '@apollo/client'
import { GQLTank } from './AddTankComponents/SelectTankList'

interface TanksVars {
    fingerprints: string[]
}

interface GQLData {
    tanks: GQLTank[]
}

const GET_TANKS_QUERY = gql`
    query GetTanksByFingerprint($fingerprints: [String]!) {
        tanksByFingerprint(fingerprints: $fingerprints) {
            id
            user_string
            nation
            type_slug
            turret {
                user_string
                gun {
                    user_string
                    shot {
                        user_string
                        damage
                        piercing_power
                        dpm
                    }
                }
            }
        }
    }
`

export const TanksTable:FC<{
    tanks: Tank[]
    showTankEditor: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ tanks, showTankEditor }) => {

    const [ tankCompData, fingerprints ] = useTankState(tanks)

    const { data, loading, error } = useQuery<GQLData, TanksVars>(GET_TANKS_QUERY, {
        variables: { fingerprints },
        // onCompleted: ({ tankTiers }) => setAvailableTiers(tankTiers)
    })

    // TODO: FIXME
    if (loading) return <div>Loading Tanks Data...</div>
    if (error) return <div>There was an error loading the tanks data. Maybe try refreshing 🤷‍♂️</div>

    return (
        <div className="xxxxxxMain-grid">

            <table>
                <tbody>
                    <HeaderRow data={tankCompData} showTankEditor={showTankEditor} />
                    <BonusesRow data={tankCompData} />
                    <FirepowerRow data={tankCompData} />
                    <WeaponHandlingRow data={tankCompData} />
                    <MovementRow data={tankCompData} />
                </tbody>
            </table>

        </div>
    )
}
