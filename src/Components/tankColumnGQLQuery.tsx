import { gql } from '@apollo/client'

const GET_TANK_Q = gql`
    query tank($id: ID!, $chassisIndex: Int!, $engineIndex: Int!, $turretIndex: Int!, $gunIndex: Int!, $shotIndex: Int!) {
        tank(id: $id) {
            id
            fingerprint
            user_string
            nation
            level
            type_slug
            is_premium
            image_preview_url

            silver_bonus
            xp_bonus
            free_xp_bonus
            crew_bonus

            invisibility {
                still
                moving
                still_range
                moving_range
            }

            max_health
            weight

            chassi(index: $chassisIndex) {
                weight
                rotation_speed
                terrain_resistance
            }

            engine(index: $engineIndex) {
                power
                weight
                forward_max
                backward_max
            }

            turret(index: $turretIndex) {
                user_string
                rotation_speed
                weight
                vision_radius
                max_health
                gun(index: $gunIndex) {
                    user_string
                    reload_time
                    gun_rate
                    weight
                    aiming_time
                    shots_per_clip
                    intra_clip_reload
                    shell_autoreloading_time
                    shot_dispersion_radius
                    elevation
                    depression
                    shot(index: $shotIndex) {
                        user_string
                        damage
                        piercing_power
                    }
                }
            }

            topPlayers {
                platform
                account_id
                playerinfo {
                    nickname
                    clan {
                    clan_id
                    name
                    tag
                    }
                }
                p90 {
                    wn8
                    winrate
                    tdpb
                    battles
                }
                
            }
        }
    }
`
export {
    GET_TANK_Q
}

