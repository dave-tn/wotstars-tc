import { FC, useState } from 'react'

import { TankTypeSlug } from './typesStuff/Tank'

import { SelectNation } from './AddTankComponents/SelectNation'
import { SelectType } from './AddTankComponents/SelectType'
import { SelectTier } from './AddTankComponents/SelectTier'
import { SelectTankList } from './AddTankComponents/SelectTankList'

import styles from './AddTank.module.css'


export const AddTank:FC<{ setShow: React.Dispatch<React.SetStateAction<boolean>> }> = ({
    setShow
}) => {

    // Holds the nation slug for the tanks we want to see
    const [ nation, setNation ] = useState('')
    // Filters
    const [ disabledTypes, setDisabledTypes ] = useState<TankTypeSlug[]>([])
    const [ disabledTiers, setDisabledTiers ] = useState<number[]>([])

    return (
        <div className={styles.mainWrap}>
            <div className={styles.closeButton} onClick={() => setShow(false)}>
                X
            </div>
            <h2 className={styles.header}>Select a Tank</h2>
            <p className={styles.subHeader}>& the modules</p>

            <SelectNation setSelectedNation={setNation} />
            <SelectType nation={nation} disabledTypes={disabledTypes} setDisabledTypes={setDisabledTypes} />
            <SelectTier nation={nation} disabledTypes={disabledTypes} disabledTiers={disabledTiers} setDisabledTiers={setDisabledTiers} />


            <SelectTankList nation={nation} disabledTypes={disabledTypes} disabledTiers={disabledTiers} />

            { /*
            { tank &&
            <AddTankEditor tank={tank} setShow={setShow} />
            } */}

        </div>
    )
}
