import { FC, useEffect } from 'react'

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

    useEffect(() => {
        const closeFn = (e: KeyboardEvent) => (e.key === 'Escape' && setShow(false))
        window.addEventListener('keyup', closeFn)
        return () => window.removeEventListener('keyup', closeFn)
    })

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
