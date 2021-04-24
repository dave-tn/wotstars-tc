import { FC, useState, useEffect } from 'react'

import { useHistory } from './HistoryProvider'
import { Tank } from './typesStuff/Tank'

import { HeaderRow } from './RowComponents/HeaderRow'

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

function createTankComparisonDataFromFingerprints(fingerprints: string[], allTanks: Tank[]): TankConfig[] {
    const tankComparisonData: TankConfig[] = []
    for (const fp of fingerprints) {
        const splitTfp = fp.split(':').map(s => parseInt(s))
        const tankCompData: TankConfig = {
            rawData: allTanks.find(t => t.info.id === splitTfp[0]),
            chassisIndex: splitTfp[1],
            engineIndex: splitTfp[2],
            turretIndex: splitTfp[3],
            gunIndex: splitTfp[4],
            ammoIndex: splitTfp[5],
            uid: splitTfp[6]
        }
        tankComparisonData.push(tankCompData)
    }
    return tankComparisonData
}

export const TanksTable:FC<{ tanks: Tank[] }> = ({ tanks }) => {

    const history = useHistory()
    const [ tankCompData, setTankCompData ] = useState<TankConfig[]>([])

    useEffect(() => {
        function handleHistoryChange() {
            /**
             * TODO?: Could create a hook to map a particular query param to
             * a specific state. That would tidy things up.
             */
            const searchParams = new URLSearchParams(history.location.search)
            const tanksString = searchParams.get('c')
            if (tanksString) {
                const individualFingerprints = tanksString.split(',')
                setTankCompData(
                    createTankComparisonDataFromFingerprints(individualFingerprints, tanks)
                )
            }
        }

        // Run this (effectively) on 'componentDidMount' initially, so we can catch any query params / state
        // that was already set when the user landed
        handleHistoryChange()

        const unlisten = history.listen(handleHistoryChange)
        return () => unlisten()
    }, [ history, tanks ])

    return (
        <div className="Main-grid">

            <table>
                <tbody>
                    <HeaderRow data={tankCompData} />
                </tbody>
            </table>

        </div>
    )
}



