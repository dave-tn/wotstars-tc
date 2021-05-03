
import { generateTankFingerprint } from './generateTankFingerprint'

it('turns a list of numbers in to a colon separated string of 7 numbers', () => {
    const fp = generateTankFingerprint(1,2,3,4,5,6)
    expect(fp.split(':').length).toBe(7)
})

it('creates unique ID even if tank configuration is the same', () => {
    const fp1 = generateTankFingerprint(1,2,3,4,5,6)
    const fp2 = generateTankFingerprint(1,2,3,4,5,6)
    expect(fp1).not.toBe(fp2)
})
