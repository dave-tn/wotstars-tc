import { FC } from 'react'
import { toRoman, KNOWN_TIERS } from './../utils/tankTiers'

import { useDispatch, useSelector } from 'react-redux'
import { getSelectedTier, setSelectedTier } from '../reduxSlices/addTankSlice'

import styles from './Selects.module.css'


export const SelectTier:FC = () => {

    const dispatch = useDispatch()
    const selectedTier = useSelector(getSelectedTier)

    return (
        <div style={{ display: 'flex' }}>
            { KNOWN_TIERS.map(t => {

                let classes = styles.button
                if (selectedTier === t) {
                    classes = `${classes} ${styles.buttonActive}`
                }

                return (
                    <div key={t} className={classes} onClick={() => dispatch(setSelectedTier(t))}>
                        { toRoman(t) }
                    </div>
                )
            })}
        </div>
    )

}
