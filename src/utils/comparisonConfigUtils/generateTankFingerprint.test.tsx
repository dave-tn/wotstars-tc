
import { generateTankFingerprint } from './generateTankFingerprint'

test('turns a list of numbers in to a colon separated string', () => {
    const fp = generateTankFingerprint(1,2,3,4,5,6)
    expect(fp).toBe('1:2:3:4:5:6:0')
})

test('adds a sequential unique ID', () => {
    const fp = generateTankFingerprint(1,2,3,4,5,6)
    expect(fp).toBe('1:2:3:4:5:6:1')
})
