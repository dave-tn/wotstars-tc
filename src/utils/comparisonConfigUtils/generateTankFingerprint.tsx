
export type Fingerprint = `${number}.${number}.${number}.${number}.${number}.${number}.${number}`

/**
 * Generates a list of unique ascending IDs
 * (Fairly horribly... we use the date in seconds to ensure that if a person uses
 * a link already containing state we do not generate a conflicting ID)
 */
 function* idGenerator() {
    let id = Math.round(Date.now() / 1000)
    while (true) {
        yield id
        id++
    }
}
const uniqueIdGenerator = idGenerator()
const getUniqueIdString = () => String(uniqueIdGenerator.next().value)


/**
 * Creates a unique representation of a tank configuration
 * @param tankId The tank's WG ID
 * @param xxIndex The chosen tank's index for this particular module/item
 */
function generateTankFingerprint(tankId: number, chassisIndex: number, engineIndex: number, turretIndex: number, gunIndex: number, shotIndex: number): Fingerprint {

    // Use a unique ID so our fingerprint is ensured unique, meaning we can then have
    // the same vehicle configuration showing, if someone would want to do that... (maybe 
    // for comparing ammo or whatever)    
    const tankFingerprint = `${tankId}.${chassisIndex}.${engineIndex}.${turretIndex}.${gunIndex}.${shotIndex}.${getUniqueIdString()}` as Fingerprint
    return tankFingerprint
}

function objFromFingerprint(fp: Fingerprint) {
    const split = fp.split('.')
        .map(part => parseInt(part))
    
    return {
        id: split[0],
        chassisIndex: split[1],
        engineIndex: split[2],
        turretIndex: split[3],
        gunIndex: split[4],
        shotIndex: split[5],
        uuid: split[6]
    }
}

function fingerprintsToString(fingerprints: Fingerprint[]) {
    return fingerprints.join('~')
}
function fingerprintsFromString(stringOfFingerprints: string) {
    return stringOfFingerprints.split('~') as Fingerprint[]
}

export {
    generateTankFingerprint,
    objFromFingerprint,
    fingerprintsToString,
    fingerprintsFromString
}
