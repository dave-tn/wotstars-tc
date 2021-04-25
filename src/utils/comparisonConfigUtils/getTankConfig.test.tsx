
import { Tank } from './../../typesStuff/Tank'
import { getTankConfig, Fingerprint } from './getTankConfig'

describe('returns a config based on a fingerprint', () => {

    const chassis = {
        'chassis 1': { index: 0 },
        'chassis 2': { index: 1 },
    }
    const engines = {
        'engine 1': { index: 0 },
        'engine 2': { index: 1 }
    }
    const turrets = {
        'turret 1': {
            index: 1,
            guns: {
                'gun 1': {
                    index: 1,
                    shots: {
                        'shot 1': { index: 0 },
                        'shot 2': { index: 1 }
                    }
                }
            }
        }
    }

    const tanks: Tank[] = [
        {
            info: {
                id: 1
            },
            data: {
                chassis,
                engines,
                turrets
            }
        } as unknown as Tank
    ]

    const fp: Fingerprint = '1:1:1:1:1:0:7'
    const tankConfig = getTankConfig(fp, tanks)
    it('selects the correct tank based on the tank ID', () => {
        expect(tankConfig.rawData).toBe(tanks[0])
    })

    it('selects the correct chassis based on the chassi index in fingerprint', () => {
        expect(tankConfig.chassisIndex).toBe(1)
        expect(tankConfig.selectedChassis).toBe(chassis['chassis 2'])
    })

    it('selects the correct engine based on the engine index in fingerprint', () => {
        expect(tankConfig.engineIndex).toBe(1)
        expect(tankConfig.selectedEngine).toBe(engines['engine 2'])
    })

    it('selects the correct turret based on the turret index in fingerprint', () => {
        expect(tankConfig.turretIndex).toBe(1)
        expect(tankConfig.selectedTurret).toBe(turrets['turret 1'])
    })

    it('selects the correct gun based on the turret & gun index in fingerprint', () => {
        expect(tankConfig.gunIndex).toBe(1)
        expect(tankConfig.selectedGun).toBe(turrets['turret 1'].guns['gun 1'])
    })

    it('selects the correct ammo based on the turret & gun & ammo index in fingerprint', () => {
        expect(tankConfig.ammoIndex).toBe(0)
        expect(tankConfig.selectedAmmo).toBe(turrets['turret 1'].guns['gun 1'].shots['shot 1'])
    })

    /**
     * If there's no Tank ID match it could be because an old comparison link
     * is visited with query params state but that tank is no longer in Wargaming's data.
     * If that's the case, we probably just want to show a warning to that end
     */
    it(`doesn't crash but returns shell obj if no tank ID match`, () => {
        const fingerprintForNoneExistantTank: Fingerprint = '2:1:2:2:1:2:0'
        const config = getTankConfig(fingerprintForNoneExistantTank, tanks)
        expect(config).not.toBe(undefined)
        expect(config.rawData).toBe(undefined)
    })

    /**
     * Handle bad fingerprints as expected by the UI (no crashes etc, just undefined modules)
     */
    it('returns a config with undefined set for selected modules that do not exist on the tank though are in fingerprint', () => {
        const fingerprintForNoneExistantTank: Fingerprint = '1:2:2:2:1:1:0'
        const config = getTankConfig(fingerprintForNoneExistantTank, tanks)
        expect(config.chassisIndex).toBe(2)
        expect(config.selectedChassis).toBe(undefined)
        expect(config.turretIndex).toBe(2)
        expect(config.selectedTurret).toBe(undefined)
        // Valid gun index for the wrong turret, should result in undefined gun
        expect(config.gunIndex).toBe(1)
        expect(config.selectedGun).toBe(undefined)
        // Valid ammo index but for a gun that doesn't exist, should result in undefined
        expect(config.ammoIndex).toBe(1)
        expect(config.selectedAmmo).toBe(undefined)
    })

})
