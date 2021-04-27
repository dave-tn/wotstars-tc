import { FC } from 'react'

import { MakeCell } from './_MakeCell'


interface MakeRow {
    [key: string]: number | undefined
}

const MakeRowFromProperty:FC<{
    title: string, 
    data: MakeRow[],
    para: string, 
    roundTo?: number 
}> = ({ title, data, para, roundTo }) => (
    <tr>
        <td>{ title }</td>{ /* Title/header for the row */ }
        {/* TODO: FIXME: Key these properly... */}
        { data.map(f => <td><MakeCell val={f[para]} compVal={data[0][para]} roundTo={roundTo} key={Date.now() + Math.random()} /></td> )}
    </tr>
)

export {
    MakeRowFromProperty
}
