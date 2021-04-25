
import { TankTypeSlug } from './../typesStuff/Tank'

type TypesTuple = [
    /** The WG tank type slug */
    TankTypeSlug,
    /** The friendly user string for the vehicle type */
    string
]

const VEHICLE_TYPES: TypesTuple[] = [
    [ 'lightTank', 'Light Tank' ],
    [ 'mediumTank', 'Medium Tank' ],
    [ 'heavyTank', 'Heavy Tank' ],
    [ 'AT-SPG', 'Tank Destroyer' ],
    [ 'SPG', 'Artillery']
]

function toType(slug: TankTypeSlug): string {
    return VEHICLE_TYPES.find(t => t[0] === slug)?.[1] ?? 'unknown type'
}

export {
    toType
}
