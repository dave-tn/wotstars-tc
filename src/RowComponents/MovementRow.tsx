import { FC } from 'react'

import styles from './RowComponentStyles.module.css'

import { TankConfig } from '../utils/comparisonConfigUtils/getTankConfig'
// import { MakeCell } from './_MakeCell'
import { MakeRowFromProperty } from './_MakeRowFromProperty'

interface Movement {
    uid: number
    [key: string]: number | undefined
}

const MovementRow:FC<{ data: TankConfig[] }> = ({ data }) => {

    const movementData: Movement[] = data.map(tc => {
        if (!tc.selectedChassis || !tc.selectedEngine || !tc.rawData) return { uid: tc.uid }
        return {
            uid: tc.uid,
            speedForward: tc.rawData.data.speed.forward,
            speedBackward: tc.rawData.data.speed.backward,
            rotationSpeed: tc.selectedChassis.rotation_speed,
            enginePower: tc.selectedEngine.power,
            terrainResistance: tc.selectedChassis.terrain_resistance[0]
        }
    })

    return (
        <>
        <tr>
            <td className={styles.header} colSpan={9}>Movement / Mobility</td>
        </tr>
        <MakeRowFromProperty title="Speed Forward" data={movementData} para="speedForward" />
        <MakeRowFromProperty title="Speed Backward" data={movementData} para="speedBackward" />
        <MakeRowFromProperty title="Rotation / Traverse" data={movementData} para="rotationSpeed" />
        <MakeRowFromProperty title="Engine Power" data={movementData} para="enginePower" />
        <MakeRowFromProperty title="Terrain Resistance" data={movementData} para="terrainResistance" />
        </>
    )
}
export { MovementRow }
