
// For performance reasons, we create NumberFormat objects for various decimal rounding just once, and reuse them...
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString#Performance
// NB. Performance difference is *significant* when formatting many values, as we do

// A two character representation of the decimal places we want to use (maximumFractionDigits and MinimumFractionDigits)
type FormatKey = `${number}:${number}`

const formats: Map<FormatKey, Intl.NumberFormat> = new Map()
// formats.set('00', new Intl.NumberFormat(undefined, { maximumFractionDigits: 0, minimumFractionDigits: 0 }))
// formats.set('22', new Intl.NumberFormat(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }))
function getFormatter(maxFD: number, minFD: number) {
    const key: FormatKey = `${maxFD}:${minFD}`
    let formatter = formats.get(key)
    if (!formatter) {
        if (process.env.NODE_ENV === 'development')
            console.warn(`[rounder.ts] Using Number's toLocaleString in un-optimised way, but we'll cache (as '${key}') for next time....`)

        // Create and cache the formatter for future use for performance reasons (see above)
        // An 'undefined' locale means use the browser's default locale
        formatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: maxFD, minimumFractionDigits: minFD })
        formats.set(key, formatter)
    }
    return formatter.format
}


/** Takes a number and rounds it to a certain number of decimal places, and formats for the browser locale in question (eg. . vs , decimal). */
const rounder = (
    // A number to round...
    value: number,
    // The maximum number of decimal places to round to; but really 'maximumFractionDigits'
    decimalPlaces: number = 2,
    // The minimum number of decimal places to round to; but really 'minimumFractionDigits' - defaults to same as 'decimalPlaces'
    minDecimalPlaces: number = decimalPlaces
) => getFormatter(decimalPlaces, minDecimalPlaces)(value)

export {
    rounder
}
