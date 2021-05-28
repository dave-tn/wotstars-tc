import { FC } from 'react'

import { SelectType } from './AddTankComponents/SelectType'
import { SelectTier } from './AddTankComponents/SelectTier'
import { SelectTankList } from './AddTankComponents/SelectTankList'

import styles from './AddTank.module.css'

export const AddTank:FC<{ setShow: React.Dispatch<React.SetStateAction<boolean>> }> = ({
    setShow
}) => {

    return (
        <div className={styles.mainWrap}>
            <div className={styles.closeButton} onClick={() => setShow(false)}>
                X
            </div>
            <h2 className={styles.header}>Select a Tank</h2>
            <p className={styles.subHeader}>& the modules</p>

            <div style={{ margin: '1em' }}>
                <SelectTier />
                <SelectType />
            </div>

            <SelectTankList />

        </div>
    )
}
