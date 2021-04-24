

/**
 * Generates a list of unique sequential IDs
 */
 function* idGenerator() {
    let id = 0
    while (true) {
        yield id
        id++
    }
}
const uniqueIdGenerator = idGenerator()
const getUniqueIdString = () => String(uniqueIdGenerator.next().value)


/**
 * Creates a unique representation of a tank configuration
 */
function generateTankFingerprint(tankId: number, chassisIndex: number, engineIndex: number, turretIndex: number, gunIndex: number, ammoIndex: number) {

    // Use a unique ID so our fingerprint is ensured unique, meaning we can then have
    // the same vehicle configuration showing, if someone would want to do that... (maybe 
    // for comparing ammo or whatever)    
    const tankFingerprint = `${tankId}:${chassisIndex}:${engineIndex}:${turretIndex}:${gunIndex}:${ammoIndex}:${getUniqueIdString()}`
    return tankFingerprint
}

export {
    generateTankFingerprint
}
