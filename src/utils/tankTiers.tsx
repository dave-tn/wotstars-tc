
type RomanTuple = [
    /** Arabic style number for the tank tier */
    number,
    /** Roman style number for the tank tier */
    string
]

const ROMAN_LEGEND: RomanTuple[] = [
    [1, 'I'], [2, 'II'], [3, 'III'], [4, 'IV'], [5, 'V'], [6, 'VI'], [7, 'VII'], [8, 'VIII'], [9, 'IX'], [10, 'X'], [11, 'XI'], [12, 'XII'], [13, 'XIII']
]

function toRoman(x: number): string {
    return ROMAN_LEGEND.find(([num]) => num === x)?.[1] ?? '?'
}
function fromRoman(x: string): number {
    return ROMAN_LEGEND.find(([_num, str]) => str === x)?.[0] ?? 0
}

export {
    toRoman,
    fromRoman,
    ROMAN_LEGEND
}
