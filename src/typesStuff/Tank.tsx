/**
 * Holds the basic raw data as presented by WG encyclopedia
 */
 interface Tank {
    info: TankInfo,
    data: TankData
}

type TankTypeSlug = 'lightTank'|'mediumTank'|'heavyTank'|'AT-SPG'|'SPG' // string
/**
 * Generic info about the tank from WG
 */
interface TankInfo {
    id: number
    /** The full user-friendly name for the tank */
    user_string: string
    /** The WG short code name for the tank */
    name: string
    description: string
    /** The tank's tier */
    level: number
    image_preview_url: string
    price: number
    xp_cost: number
    /** Nation shorthand text */
    nation: string
    is_premium: boolean
    /** The tank's type/class in shorthand form */
    type_slug: TankTypeSlug
}
interface TankData {
    weight: number
    silver_bonus?: number // eg. 0.35
    xp_bonus?: number // eg. 0.2
    /** Free xp bonus. WG data seems to have this as a string for whatever reason... */
    free_xp_bonus?: string // eg. "0.05"
    /** Crew xp bonus */
    crew_bonus?: number // eg. 0.05 = 5%
    /** Presumably the maximum tier the tank sees in battles */
    battle_level_max: number
    /** Presumably for casemates */
    is_fake_turrets: boolean // for casemates
    max_health: number
    /** Each key is the engine name */
    engines: {
        [key: string]: Engine
    }
    /** Each key is the radio name */
    radios: {
        [key: string]: Radio
    }
    crew: Array<'commander'|'radioman'|'gunner'|'driver'|'loader'> // sometimes a crew 'slot' is an array of nulls in WG's data...
    /** Each key is the chassis name */
    chassis: {
        [key: string]: Chassis
    }
    invisibility: {
        still: number // eg. 0.391
        moving: number
    }
    speed: {
        forward: number
        backward: number
    }
    /** Each key is the turret name */
    turrets: {
        [key: string]: Turret
    }
    primary_armor: number[] // Array<number>
}

interface TankModule {
    index: number
    /** The user friendly name for the module */
    user_string: string
    /** The module tier */
    level: number
    max_health: number
    weight: number //750
    price: number //27860
    is_premium: boolean // false
}

interface Engine extends TankModule {
    /** Engine power as horsepower */
    power: number //500
    /** Engine fire chance as decimal */
    fire_chance: number // 0.15
}
interface Radio extends TankModule {
    /** Radio communication distance */
    distance: number // 525
}
interface Chassis extends TankModule {
    rotation_speed: number //33
    armory: number[] // Array<number>
    max_load: number // 31400
    // terrain_resistance: number[] // terrain_resistance: [ 1.2, 1.6, 2.3 ],
    terrain_resistance: [
        number,
        number,
        number
    ] // terrain_resistance: [ 1.2, 1.6, 2.3 ],
}
interface Turret extends TankModule {
    rotation_speed: number
    vision_radius: number
    /** Each key is the gun name */
    guns: {
        [key: string]: Gun
    }
}
interface Gun extends TankModule {
    reload_time: number
    aiming_time: number
    shot_dispersion_radius: number
    max_ammo: number
    shots_per_clip: number
    elevation: number
    depression: number
    rotation_speed: number
    /** Each key is the shot/ammo name */
    shots: {
        [key: string]: Shot
    }
    armory: Array<number> // not sure what this is?...
    gun_rate_mod: number
    gun_rate: number
}
interface Shot {
    index: number
    /** Friendly name of the shell */
    user_string: string
    /** Caliber of the shell in mm */
    caliber: number
    price: number
    /** Amount of damage the shell does as HP */
    damage: number
    is_premium: boolean
    /** Penetration value for shell in mm */
    piercing_power: number
}

export type {
    Tank,
    TankInfo,
    TankData,
    TankModule,
    Engine,
    Radio,
    Chassis,
    Turret,
    Gun,
    Shot,
    TankTypeSlug
}
