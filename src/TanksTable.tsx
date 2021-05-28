import { FC, useState } from 'react'

import { Tank } from './typesStuff/Tank'
import { GQLTank } from './AddTankComponents/SelectTankList'

import { TankColumn } from './Components/TankColumn'
import { useTankState } from './hooks/useTankState'

import styles from './RowComponents/RowComponentStyles.module.css'


export const TanksTable:FC<{
    tanks: Tank[]
    showTankEditor: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ tanks, showTankEditor }) => {

    const [ fingerprints ] = useTankState(tanks)
    const [ firstTank, setFirstTank ] = useState<GQLTank | undefined>()

    return (
        <div>

            <div
                className={styles.mainGrid}
                style={{
                    // use this to hackily force our column layout for a vertical table type effect
                    // TODO: Ideally we calculate this automatically somehow...
                    gridTemplateRows: 'auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto'
            }}>
                <div></div>{/* Empty top left grid item */}
                <div
                    className={styles.header} 
                    style={{
                        gridRow: '2',
                        // To stretch all the way horixontally we have to set this to compute based on the number of items...
                        gridColumn: `1/${fingerprints.length + 2}`,
                    }}
                >
                    Bonuses
                </div>
                <div>Silver / Base XP</div>
                <div>Free XP / Crew XP</div>


                <div
                    className={styles.header} 
                    style={{
                        gridRow: '5',
                        // To stretch all the way horixontally we have to set this to compute based on the number of items...
                        gridColumn: `1/${fingerprints.length + 2}`
                    }}
                >
                    Firepower
                </div>
                <div>DPM</div>
                <div>Penetration</div>
                <div>Damage</div>
                <div>Rate of Fire</div>
                <div>Reload</div>
                <div>Clip</div>
                <div>Caliber</div>


                <div
                    className={styles.header} 
                    style={{
                        gridRow: '13',
                        // To stretch all the way horixontally we have to set this to compute based on the number of items...
                        gridColumn: `1/${fingerprints.length + 2}`
                    }}
                >
                    Weapon Handling
                </div>
                <div>Aim Time</div>
                <div>Dispersion (at 100m)</div>
                <div>Elevation / Depression</div>

                <div
                    className={styles.header} 
                    style={{
                        gridRow: '17',
                        // To stretch all the way horixontally we have to set this to compute based on the number of items...
                        gridColumn: `1/${fingerprints.length + 2}`
                    }}
                >
                    Movement / Mobility
                </div>
                <div>Speed [forward/reverse]</div>
                <div>Traverse [hull/turret]</div>
                <div>Engine Power / per tonne</div>
                <div>Terrain [hard/med/soft]</div>
                <div>Camo [still/moving]</div>
                <div>View Range</div>


                { fingerprints.map((fp, index) => <TankColumn fingerprint={fp} key={fp} firstTank={firstTank} setFirstTank={index === 0 ? setFirstTank : undefined} /> )}

                <div className={styles.headerAddTankButton} onClick={() => showTankEditor(true)}>
                    ADD TANK
                </div>

            </div>

        </div>
    )
}
