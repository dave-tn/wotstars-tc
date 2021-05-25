import { FC } from 'react'
import { VEHICLE_TYPES } from './../utils/tankTypes'

import { useDispatch, useSelector } from 'react-redux'
import { getSelectedType, setSelectedType } from '../reduxSlices/addTankSlice'

import styles from './Selects.module.css'

export const SelectType:FC = () => {

    const dispatch = useDispatch()
    const selectedType = useSelector(getSelectedType)

    return (
        <div style={{ display: 'flex' }}>
            { VEHICLE_TYPES.map(([slug, name]) => {

                let classes = styles.button
                if (selectedType === slug) {
                    classes = `${classes} ${styles.buttonDisabled}`
                }

                return (
                    <div
                        key={slug}
                        className={classes}
                        onClick={() => dispatch(setSelectedType(slug))}
                    >
                        { name }
                    </div>
                )

            } )}

        </div> 
    )

}
