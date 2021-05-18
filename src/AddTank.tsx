import { FC, useState } from 'react'

// import { AddTankEditor } from './AddTankEditor'
import { Tank, TankTypeSlug } from './typesStuff/Tank'

import { ROMAN_LEGEND, toRoman } from './utils/tankTiers'
import { toType, VEHICLE_TYPES } from './utils/tankTypes'

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
    // Holds disabled types
    const [ disabledTypes, setDisabledTypes ] = useState<TankTypeSlug[]>([])

    const [ disabledTiers, setDisabledTiers ] = useState<number[]>([])

    // const listOfNations = Object.keys(NATIONS)
    //     .sort()
    // const [ selectedNation, setSelectedNation ] = useState(listOfNations[0])

    // Available vehicle types for the selected nation
    // const listOfTypes = VEHICLE_TYPES
    //     .map(tt => tt[0])
    //     .filter(typeSlug => !!tanks.find(t => t.info.nation === selectedNation && t.info.type_slug === typeSlug))
    // const [ selectedType, setSelectedType ] = useState(listOfTypes[0])

    // // Available tiers for the selected nation & selected vehicle type
    // const listOfTiers = ROMAN_LEGEND
    //     .map(tup => tup[0])
    //     .filter(num => !!tanks.find(t => t.info.nation === selectedNation && t.info.type_slug === selectedType && t.info.level === num))
    // const [ selectedTier, setSelectedTier ] = useState(0)


    // const filteredTanks = tanks
    //     .filter(t => t.info.nation === selectedNation)
    //     .filter(t => t.info.type_slug === selectedType)
    //     .filter(t => selectedTier !== undefined && selectedTier !== 0 ? t.info.level === selectedTier : true)
    //     .sort((a, b) => {
    //         return a.info.level > b.info.level ? -1 // default sort by tier
    //         : b.info.level > a.info.level ? 1
    //         : a.info.user_string > b.info.user_string ? 1 : -1 // same tier so sort alphabetically
    //     })

    // const [ selectedTank, setSelectedTank ] = useState<string>()
    // const tank: Tank | undefined = filteredTanks.find(t => t.info.name === selectedTank)

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
