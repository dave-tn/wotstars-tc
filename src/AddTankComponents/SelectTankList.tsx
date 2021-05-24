import { FC } from 'react'
import { useQuery, gql } from '@apollo/client'

import { SelectTankIndividual } from './SelectTankIndividual'

import { useSelector } from 'react-redux'
import { AddTankOptionsState } from './../reduxStore'

interface Tanks {
    tanks: GQLTank[]
}

export interface GQLTank {
    id: number
    fingerprint: string
    user_string: string
    nation: string
    tier: number
    type_slug: string
    description: string
    image_preview_url: string
    xp_cost: number
    price: number
    is_premium: boolean
    weight: number
    silver_bonus: number
    xp_bonus: number
    free_xp_bonus: number
    crew_bonus: number
    camo: number[]
    speeds: number[]
    battle_level_max: number
    is_fake_turrets: boolean
    primary_armor: number[]

    chassi: GQLChassis
    engine: GQLEngine
    turret: GQLTurret

    chassis: GQLChassis[]
    engines: GQLEngine[]
    turrets: GQLTurret[]
}
interface GQLTankModule {
    index: number
    user_string: string
    weight: number
    level: number
    price: number
    max_health: number
}

export interface GQLEngine extends GQLTankModule {
    power: number
    fire_chance: number
}
export interface GQLChassis extends GQLTankModule {
    rotation_speed: number
    max_load: number
    terrain_resistance: number[]
}
export interface GQLTurret extends GQLTankModule {
    rotation_speed: number
    vision_radius: number
    gun: GQLGun
    guns: GQLGun[]
}
interface GQLGun extends GQLTankModule {
    max_ammo: number
    elevation: number
    depression: number
    /* Reload time in s */
    reload_time: number
    /* Rounds per minute */
    rate_of_fire: number
    shots_per_clip: number
    /* Shot dispersion at 100m */
    shot_dispersion_radius: number
    rotation_speed: number
    /* Aiming time in s */
    aiming_time: number

    gun_rate: number
    gun_rate_mod: number

    shot: GQLShot
    shots: GQLShot[]

}

interface GQLShot {
    index: number
    caliber: number

    //   # Price, seemingly in gold or credits depending on whether ammo is premium
    price: number
    damage: number
    is_premium: boolean
    user_string: string

    // # penetration in mm
    piercing_power: number

    // # Calculated damage per minute based on gun & ammo choice
    dpm: number
}

const GET_TANKS_QUERY = gql`
    query GetTanks($tiers: [Int], $types: [String], $nations: [String]) {
        tanks(tiers: $tiers, types: $types, nations: $nations) {
            id
            user_string
            nation
            tier
            type_slug
            image_preview_url
            is_premium

            chassis {
                user_string
                level
                rotation_speed
            }

            engines {
                user_string
                level
                power
            }

            turrets {
                user_string
                level
                vision_radius
                rotation_speed

                guns {
                    user_string
                    level
                    reload_time
                    rate_of_fire

                    shots {
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

const selectAddTankStuff = (state: AddTankOptionsState) => ({
    selectedType: state.selectedType,
    selectedTier: state.selectedTier
})

export const SelectTankList: FC = () => {

    const { selectedType, selectedTier } = useSelector(selectAddTankStuff)

    const { loading, error, data } = useQuery<Tanks>(GET_TANKS_QUERY, {
        variables: { tiers: [selectedTier], types: [selectedType], nations: undefined },
        // onCompleted: ({ nations }) => setSelectedNation(nations[0])        
    })
    // TODO: FIXME
    if (loading) return <div>Loading list of tanks data...</div>
    if (error) return <div>There was an error loading the list of tanks data. Maybe try refreshing 🤷‍♂️</div>

    return (
        <div style={{ overflowY: 'scroll' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {/* <div>Filtered nations: { ...selectedNations } </div> */}
                <div>Selected tier: { selectedTier }</div>
                <div>Selected type: { selectedType }</div>
                { data?.tanks?.map(tank => <SelectTankIndividual tank={tank} key={tank.id} />)}
            </div>
        </div>
    )
}
