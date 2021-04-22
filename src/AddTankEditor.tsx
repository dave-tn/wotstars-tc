import { FC, useState, useMemo } from 'react'
// import TanksList from './TanksList'

import { Tank, TankModule, Chassis, Engine, Turret, Gun } from './typesStuff/Tank'
import { toRoman } from './utils/romans'
import { fromTypeSlug } from './utils/tankTypes'

interface ModulesList {
    engines: Engine[]
    chassis: Chassis[]
    turrets: Turret[]
    guns: Gun[]
}

export const AddTankEditor:FC<{ tank: Tank }> = ({ tank }) => {

    const modulesList: ModulesList = useMemo(() => {
        /** Module indexes seem to be based on when a module is unlocked; so as defaults we want the 'best' module first in the lists */
        const sortByIndex = (modA: TankModule, modB: TankModule) => modA.index > modB.index ? -1 : 1

        const sortedTurrets = Object.values(tank.data.turrets).sort(sortByIndex)

        const m: ModulesList = {
            engines: Object.values(tank.data.engines).sort(sortByIndex),
            chassis: Object.values(tank.data.chassis).sort(sortByIndex),
            turrets: sortedTurrets,
            guns: Object.values(sortedTurrets[0].guns).sort(sortByIndex)
        }
        return m
    }, [tank])

    /**
     * We use the module indexes here so we can potentially reference them when creating a URL for sharing with
     * a particular set of tanks (& their modules) to compare
     */
    const [ selectedEngine, setSelectedEngine ] = useState(modulesList.engines[0].index)
    const [ selectedChassis, setSelectedChassis ] = useState(modulesList.chassis[0].index)
    const [ selectedTurret, setSelectedTurret ] = useState(modulesList.turrets[0].index)
    const [ selectedGun, setSelectedGun ] = useState(modulesList.guns[0].index)


    /**
     * The modules themselves, so we can output module details in the UI
     */
    const theChassis = modulesList.chassis.find(m => m.index === selectedChassis) ?? modulesList.chassis[0]
    const theEngine = modulesList.engines.find(e => e.index === selectedEngine) ?? modulesList.engines[0]
    const theTurret = modulesList.turrets.find(m => m.index === selectedTurret) ?? modulesList.turrets[0]
    const theGun = modulesList.guns.find(m => m.index === selectedGun) ?? modulesList.guns[0]

    /**
     * We want to add this tank to the list of tanks to be compared
     */
    const addTank = () => {
        console.log('The data for the tank to be viewed could be seen as:')
        console.log(`Tank ID: ${tank.info.id}, chassis: ${selectedChassis}, engine: ${selectedEngine}, turret: ${selectedTurret}, gun: ${selectedGun}`)
        console.log(`${tank.info.id}:${selectedChassis}:${selectedEngine}:${selectedTurret}:${selectedGun}`)
    }

    return (
        <div style={{ border: '1px solid grey', borderRadius: '5px', padding: '1em' }}>
            <p>{ tank.info.user_string }</p>
            <p>{ fromTypeSlug(tank.info.type_slug) } { toRoman(tank.info.level) } { tank.info.nation }</p>
            <img src={tank.info.image_preview_url} alt={`the ${tank.info.user_string}`}/>
            { tank.info.is_premium &&
                <p>Premium Tank</p>
            }

            <button onClick={addTank}>Add tank</button>

            <div>
                <ModuleSelector value={selectedChassis} modules={modulesList.chassis} setter={setSelectedChassis} />
                <p>Chassis: { theChassis &&
                    <span>{ theChassis.user_string } Rotation speed: { theChassis.rotation_speed} Terrain resistance [hard/medium/soft]: { theChassis.terrain_resistance.toString() }</span>
                }</p>
                <ModuleSelector value={selectedEngine} modules={modulesList.engines} setter={setSelectedEngine} />
                <p>Engine: { theEngine &&
                    <span>{ theEngine.user_string } HP: { theEngine.power } Fire chance: { theEngine.fire_chance }</span>
                }</p>
                <ModuleSelector value={selectedTurret} modules={modulesList.turrets} setter={setSelectedTurret} />
                <p>Turret: { theTurret &&
                    <span>Turret: { theTurret.user_string } View range: { theTurret.vision_radius } Rotation speed: { theTurret.rotation_speed }</span>
                }</p>
                <ModuleSelector value={selectedGun} modules={modulesList.guns} setter={setSelectedGun} />
                <p>Gun: { theGun &&
                    <span>Reload: { theGun.reload_time } Aim: { theGun.aiming_time } Dispersion: { theGun.shot_dispersion_radius } Ele/Dep: { theGun.elevation }/{ theGun.depression }</span>
                }</p>
                {/* Do we care enough about Radios to even mention them?... */}
            </div>
        
        </div>
    )
}


interface ModuleSelectorProps {
    /** Array of the tank modules to offer in the selection */
    modules: TankModule[]
    /** The module index value */
    value: number
    /** The change handler */
    setter: (tankModule: number) => void
}

const ModuleSelector:FC<ModuleSelectorProps> = ({ value, modules, setter }) => {
    const valueAsString = value.toString()
    return (
        <div>
            <select value={valueAsString} onChange={e => setter?.(parseInt(e.target.value))}>
            { modules
                .map(module => (
                    <option key={module.index} value={module.index}>
                        { module.user_string } idx:{ module.index } tier:{ module.level }
                    </option>
                ))
            }
            </select>
        </div>
    )

}
