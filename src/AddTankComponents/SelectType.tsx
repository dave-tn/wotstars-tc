import { FC } from 'react'
import { useQuery, gql } from '@apollo/client'
import { VEHICLE_TYPES } from './../utils/tankTypes'
import { TankTypeSlug } from './../typesStuff/Tank'

import styles from './Selects.module.css'

interface TypesList {
    nation: string
    tankTypes: TankTypeSlug[]
}
interface TypesListVars {
    forNation: string
}

const GET_TANK_TYPES_QUERY = gql`
    query GetTypes($forNation: String!) {
        tankTypes(forNation: $forNation)
    }
`

export const SelectType:FC<{
    nation: string,
    disabledTypes: TankTypeSlug[]
    setDisabledTypes: React.Dispatch<React.SetStateAction<TankTypeSlug[]>>
}> = ({
    nation,
    disabledTypes,
    setDisabledTypes
}) => {

    const { data, loading, error } = useQuery<TypesList, TypesListVars>(GET_TANK_TYPES_QUERY, {
        variables: { forNation: nation },
        // onCompleted: ({ tankTypes }) => setAvailableTypes(tankTypes)
    })
    // TODO:...
    if (error) console.error(error)

    function toggleTypeFilter(slug: TankTypeSlug) {
        setDisabledTypes(currentDisabledTypes => {
            if (currentDisabledTypes.indexOf(slug) >= 0) {
                const newDisabledTypes = currentDisabledTypes.slice()
                newDisabledTypes.splice(currentDisabledTypes.indexOf(slug), 1)
                return newDisabledTypes
            }
            return [ ...currentDisabledTypes, slug]
        })
    }


    return (
        <div style={{ display: 'flex' }}>
            { VEHICLE_TYPES.map(([slug, name]) => {

                let classes = styles.button
                if (loading || (data && data.tankTypes?.indexOf(slug) < 0)) {
                    classes = `${classes} ${styles.buttonDisabled}`
                } else if (disabledTypes.indexOf(slug) >= 0) {
                    classes = `${classes} ${styles.buttonToggledOff}`
                }

                return (
                    <div key={slug} className={classes} onClick={() => toggleTypeFilter(slug)}>{ name }</div>
                )
            } )}

        </div> 
    )

}
