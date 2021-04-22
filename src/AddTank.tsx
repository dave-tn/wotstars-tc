import { FC, useState } from 'react'
import { AddTankEditor } from './AddTankEditor'
import { Tank } from './typesStuff/Tank'

import { ROMAN_LEGEND, toRoman } from './utils/romans'

export const AddTank:FC<{ tanks: Tank[] }> = ({ tanks }) => {

    const listOfNations = tanks.reduce<string[]>((list, tank) => {
        if (list.indexOf(tank.info.nation) === -1) list.push(tank.info.nation)
        return list
    }, []).sort()

    const listOfTypes = tanks.reduce<string[]>((list, tank) => {
        if (list.indexOf(tank.info.type_slug) === -1) list.push(tank.info.type_slug)
        return list
    }, []).sort()

    const [ selectedNation, setSelectedNation ] = useState(listOfNations[0])
    const [ selectedType, setSelectedType ] = useState(listOfTypes[0])
    const [ selectedTier, setSelectedTier ] = useState<number|undefined>()

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
                    <option key={nationKey} value={nationKey}>{ nationKey }</option>
                ))}
            </select>
            <select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                { listOfTypes.map(typeSlug => (
                    <option key={typeSlug} value={typeSlug}>{ typeSlug }</option>
                ))}
            </select>
            <select value={selectedTier} onChange={e => setSelectedTier(parseInt(e.target.value))}>
                <option value="0">tier (optional)</option>
                { ROMAN_LEGEND.map(([ara, rom]) => (
                    <option key={rom} value={ara}>{ rom }</option>
                ))}
            </select>

            <select value={selectedTank} onChange={e => setSelectedTank(e.target.value)}>
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
