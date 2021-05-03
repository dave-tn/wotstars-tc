import { FC } from 'react'
import { rounder } from './../utils/rounder'

const MakeCell:FC<{
    val?: number
    compVal?: number
    suffix?: string
    roundTo?: number
    biggerIsBetter?: boolean
}> = ({ val, compVal, suffix, roundTo, biggerIsBetter = true }) => {

    let compStyle

    if (val === undefined) return <div data-testid="empty"></div>

    /**
     * If we have a comparison value, we shade the cell backgrounds based
     * on how the cell value (val) compares to the 'first' tank's stat for the cell (the compVal)
     */
    if (compVal !== undefined && val !== compVal) {
        const diff = val / compVal
        // Set the background opacity percentage based on the difference percentage
        const opacity = diff > 1 ? Math.min(.75, diff-1) : Math.min(.75, 1-diff)
        // 'Good' colour first, but reverse if bigger values are not better values (eg. aim time)
        const colours = [ '90,200,70', '255,0,0' ]
        if (!biggerIsBetter) colours.reverse()
        const baseColour = diff > 1 ? colours[0] : colours[1]
        compStyle = { backgroundColor: `rgba(${baseColour},${opacity})`}
    }

    return (
        <div style={compStyle}>
            { roundTo !== undefined ? rounder(val, roundTo) : val }{ suffix }
        </div>
    )
}

export {
    MakeCell
}
