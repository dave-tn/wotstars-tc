import { FC } from 'react'

import { SelectType } from './AddTankComponents/SelectType'
import { SelectTier } from './AddTankComponents/SelectTier'
import { SelectTankList } from './AddTankComponents/SelectTankList'

import styles from './AddTank.module.css'

const CloseButton:FC<{
    toggle: React.Dispatch<React.SetStateAction<boolean>>
}> = ({toggle}) => <div className={styles.closeButton} onClick={() => toggle(false)}>X</div>


export const AddTank:FC<{ setShow: React.Dispatch<React.SetStateAction<boolean>> }> = ({
    setShow
}) => {

    return (
        <div className={styles.mainWrap}>
            <CloseButton toggle={setShow} />
            <h1 className={styles.header}>Select a Tank</h1>

            <div style={{ margin: '1em' }}>
                <SelectTier />
                <SelectType />
            </div>

            <SelectTankList />

        </div>
    )
}
