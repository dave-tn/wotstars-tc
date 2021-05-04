import { FC } from 'react'

import styles from './RowComponentStyles.module.css'
import { TankConfig } from './../utils/comparisonConfigUtils/getTankConfig'
import { TankIntro } from '../Components/TankIntro'

const HeaderRow: FC<{ data: TankConfig[], showTankEditor: React.Dispatch<React.SetStateAction<boolean>> }> = ({ data, showTankEditor }) => {

    return (
        <tr>
            <td></td>{ /* No title/header for the row */}
            { data.map(td => {
                if (!td.rawData) return <td key={td.uid}>Missing tank data<br /> for this config</td>

                return (
                    <td key={td.uid}>
                        <TankIntro tank={td.rawData.info} />
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
