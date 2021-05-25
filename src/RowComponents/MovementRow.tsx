import { FC } from 'react'

import styles from './RowComponentStyles.module.css'

import { MakeRowFromProperty } from './_MakeRowFromProperty'
import { GQLTank } from '../AddTankComponents/SelectTankList'

interface Movement {
    fingerprint: string
    [key: string]: number | number[] | string | undefined
}

const MovementRow:FC<{ data: GQLTank[] }> = ({ data }) => {

    const movementData: Movement[] = data.map(tc => {
        const totalWeight = tc.chassi.weight + tc.engine.weight + tc.turret.weight + tc.turret.gun.weight
        const hpPer = tc.engine.power / (totalWeight / 1000)

        return {
            fingerprint: tc.fingerprint,
            speed: tc.speeds,
            rotations: [ tc.chassi.rotation_speed, tc.turret.rotation_speed ],
            power: [ tc.engine.power, hpPer ],
            terrainResistance: tc.chassi.terrain_resistance,
            camo: tc.camo,
            viewRange: tc.turret.vision_radius
        }
    })

    return (
        <>
        <tr>
            <th className={styles.header} colSpan={9}>Movement / Mobility</th>
        </tr>
        <MakeRowFromProperty title="Speed [forward/reverse]" data={movementData} para="speed" suffix="kph" />
        <MakeRowFromProperty title="Traverse [hull/turret]" data={movementData} para="rotations" suffix="°/s" />
        <MakeRowFromProperty title="Engine Power / per tonne" data={movementData} para="power" suffix="hp" roundTo={0} />
        <MakeRowFromProperty title="Terrain [hard/med/soft]" data={movementData} para="terrainResistance" biggerIsBetter={false} />
        <MakeRowFromProperty title="Camo [still/moving]" data={movementData} para="camo" />
        <MakeRowFromProperty title="View range" data={movementData} para="viewRange" suffix="m" />
        </>
    )
}
export { MovementRow }
