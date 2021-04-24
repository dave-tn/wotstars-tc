import { FC } from 'react'

import { Tank } from './typesStuff/Tank'

import { useTankState } from './hooks/useTankState'
import { HeaderRow } from './RowComponents/HeaderRow'

export const TanksTable:FC<{ tanks: Tank[] }> = ({ tanks }) => {

    const [ tankCompData ] = useTankState(tanks)

    return (
        <div className="xxxxxxMain-grid">

            <table>
                <tbody>
                    <HeaderRow data={tankCompData} />
                </tbody>
            </table>

        </div>
    )
}
