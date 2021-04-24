
import { Tank, Chassis, Engine, Turret, Gun, Shot } from './../../typesStuff/Tank'

export type Fingerprint = `${number}:${number}:${number}:${number}:${number}:${number}:${number}`

export interface TankConfig {
    /** The tank's raw WG data */
    rawData: Tank | undefined
    /** Sekected chassis index */
    chassisIndex: number
    /** Selected engine index */
    engineIndex: number
    /** Selected turret index */
    turretIndex: number
    /** Selected gun index */
    gunIndex: number
    /** Selected ammo index */
    ammoIndex: number
    /** Unique ID */
    uid: number
    selectedChassis: Chassis | undefined
    selectedEngine: Engine | undefined
    selectedTurret: Turret | undefined
    selectedGun: Gun | undefined
    selectedAmmo: Shot | undefined
}

function getTankConfig(tankFingerprint: Fingerprint, tanks: Tank[]) {
    const splitTfp = tankFingerprint.split(':').map(s => parseInt(s))

    const theTank = tanks.find(t => t.info.id === splitTfp[0])
    const theTurret = Object.values(theTank?.data.turrets ?? {}).find(c => c.index === splitTfp[3])
    const theGun = Object.values(theTurret?.guns ?? {}).find(c => c.index === splitTfp[4])
    const theAmmo = Object.values(theGun?.shots ?? {}).find(c => c.index === splitTfp[5])
    const tankCompData: TankConfig = {
        rawData: theTank,
        chassisIndex: splitTfp[1],
        engineIndex: splitTfp[2],
        turretIndex: splitTfp[3],
        gunIndex: splitTfp[4],
        ammoIndex: splitTfp[5],
        uid: splitTfp[6],
        selectedChassis: Object.values(theTank?.data.chassis ?? {}).find(c => c.index === splitTfp[1]),
        selectedEngine: Object.values(theTank?.data.engines ?? {}).find(c => c.index === splitTfp[2]),
        selectedTurret: theTurret,
        selectedGun: theGun,
        selectedAmmo: theAmmo
    }
    return tankCompData
}

function getTankConfigs(tankFingerprints: Fingerprint[], tanks: Tank[]) {
    return tankFingerprints.map(fp => getTankConfig(fp, tanks))
}

export {
    getTankConfig,
    getTankConfigs
}
