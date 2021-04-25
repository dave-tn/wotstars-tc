import { FC, useState } from 'react'
import { AddTankEditor } from './AddTankEditor'
import { Tank, TankTypeSlug } from './typesStuff/Tank'

import { ROMAN_LEGEND, toRoman } from './utils/tankTiers'
import { toType, VEHICLE_TYPES } from './utils/tankTypes'
import { toNation, NATIONS } from './utils/tankNations'

export const AddTank:FC<{ tanks: Tank[] }> = ({ tanks }) => {

    const listOfNations = Object.keys(NATIONS)
        .sort()
    const [ selectedNation, setSelectedNation ] = useState(listOfNations[0])

    // Available vehicle types for the selected nation
    const listOfTypes = VEHICLE_TYPES
        .map(tt => tt[0])
        .filter(typeSlug => !!tanks.find(t => t.info.nation === selectedNation && t.info.type_slug === typeSlug))
    const [ selectedType, setSelectedType ] = useState(listOfTypes[0])

    // Available tiers for the selected nation & selected vehicle type
    const listOfTiers = ROMAN_LEGEND
        .map(tup => tup[0])
        .filter(num => !!tanks.find(t => t.info.nation === selectedNation && t.info.type_slug === selectedType && t.info.level === num))
    const [ selectedTier, setSelectedTier ] = useState(0)


    const filteredTanks = tanks
        .filter(t => t.info.nation === selectedNation)
        .filter(t => t.info.type_slug === selectedType)
        .filter(t => selectedTier !== undefined && selectedTier !== 0 ? t.info.level === selectedTier : true)
        .sort((a, b) => {
            return a.info.level > b.info.level ? -1 // default sort by tier
            : b.info.level > a.info.level ? 1
            : a.info.user_string > b.info.user_string ? 1 : -1 // same tier so sort alphabetically
        })

    const [ selectedTank, setSelectedTank ] = useState<string>()
    const tank: Tank | undefined = filteredTanks.find(t => t.info.name === selectedTank)

    return (
        <div>
            <h2>Select a tank</h2>
            <select value={selectedNation} onChange={e => setSelectedNation(e.target.value)}>
                { listOfNations.map(nationKey => (
                    <option key={nationKey} value={nationKey}>{ toNation(nationKey) }</option>
                ))}
            </select>
            <select value={selectedType} onChange={e => setSelectedType(e.target.value as TankTypeSlug)}>
                { listOfTypes.map(typeSlug => (
                    <option key={typeSlug} value={typeSlug}>{ toType(typeSlug) }</option>
                ))}
            </select>
            <select value={selectedTier} onChange={e => setSelectedTier(parseInt(e.target.value))}>
                <option value="0">tier (optional)</option>
                { listOfTiers.map(num => (
                    <option key={toRoman(num)} value={num}>{ toRoman(num) }</option>
                ))}
            </select>

            <select value={selectedTank} onChange={e => setSelectedTank(e.target.value)} disabled={filteredTanks.length === 0}>
                <option value="0">-- select tank --</option>
                { filteredTanks.map(tank => {
                    return (
                        <option key={tank.info.name} value={tank.info.name}>
                            { tank.info.user_string }
                            [{ toRoman(tank.info.level) }]
                        </option>
                    )
                })}

            </select>

            { tank &&
            <AddTankEditor tank={tank} />
            }

        </div>
    )
}
