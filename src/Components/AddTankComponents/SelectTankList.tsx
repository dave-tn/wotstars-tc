import { FC } from 'react'
import { useQuery, gql } from '@apollo/client'

import { SelectTankIndividual } from './SelectTankIndividual'
import { CenteredSpinnerWithText } from './../Spinner'

import { useSelector } from 'react-redux'
import { useTankState } from '../../hooks/useTankState'
import { getAddTankOptions } from '../../reduxSlices/addTankSlice'

import { objFromFingerprint } from '../../utils/comparisonConfigUtils/generateTankFingerprint'

import styles from './Selects.module.css'

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

    max_health: number

    chassi: GQLChassis
    engine: GQLEngine
    turret: GQLTurret

    chassis: GQLChassis[]
    engines: GQLEngine[]
    turrets: GQLTurret[]

    topPlayers: GQLPlayers[]
}

export interface GQLPlayers {
    account_id: string
    platform: 'xbox' | 'ps'
    playerinfo: {
        nickname: string
        clan?: {
            clan_id: number
            name: string
            tag: string
        }
    }
    p90: GQLPlayerStats
}
export interface GQLPlayerStats {
    // Assisted damage per battle
    adpb: number
    // Number of battles used for the stats calculation
    battles: number
    // Percentage of incoming shots that boucned off player's armour
    bounce: number
    // Damage per battle
    dpb: number
    // Damage ratio
    dr: number
    // How many capture points the player removed from enemies
    droppedCapturePointsPerBattle: number
    // Average of how many of player's shots hit the target per battle
    hpb: number
    // Player's kills to deaths ratio
    kdr: number
    // Player's avergae kills per battle
    kpb: number
    // Percentage of player's shots that penetrated the enemy's armour
    penetration: number
    // Average number of enemy tanks spotted by player
    spb: number
    // Percentage of battles survived by player
    survival: number
    // Average combined damage - that is assisted and direct - done by player per battle
    tdpb: number
    // Percentage of battles won by player
    winrate: number
    // WN7 rating for the player
    wn7: number
    // WN8 rating for the player
    wn8: number
    // Average XP player earned per battle (doesn't include bonuses except premium time)
    xp: number
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
export interface GQLGun extends GQLTankModule {
    max_ammo: number
    elevation: number
    depression: number
    /* Reload time; but only kinda. Cos WG... (is the number of reloads in a minute) */
    reload_time: number
    shots_per_clip: number
    /* Shot dispersion at 100m */
    shot_dispersion_radius: number
    rotation_speed: number
    /* Aiming time in s */
    aiming_time: number

    /* The rate of fire / how fast a gun can shot (interval between shots), best case */
    gun_rate: number
    gun_rate_mod: number

    shot: GQLShot
    shots: GQLShot[]

}

export interface GQLShot {
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
                index
            }

            engines {
                index
            }

            turrets {
                index

                guns {
                    index

                    shots {
                        index
                    }
                }
            }

        }
    }
`

interface CountMap {
    [key:number]: number
}

export const SelectTankList: FC = () => {

    /**
     * Provides a count for the number of times a particular tank ID already appears in the main comparison table
     */
    const [ fingerprints ] = useTankState()
    const tankIdsCountMap = fingerprints.reduce((countMap, fingerprint) => {
        const fpObj = objFromFingerprint(fingerprint)
        if (!countMap[fpObj.id]) countMap[fpObj.id] = 0
        countMap[fpObj.id]++
        return countMap
    }, {} as CountMap)

    const { selectedType, selectedTier } = useSelector(getAddTankOptions)

    const { loading, error, data } = useQuery<Tanks>(GET_TANKS_QUERY, {
        variables: { tiers: [selectedTier], types: [selectedType], nations: undefined },
        // onCompleted: ({ nations }) => setSelectedNation(nations[0])        
    })
    // TODO: FIXME
    if (loading) return <CenteredSpinnerWithText />
    // </Spinner><div>Loading list of tanks data...</div>
    if (error) return <div style={{ textAlign: 'center' }}>There was an error loading the list of tanks data. Maybe try refreshing 🤷‍♂️</div>

    if (data?.tanks?.length === 0) {
        return <div style={{ textAlign: 'center' }}>There were no vehicles found that match the selected tier and type.</div>
    }


    return (
        <div style={{ overflowY: 'scroll' }}>
            <div className={styles.tanksListWrap}>
                { data?.tanks?.map(tank => <SelectTankIndividual tank={tank} key={tank.id} count={tankIdsCountMap[tank.id]} />)}
            </div>
        </div>
    )
}
