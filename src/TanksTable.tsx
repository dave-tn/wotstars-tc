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
                <div className={styles.cell}>Silver / Base XP</div>
                <div className={styles.cell}>Free XP / Crew XP</div>


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
                <div className={styles.cell}>DPM</div>
                <div className={styles.cell}>Penetration</div>
                <div className={styles.cell}>Damage</div>
                <div className={styles.cell}>Rate of Fire</div>
                <div className={styles.cell}>Reload</div>
                <div className={styles.cell}>Clip</div>
                <div className={styles.cell}>Caliber</div>


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
                <div className={styles.cell}>Aim Time</div>
                <div className={styles.cell}>Dispersion (at 100m)</div>
                <div className={styles.cell}>Elevation / Depression</div>

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
                <div className={styles.cell}>Speed [forward/reverse]</div>
                <div className={styles.cell}>Traverse [hull/turret]</div>
                <div className={styles.cell}>Engine Power / per tonne</div>
                <div className={styles.cell}>Terrain [hard/med/soft]</div>
                <div className={styles.cell}>Camo [still/moving]</div>
                <div className={styles.cell}>View Range</div>


                { fingerprints.map((fp, index) => <TankColumn fingerprint={fp} key={fp} firstTank={firstTank} setFirstTank={index === 0 ? setFirstTank : undefined} /> )}

                <div className={styles.headerAddTankButton} onClick={() => showTankEditor(true)}>
                    ADD TANK
                </div>

            </div>

        </div>
    )
}
