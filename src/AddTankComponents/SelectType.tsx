import { FC } from 'react'
import { VEHICLE_TYPES } from './../utils/tankTypes'

import { useDispatch, useSelector } from 'react-redux'
import { AddTankOptionsState } from './../reduxStore'

import styles from './Selects.module.css'

export const SelectType:FC = () => {

    const dispatch = useDispatch()
    const selectedType = useSelector((state: AddTankOptionsState) => state.selectedType)

    return (
        <div style={{ display: 'flex' }}>
            { VEHICLE_TYPES.map(([slug, name]) => {

                let classes = styles.button
                if (selectedType === slug) {
                    classes = `${classes} ${styles.buttonDisabled}`
                }

                return <div className={classes} key={slug} onClick={() => {
                    dispatch({
                        type: 'SELECT_TYPE',
                        payload: slug
                    })
                }}>{ name }</div>

            } )}

        </div> 
    )

}
