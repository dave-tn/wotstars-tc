import { FC } from 'react'

import styles from './RowComponentStyles.module.css'
import { MakeCell } from './_MakeCell'


interface MakeRow {
    uid: number
    [key: string]: number | number[] | undefined
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
            { data.map(rowData => {

                if (rowData[para] === undefined) return <td key={rowData.uid}>🤷‍♂️</td>

                let cellPrimaryData: number[] = []
                let cellComparisonData: (number|undefined)[] = []

                const rowDataVal = rowData[para]
                const comparisonDataVal = data[0][para]

                if (typeof rowDataVal === 'number') {
                    cellPrimaryData.push(rowDataVal)
                    // the types of the main data and the comparison data should always match;
                    // however if for some strange reason they don't, we can leave the empty array
                    // and the cell comp will be passed undefined when checking the index and
                    // that's ok; no comparison will happen is all
                    if (typeof comparisonDataVal === 'number' || !comparisonDataVal)
                        cellComparisonData.push(comparisonDataVal)
                } else if (Array.isArray(rowDataVal)) {
                    cellPrimaryData = rowDataVal
                    if (Array.isArray(comparisonDataVal)) cellComparisonData = comparisonDataVal
                }

                return (
                    <td key={rowData.uid}>
                        <div className={styles.cellWrap}>
                        { cellPrimaryData.map((val, idx) => (
                                <MakeCell
                                    key={`${rowData.uid}${idx}`}
                                    val={val}
                                    compVal={cellComparisonData[idx]}
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
