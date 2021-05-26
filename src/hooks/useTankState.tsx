
import { useState, useEffect, useContext } from 'react'

import { Tank } from './../typesStuff/Tank'
import { Fingerprint, objFromFingerprint, fingerprintsToString, fingerprintsFromString } from './../utils/comparisonConfigUtils/generateTankFingerprint'
import { TankConfig, getTankConfigs } from './../utils/comparisonConfigUtils/getTankConfig'


import { HistoryContext, useHistory } from './../HistoryProvider'


export function useTankState(tanks: Tank[]): [ TankConfig[], Fingerprint[] ] {

    const history = useContext(HistoryContext)
    const [ tankCompData, setTankCompData ] = useState<TankConfig[]>([])

    const [ fingerprints, setFingerprints ] = useState<Fingerprint[]>([])

    /**
     * Keep our state in sync with any search params
     */
    useEffect(() => {
        function handleHistoryChange() {
            const searchParams = new URLSearchParams(history.location.search)
            const tanksString = searchParams.get('c')
            if (!tanksString) return setTankCompData([])
            const individualFingerprints = fingerprintsFromString(tanksString)
            setTankCompData(
                getTankConfigs(individualFingerprints, tanks)
            )
            setFingerprints(individualFingerprints)
        }
        // Call here so we trigger on first load
        handleHistoryChange()
        // Set listener so we trigger on any changes to the query params
        const unlisten = history.listen(handleHistoryChange)
        return () => unlisten()
    }, [ history, tanks ])

    return [ tankCompData, fingerprints ]
}


export function useAddTank() {
    const history = useHistory()

    function addTank(fp: Fingerprint) {
        const searchParams = new URLSearchParams(history.location.search)
        const currentState = searchParams.get('c')
        if (currentState) {
            const currentFingerprints = fingerprintsFromString(currentState)
            currentFingerprints.push(fp)
            searchParams.set('c', fingerprintsToString(currentFingerprints))
        }
        else searchParams.set('c', fp)
        history.push({
            pathname: history.location.pathname,
            search: '?' + searchParams.toString()
        })
    }
    return addTank
}

export function useUpdateFingerprint() {
    const history = useHistory()

    function updateAFingerprint(fp: Fingerprint, uuidToReplace: number) {
        const searchParams = new URLSearchParams(history.location.search)
        const tanksString = searchParams.get('c')
        if (!tanksString) return
        const individualFingerprints = fingerprintsFromString(tanksString)

        const fingerprintToUpdateIndex = individualFingerprints
            .map(fp => objFromFingerprint(fp))
            .findIndex(f => f.uuid === uuidToReplace)

        individualFingerprints[fingerprintToUpdateIndex] = fp

        searchParams.set('c', fingerprintsToString(individualFingerprints))
        history.push({
            pathname: history.location.pathname,
            search: '?' + searchParams.toString()
        })

    }

    return updateAFingerprint
}

export function useRemoveTank() {
    const history = useHistory()

    /**
     * Remove a particular tank from the state / comparison
     * @param uid A tankConfig's UID
     */
    function removeTank(uid: number) {
        const searchParams = new URLSearchParams(history.location.search)
        const tanksString = searchParams.get('c')
        if (!tanksString) {
            console.warn(`useRemoveTank: Call to remove a tank but there are none... ${uid}`)
            return
        }

        const tankFingerprints = fingerprintsFromString(tanksString)
        const tankUuids = tankFingerprints.map(fp => objFromFingerprint(fp))
            .map(fpObj => fpObj.uuid)

        const matchingFingerprintIndex = tankUuids.findIndex(f => f === uid)
        if (matchingFingerprintIndex < 0) {
            console.warn(`useRemoveTank: Call to remove a tank that doesn't seem to exists... ${uid}`)
            return
        }
        tankFingerprints.splice(matchingFingerprintIndex, 1)
        searchParams.set('c', fingerprintsToString(tankFingerprints))
        history.push({
            pathname: history.location.pathname,
            search: '?' + searchParams.toString()
        })

    }

    return removeTank
}
