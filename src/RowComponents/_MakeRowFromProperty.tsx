import { FC } from 'react'

import { MakeCell } from './_MakeCell'


interface MakeRow {
    [key: string]: number | undefined
}

const MakeRowFromProperty:FC<{
    title: string
    data: MakeRow[]
    para: string
    suffix?: string
    roundTo?: number
}> = ({ title, data, para, roundTo, suffix }) => (
    <tr>
        <td>{ title }</td>{ /* Title/header for the row */ }
        {/* TODO: FIXME: Key these properly... */}
        { data.map(f => <td key={Date.now() + Math.random()}><MakeCell val={f[para]} compVal={data[0][para]} suffix={suffix} roundTo={roundTo} /></td> )}
    </tr>
)

export {
    MakeRowFromProperty
}
