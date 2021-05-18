import { FC } from 'react'

import { Tank } from './typesStuff/Tank'

import { useTankState } from './hooks/useTankState'
import { HeaderRow } from './RowComponents/HeaderRow'
import { BonusesRow } from './RowComponents/BonusesRow'
import { FirepowerRow } from './RowComponents/FirepowerRow'
import { WeaponHandlingRow } from './RowComponents/WeaponHandlingRow'
import { MovementRow } from './RowComponents/MovementRow'

export const TanksTable:FC<{
    tanks: Tank[]
    showTankEditor: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ tanks, showTankEditor }) => {

    const [ tankCompData ] = useTankState(tanks)

    return (
        <div className="xxxxxxMain-grid">

            <table>
                <tbody>
                    <HeaderRow data={tankCompData} showTankEditor={showTankEditor} />
                    <BonusesRow data={tankCompData} />
                    <FirepowerRow data={tankCompData} />
                    <WeaponHandlingRow data={tankCompData} />
                    <MovementRow data={tankCompData} />
                </tbody>
            </table>

        </div>
    )
}
