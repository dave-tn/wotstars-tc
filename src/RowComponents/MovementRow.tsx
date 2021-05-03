import { FC } from 'react'

import styles from './RowComponentStyles.module.css'

import { TankConfig } from '../utils/comparisonConfigUtils/getTankConfig'
import { MakeRowFromProperty } from './_MakeRowFromProperty'

interface Movement {
    uid: number
    [key: string]: number | (number|undefined)[] | undefined
}

const MovementRow:FC<{ data: TankConfig[] }> = ({ data }) => {

    const movementData: Movement[] = data.map(tc => {
        if (!tc.selectedChassis || !tc.selectedEngine || !tc.selectedTurret || !tc.selectedGun || !tc.rawData) return { uid: tc.uid }
        const { data } = tc.rawData

        const hullRotation = tc.selectedChassis.rotation_speed
        const turretRotation = tc.selectedTurret.rotation_speed

        const totalWeight = tc.selectedChassis.weight + tc.selectedEngine.weight + tc.selectedTurret.weight + tc.selectedGun.weight
        const hpPer = tc.selectedEngine.power / (totalWeight / 1000)

        return {
            uid: tc.uid,
            speed: [ data.speed.forward, data.speed.backward ],
            rotations: [ hullRotation, turretRotation ],
            power: [ tc.selectedEngine.power, hpPer ],
            terrainResistance: tc.selectedChassis.terrain_resistance,
            camo: [tc.rawData.data.invisibility.still, tc.rawData.data.invisibility.moving]
        }
    })

    return (
        <>
        <tr>
            <td className={styles.header} colSpan={9}>Movement / Mobility</td>
        </tr>
        <MakeRowFromProperty title="Speed [forward/reverse]" data={movementData} para="speed" suffix="kph" />
        <MakeRowFromProperty title="Traverse [hull/turret]" data={movementData} para="rotations" suffix="°/s" />
        <MakeRowFromProperty title="Engine Power / per tonne" data={movementData} para="power" suffix="hp" roundTo={0} />
        <MakeRowFromProperty title="Terrain [hard/med/soft]" data={movementData} para="terrainResistance" biggerIsBetter={false} />
        <MakeRowFromProperty title="Camo [still/moving]" data={movementData} para="camo" />
        </>
    )
}
export { MovementRow }
