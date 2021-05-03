import { FC } from 'react'

import styles from './RowComponentStyles.module.css'
import { MakeCell } from './_MakeCell'


interface MakeRow {
    uid: number
    [key: string]: number | (number|undefined)[] | undefined
}

const MakeRowFromProperty: FC<{
    title: string
    data: MakeRow[]
    para: string
    suffix?: string
    roundTo?: number
    biggerIsBetter?: boolean
}> = ({ title, data, para, roundTo, suffix, biggerIsBetter }) => {

    return (
        <tr>
            <td className={styles.cellRowsTitle}>{title}</td>
            { data.map(f => {

                if (f[para] === undefined) return <td key={f.uid}>🤷‍♂️</td>

                /**
                 * TODO: FIXME: Is this really the way to do this in TS?...
                 */
                let cellPrimaryData: number[] = []
                let cellCompData: number[] = []
                if (typeof f[para] === 'number') {
                    cellPrimaryData = [ f[para] as number ]
                    cellCompData = [ data[0][para] as number ]
                } else if (Array.isArray(f[para])) {
                    cellPrimaryData = f[para] as number[]
                    if (Array.isArray(data[0][para])) cellCompData = data[0][para] as number[]
                }

                return (
                    <td key={f.uid}>
                        <div className={styles.cellWrap}>
                        { cellPrimaryData.map((val, idx) => (
                                <MakeCell
                                    key={`${f.uid}${idx}`}
                                    val={val}
                                    compVal={cellCompData[idx]}
                                    suffix={suffix}
                                    roundTo={roundTo}
                                    biggerIsBetter={biggerIsBetter}
                                />
                            )
                        )}
                        </div>
                    </td>
                )

            })}
        </tr>
    )
}

export {
    MakeRowFromProperty
}
