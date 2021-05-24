import { FC } from 'react'
import { toRoman, KNOWN_TIERS } from './../utils/tankTiers'

import { useDispatch, useSelector } from 'react-redux'
import { AddTankOptionsState } from './../reduxStore'

import styles from './Selects.module.css'


export const SelectTier:FC = () => {

    const dispatch = useDispatch()
    const selectedTier = useSelector((state: AddTankOptionsState) => state.selectedTier)
    
    const tiers = KNOWN_TIERS

    return (
        <div style={{ display: 'flex' }}>
            { tiers.map(t => {

                let classes = styles.button
                if (selectedTier === t) {
                    classes = `${classes} ${styles.buttonDisabled}`
                }

                return (
                    <div key={t} className={classes} onClick={() => dispatch({
                        type: 'SELECT_TIER',
                        payload: t
                    })}>
                        { toRoman(t) }
                    </div>
                )
            })}
        </div>
    )

}
