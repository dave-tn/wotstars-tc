

// For performance reasons, we create NumberFormat objects for various decimal rounding just once, and reuse them...
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString#Performance
// performance difference is *significant* when formatting many values

// The common / default formats we use, which are 0, 2 and 3 decimal places (both min and max)
const formats = [
    // 0 decimal places, min 0 decimal places (so just formatting number to friendly localised string)
    [new Intl.NumberFormat(undefined, { maximumFractionDigits: 0, minimumFractionDigits: 0 })],
    [], // 1 decimal places - unused...
    [ // decimal places 2
        null, null,
        // min decimal places 2
        new Intl.NumberFormat(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })
    ],
    [ // 3 decimal places
        null, null, null,
        // min decimal places 3
        new Intl.NumberFormat(undefined, { maximumFractionDigits: 3, minimumFractionDigits: 3 })
    ],
    [ // 4 decimal places (only used for cap points vals? bleh)
        null, null, null, null,
        new Intl.NumberFormat(undefined, { maximumFractionDigits: 4, minimumFractionDigits: 4 })
    ]
]


/**
 * 
 * @param value The number to round
 * @param decimalPlaces The number of decimal places we want
 * @param mfdOg Min / max decimal places
 * @returns string representation of the rounded number
 */
function rounder(value: number, decimalPlaces: number = 2, mfdOg?: number) {
    const mfd = mfdOg ?? decimalPlaces

    if (formats[decimalPlaces] && formats[decimalPlaces][mfd]) {
        return formats[decimalPlaces][mfd]?.format(value)
    }

    if (process.env.NODE_ENV === 'development') {
        console.warn(`[rounder.tsx] Using Number's toLocaleString in un-optimised way....
            For ${value} [max:${decimalPlaces}->min:${mfd}]`)
    }
    return Number(value).toLocaleString(undefined, { maximumFractionDigits: decimalPlaces, minimumFractionDigits: mfd })
}

export {
    rounder
}
