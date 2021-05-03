import { FC } from 'react'

import { MakeCell } from './_MakeCell'


interface MakeRow {
    uid: number
    [key: string]: number | undefined
}

const MakeRowFromProperty:FC<{
    title: string
    data: MakeRow[]
    para: string
    suffix?: string
    roundTo?: number
    biggerIsBetter?: boolean
}> = ({ title, data, para, roundTo, suffix, biggerIsBetter }) => (
    <tr>
        <td>{ title }</td>{ /* Title/header for the row */ }
        { data.map(f => (
            <td
                key={f.uid}
            >
                <MakeCell
                    val={f[para]}
                    compVal={data[0][para]}
                    suffix={suffix}
                    roundTo={roundTo}
                    biggerIsBetter={biggerIsBetter}
                />
            </td>
        ))}
    </tr>
)

export {
    MakeRowFromProperty
}
