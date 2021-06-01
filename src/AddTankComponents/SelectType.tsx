import { FC } from 'react'
import { VEHICLE_TYPES } from './../utils/tankTypes'

import { useDispatch, useSelector } from 'react-redux'
import { getSelectedType, setSelectedType } from '../reduxSlices/addTankSlice'

import gtagHelper from './../utils/gtagHelper'

import lightTank from './../images/type-light-icon.svg'
import mediumTank from './../images/type-med-icon.svg'
import heavyTank from './../images/type-heavy-icon.svg'
import atSpg from './../images/type-td-icon.svg'
import spg from './../images/type-spg-icon.svg'

import styles from './Selects.module.css'

const typeIconsMap = {
    lightTank: lightTank,
    mediumTank,
    heavyTank,
    'AT-SPG': atSpg,
    SPG: spg
}

export const SelectType:FC = () => {

    const dispatch = useDispatch()
    const selectedType = useSelector(getSelectedType)

    return (
        <div className={styles.tiersWrap}>
            { VEHICLE_TYPES.map(([slug, name]) => {

                let classes = styles.button
                if (selectedType === slug) {
                    classes = `${classes} ${styles.buttonActive}`
                }

                return (
                    <div
                        key={slug}
                        className={classes}
                        onClick={() => {
                            dispatch(setSelectedType(slug))
                            gtagHelper({
                                'event': 'tank_add_view_select_type',
                                'selected_type': slug
                            })
                        }}
                    >
                        <img alt={`${name} filter`} src={typeIconsMap[slug]} />
                    </div>
                )

            } )}

        </div> 
    )

}
