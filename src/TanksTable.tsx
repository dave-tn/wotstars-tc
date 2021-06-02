import { FC, useState } from 'react'

import { GQLTank } from './Components/AddTankComponents/SelectTankList'

import { TankColumn } from './Components/TankColumn'
import { useTankState } from './hooks/useTankState'

import styles from './RowComponents/RowComponentStyles.module.css'


export const TanksTable:FC<{
    showAddTankView: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ showAddTankView }) => {

    const [ fingerprints ] = useTankState()
    const [ firstTank, setFirstTank ] = useState<GQLTank | undefined>()

    return (
        <div style={{ overflow: 'scroll' }}>

            <div
                className={styles.mainGrid}
                style={{
                    // use this to hackily force our column layout for a vertical table type effect
                    // TODO: Ideally we calculate this automatically somehow...
                    gridTemplateRows: `repeat(30, auto)`
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
                        gridColumn: `1/${fingerprints.length + 2}`
                    }}
                >
                    Movement / Mobility
                </div>
                <div className={styles.cell}>Speed [forward/reverse]</div>
                <div className={styles.cell}>Traverse [hull/turret]</div>
                <div className={styles.cell}>Weight</div>
                <div className={styles.cell}>Engine Power / per tonne</div>
                <div className={styles.cell}>Terrain [hard/med/soft]</div>

                <div
                    className={styles.header} 
                    style={{
                        gridRow: '23',
                        gridColumn: `1/${fingerprints.length + 2}`
                    }}
                >
                    Misc / Other
                </div>
                <div className={styles.cell}>Health (hit points)</div>
                <div className={styles.cell}>Camo [still/moving]</div>
                <div className={styles.cell}>View Range</div>

                <div
                    className={styles.header} 
                    style={{
                        gridRow: '27',
                        gridColumn: `1/${fingerprints.length + 2}`
                    }}
                >
                    Top Players
                    <small style={{ fontWeight: 'lighter', fontSize: '.65em', display: 'block' }}>(last 90 days, by WN8; [Battles | <b>WN8</b> | Combined Damage])</small>
                </div>
                <div className={styles.cell}>#1</div>
                <div className={styles.cell}>#2</div>
                <div className={styles.cell}>#3</div>

                { fingerprints.map((fp, index) => <TankColumn fingerprint={fp} key={fp} firstTank={firstTank} setFirstTank={index === 0 ? setFirstTank : undefined} /> )}

                <div className={styles.headerAddTankButton} onClick={() => showAddTankView(true)}>
                    ADD TANK
                </div>

            </div>

        </div>
    )
}
