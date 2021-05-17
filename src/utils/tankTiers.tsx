
const ROMANS = [ 'I', 'II', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII' ] as const
type RomanNumeral = typeof ROMANS[number]

const KNOWN_TIERS = ROMANS
    .slice(1)
    .map((_r, indexAsTierNumerical) => indexAsTierNumerical)

function toRoman(x: number): RomanNumeral | '?' {
    return ROMANS[x-1] ?? '?'
}

export {
    toRoman,
    ROMANS,
    KNOWN_TIERS
}
