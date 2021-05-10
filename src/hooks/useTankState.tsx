
import { useState, useEffect, useContext } from 'react'

import { Tank } from './../typesStuff/Tank'
import { Fingerprint, TankConfig, getTankConfigs } from './../utils/comparisonConfigUtils/getTankConfig'

import { HistoryContext, useHistory } from './../HistoryProvider'


export function useTankState(tanks: Tank[]): [ TankConfig[] ] {

    const history = useContext(HistoryContext)
    const [ tankCompData, setTankCompData ] = useState<TankConfig[]>([])

    /**
     * Keep our state in sync with any search params
     */
    useEffect(() => {
        function handleHistoryChange() {
            const searchParams = new URLSearchParams(history.location.search)
            const tanksString = searchParams.get('c')
            if (!tanksString) return setTankCompData([])
            const individualFingerprints = tanksString.split('~') as Fingerprint[]
            setTankCompData(
                getTankConfigs(individualFingerprints, tanks)
            )
        }
        // Call here so we trigger on first load
        handleHistoryChange()
        // Set listener so we trigger on any changes to the query params
        const unlisten = history.listen(handleHistoryChange)
        return () => unlisten()
    }, [ history, tanks ])

    return [ tankCompData ]
}


export function useAddTank() {
    const history = useHistory()

    function addTank(fp: Fingerprint) {
        const searchParams = new URLSearchParams(history.location.search)
        const currentState = searchParams.get('c')
        if (currentState) searchParams.set('c', currentState + '~' + fp)
        else searchParams.set('c', fp)
        history.push({
            pathname: history.location.pathname,
            search: '?' + searchParams.toString()
        })
    }
    return addTank
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

        const tankFingerprints = tanksString.split('~') as Fingerprint[]
        const tankUids = tankFingerprints.map(fp => {
            // FIXME: TODO: This code shouldn't need to know about how the fingerprints work...
            const parts = fp.split('.').map(p => parseInt(p))
            return parts[parts.length - 1]
        })
        const matchingFingerprintIndex = tankUids.findIndex(f => f === uid)
        if (matchingFingerprintIndex < 0) {
            console.warn(`useRemoveTank: Call to remove a tank that doesn't seem to exists... ${uid}`)
            return
        }
        tankFingerprints.splice(matchingFingerprintIndex, 1)
        searchParams.set('c', tankFingerprints.join('~'))
        history.push({
            pathname: history.location.pathname,
            search: '?' + searchParams.toString()
        })

    }

    return removeTank
}
