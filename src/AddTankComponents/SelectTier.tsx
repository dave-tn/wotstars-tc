import { FC } from 'react'
import { useQuery, gql } from '@apollo/client'
import { toRoman, ROMAN_LEGEND } from './../utils/tankTiers'
import { TankTypeSlug } from './../typesStuff/Tank'

import styles from './Selects.module.css'

interface TiersList {
    nation: string
    tankTiers: number[]
}
interface TiersListVars {
    forTypes: TankTypeSlug[]
    forNation: string
}

const GET_TANK_TIERS = gql`
    query GetTypes($forNation: String!, $excludeTypes: [String]) {
        tankTiers(forNation: $forNation, excludeTypes: $excludeTypes)
    }
`

export const SelectTier:FC<{
    nation: string
    disabledTypes: TankTypeSlug[]
    disabledTiers: number[]
    setDisabledTiers: React.Dispatch<React.SetStateAction<number[]>>
}> = ({
    nation,
    disabledTypes,
    disabledTiers,
    setDisabledTiers
}) => {

    const { data, loading, error } = useQuery<TiersList, TiersListVars>(GET_TANK_TIERS, {
        variables: { forNation: nation, forTypes: disabledTypes },
        // onCompleted: ({ tankTiers }) => setAvailableTiers(tankTiers)
    })

    // TODO: FIXME
    // if (loading) return <div>Loading list of nations data...</div>
    if (error) return <div>There was an error loading the list of nations data. Maybe try refreshing 🤷‍♂️</div>
    
    const tiers = ROMAN_LEGEND.map(([tier]) => tier)

    function updateDisabledTiers(tierToToggle: number) {
        setDisabledTiers(curDisabledTiers => {
            const newDisabledTiers = curDisabledTiers.slice()
            const match = newDisabledTiers.indexOf(tierToToggle)
            if (match >= 0) {
                newDisabledTiers.splice(match, 1)
            } else newDisabledTiers.push(tierToToggle)
            return newDisabledTiers
        })
    }

    return (
        <div style={{ display: 'flex' }}>
            { tiers.map(t => {

                let classes = styles.button
                if (loading || (data && data.tankTiers?.indexOf(t) < 0)) {
                    // there are NO tanks available for this nation / type filter selection
                    // so this tier button should be disabled
                    classes = `${classes} ${styles.buttonDisabled}`
                } else if (disabledTiers.indexOf(t) >= 0) {
                    // this tier has been toggled off by the user
                    classes = `${classes} ${styles.buttonToggledOff}`
                }


                return (
                    <div className={classes} onClick={() => updateDisabledTiers(t)}>
                        { toRoman(t) }
                    </div>
                )
            })}
        </div>
    )

}
