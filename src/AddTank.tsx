import { FC, useEffect } from 'react'

import { SelectType } from './AddTankComponents/SelectType'
import { SelectTier } from './AddTankComponents/SelectTier'
import { SelectTankList } from './AddTankComponents/SelectTankList'

import gtagHelper from './utils/gtagHelper'

import styles from './AddTank.module.css'

const CloseButton:FC<{
    close: () => void
}> = ({close}) => <div className={styles.closeButton} onClick={close}>X</div>


export const AddTank:FC<{ setShow: React.Dispatch<React.SetStateAction<boolean>> }> = ({
    setShow
}) => {

    function close() {
        setShow(false)
        gtagHelper({ 'event': 'tank_add_view_closed' })
    }

    useEffect(() => {
        const closeFn = (e: KeyboardEvent) => (e.key === 'Escape' && setShow(false) && gtagHelper({ 'event': 'tank_add_view_closed' }))
        window.addEventListener('keyup', closeFn)
        return () => window.removeEventListener('keyup', closeFn)
    }, [ setShow ])
    useEffect(() => {
        gtagHelper({ 'event': 'tank_add_view_opened' })
    }, [])

    return (
        <div className={styles.mainWrap}>
            <CloseButton close={close} />
            <h1 className={styles.header}>Select a Tank</h1>

            <div style={{ margin: '1em' }}>
                <SelectTier />
                <SelectType />
            </div>

            <SelectTankList />

        </div>
    )
}
