
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
            const individualFingerprints = tanksString.split(',') as Fingerprint[]
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
        if (currentState) searchParams.set('c', currentState + ',' + fp)
        else searchParams.set('c', fp)
        history.push({
            pathname: history.location.pathname,
            search: '?' + searchParams.toString()
        })
    }
    return addTank
}
