import { FC } from 'react'

import styles from './RowComponentStyles.module.css'
import { TankConfig } from './../utils/comparisonConfigUtils/getTankConfig'
import { TankIntro } from '../Components/TankIntro'
import { useRemoveTank } from '../hooks/useTankState'

const HeaderRow: FC<{
    data: TankConfig[],
    showTankEditor: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ data, showTankEditor }) => {
    const removeTank = useRemoveTank()

    return (
        <tr>
            <th></th>{ /* No title/header for the row */}
            { data.map(td => {
                if (!td.rawData) return <td key={td.uid}>Missing tank data<br /> for this config</td>

                return (
                    <td key={td.uid} style={{ position: 'relative' }}>
                        <div className={styles.headerRemoveTankButton} onClick={() => removeTank(td.uid)}>-</div>
                        {/* <TankIntro tank={td.rawData.info} /> */}
                    </td>
                )
            })}
            <td>
                <div className={styles.headerAddTankButton} onClick={() => showTankEditor(true)}>
                    ADD TANK
                </div>
            </td>
        </tr>
    )
}
export {
    HeaderRow
}
