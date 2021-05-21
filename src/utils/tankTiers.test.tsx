import { toRoman, KNOWN_TIERS } from './tankTiers'

describe('handle converiting numbers to roman numerals', () => {

    it('returns a roman numeral for a valid number', () => {
        const rom1 = toRoman(1)
        expect(rom1).toBe('I')
        const rom2 = toRoman(10)
        expect(rom2).toBe('X')
    })

    it('returns a question mark if the passed value is unknown', () => {
        const rom1 = toRoman(0)
        expect(rom1).toBe('?')
    })

    it('KNOWN_TIERS is an array of numbers', () => {
        expect(Array.isArray(KNOWN_TIERS)).toBe(true)
        let allAreNumbers = KNOWN_TIERS.every(tier => typeof tier === 'number')
        expect(allAreNumbers).toBe(true)
    })

})
