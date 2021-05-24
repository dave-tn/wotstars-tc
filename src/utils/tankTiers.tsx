
const ROMANS = [ 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII' ] as const
type RomanNumeral = typeof ROMANS[number]

const KNOWN_TIERS = ROMANS
    .map((_r, indexAsTierNumerical) => indexAsTierNumerical + 1)

function toRoman(x: number): RomanNumeral | '?' {
    return ROMANS[x-1] ?? '?'
}

export {
    toRoman,
    ROMANS,
    KNOWN_TIERS
}
