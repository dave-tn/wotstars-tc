
import { Fingerprint } from './getTankConfig'

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
function generateTankFingerprint(tankId: number, chassisIndex: number, engineIndex: number, turretIndex: number, gunIndex: number, ammoIndex: number): Fingerprint {

    // Use a unique ID so our fingerprint is ensured unique, meaning we can then have
    // the same vehicle configuration showing, if someone would want to do that... (maybe 
    // for comparing ammo or whatever)    
    const tankFingerprint = `${tankId}:${chassisIndex}:${engineIndex}:${turretIndex}:${gunIndex}:${ammoIndex}:${getUniqueIdString()}` as Fingerprint
    return tankFingerprint
}

export {
    generateTankFingerprint
}
