
import { generateTankFingerprint, objFromFingerprint } from './generateTankFingerprint'
import { Fingerprint } from './getTankConfig'

it('turns a list of numbers in to a separated string of 7 numbers', () => {
    const fp = generateTankFingerprint(1,2,3,4,5,6)
    expect(fp.split('.').length).toBe(7)
})

it('creates unique ID even if tank configuration is the same', () => {
    const fp1 = generateTankFingerprint(1,2,3,4,5,6)
    const fp2 = generateTankFingerprint(1,2,3,4,5,6)
    expect(fp1).not.toBe(fp2)
})

it('creates a config object from a fingerprint', () => {
    const confObj = objFromFingerprint('1.2.3.4.5.6' as Fingerprint)
    expect(confObj.id).toBe(1)
    expect(confObj.chassisIndex).toBe(2)
    expect(confObj.engineIndex).toBe(3)
    expect(confObj.turretIndex).toBe(4)
    expect(confObj.gunIndex).toBe(5)
    expect(confObj.shotIndex).toBe(6)
})
