
import { useState, useEffect, useContext } from 'react'

import { Tank } from './../typesStuff/Tank'
import { Fingerprint, TankConfig, getTankConfigs } from './../utils/comparisonConfigUtils/getTankConfig'

import { HistoryContext, useHistory } from './../HistoryProvider'


export function useTankState(tanks: Tank[]): [ TankConfig[], (fp: Fingerprint) => void] {

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

    function addTankFromFingerprint(fingerprint: Fingerprint) {
        const curSearch = history.location.search ? history.location.search + ',' : '?c='
        const newSearch = curSearch + fingerprint
        history.push({
            pathname: history.location.pathname,
            search: newSearch
        })
    }

    return [ tankCompData, addTankFromFingerprint ]
}


export function useAddTank() {
    const history = useHistory()
    function addTank(fp: Fingerprint) {
        const curSearch = history.location.search ? history.location.search + ',' : '?c='
        const newSearch = curSearch + fp
        history.push({
            pathname: history.location.pathname,
            search: newSearch
        })
    }
    return addTank
}
