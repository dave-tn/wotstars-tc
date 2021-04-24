
import { Tank } from './../../typesStuff/Tank'

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
    ammoIndex: number,
    /** Unique ID */
    uid: number
}

function getTankConfig(tankFingerprint: Fingerprint, tanks: Tank[]) {
    const splitTfp = tankFingerprint.split(':').map(s => parseInt(s))
    const tankCompData: TankConfig = {
        rawData: tanks.find(t => t.info.id === splitTfp[0]),
        chassisIndex: splitTfp[1],
        engineIndex: splitTfp[2],
        turretIndex: splitTfp[3],
        gunIndex: splitTfp[4],
        ammoIndex: splitTfp[5],
        uid: splitTfp[6]
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
