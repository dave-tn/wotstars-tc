import { FC } from 'react'
import { rounder } from './../utils/rounder'

const MakeCell:FC<{ val?: number, compVal?: number, roundTo?: number}> = ({ val, compVal, roundTo }) => {
    let compStyle

    if (!val) return <td></td>
    if (compVal) {
        const diff = val / compVal
        if (diff > 1) {
            compStyle = { backgroundColor: `rgba(90,200,70,${Math.min(.75, diff-1)})`}
        }
        if (diff < 1) {
            compStyle = { backgroundColor: `rgba(255,0,0,${Math.min(.75, 1-diff)})`}
        }
    }

    return (
        <td style={compStyle}>
            { roundTo ? rounder(val, roundTo) : val }
        </td>
    )
}

export {
    MakeCell
}
