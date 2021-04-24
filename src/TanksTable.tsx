import { FC } from 'react'

import { Tank } from './typesStuff/Tank'

import { useTankState } from './hooks/useTankState'
import { HeaderRow } from './RowComponents/HeaderRow'
import { FirepowerRow } from './RowComponents/FirepowerRow'

export const TanksTable:FC<{ tanks: Tank[] }> = ({ tanks }) => {

    const [ tankCompData ] = useTankState(tanks)

    return (
        <div className="xxxxxxMain-grid">

            <table>
                <tbody>
                    <HeaderRow data={tankCompData} />
                    <FirepowerRow data={tankCompData} />
                </tbody>
            </table>

        </div>
    )
}
