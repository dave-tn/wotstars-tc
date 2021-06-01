import { FC } from 'react'

import styles from './RowComponentStyles.module.css'
import { TankIntro } from '../Components/TankIntro'
import { useRemoveTank } from '../hooks/useTankState'
import { GQLTank } from '../Components/AddTankComponents/SelectTankList'

const HeaderRow: FC<{
    data: GQLTank[],
    showTankEditor: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ data, showTankEditor }) => {
    const removeTank = useRemoveTank()

    return (
        <tr>
            <th></th>{ /* No title/header for the row */}
            { data.map(td => {
                if (!td) return <td key={Date.now()}>Missing tank data<br /> for this config</td>

                const uid = parseInt(td.fingerprint.split('.')[6])

                return (
                    <td key={td.fingerprint} style={{ position: 'relative' }}>
                        <div className={styles.headerRemoveTankButton} onClick={() => removeTank(uid)}>-</div>
                        <TankIntro tank={td} />
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
