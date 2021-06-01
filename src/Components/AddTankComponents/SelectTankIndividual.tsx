import { FC } from 'react'

import { GQLTank } from './SelectTankList'
import { TankIntro } from '../TankIntro'

import { useAddTank } from '../../hooks/useTankState'
import { generateTankFingerprint } from '../../utils/comparisonConfigUtils/generateTankFingerprint'

import styles from './Selects.module.css'
import tankColumnStyles from '../../Components/TankColumn.module.css'


const highestIndexFinder = (best: number, mod: { index: number }) => best > mod.index ? best : mod.index

export const SelectTankIndividual: FC<{
    tank: GQLTank
    count: number
}> = ({
    tank, count
}) => {
    const addTank = useAddTank()

    function configToFingerprint() {
        const tankId = tank.id
        // The 'final' modules - the last to unlock - are assumed to be the best, and seem to be ordered by index value by WG; so...
        const chassisIndex = tank.chassis.reduce(highestIndexFinder, 0)
        const engineIndex = tank.engines.reduce(highestIndexFinder, 0)
        const turretIndex = tank.turrets.reduce(highestIndexFinder, 0)
        const gunIndex = tank.turrets.find(t => t.index === turretIndex)!.guns.reduce(highestIndexFinder, 0)
        const shotIndex = 0 // The 'standard' ammo shot is always index 0 it seems

        const fp = generateTankFingerprint(
            tankId,
            chassisIndex,
            engineIndex,
            turretIndex,
            gunIndex,
            shotIndex)
        addTank(fp)
    }

    return (
        <div className={styles.tankSelectionItemWrap} style={{ borderStyle: count > 0 ? 'dashed' : 'solid', opacity: count > 0 ? 0.55 : 1  }}>

            <div className={styles.tankSelectionInnerWrap}>
                <div className={styles.tankSelectionCount}>{ count }</div>
                <div className={tankColumnStyles.headerButtonsWrap}>
                    <div className={tankColumnStyles.headerAddTankButton} onClick={configToFingerprint}>+</div>
                </div>
                <TankIntro tank={tank} />
            </div>

        </div>
    )

}
