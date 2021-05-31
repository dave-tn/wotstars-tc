import { FC, Dispatch } from 'react'
import Select, { components } from 'react-select'

import { toRoman } from './../utils/tankTiers'

import { GQLGun } from '../AddTankComponents/SelectTankList'
import { TankConfigAction } from './../Components/TankConfigEditor'


const Option:FC = (props: any) => (
    <div>
        <components.Option {...props} >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <span>{ props.data.label }</span>
                <span>
                    Reload: { props.data.info.reload_time }s Aim: { props.data.info.aiming_time }s 	&#9678;{ props.data.info.shot_dispersion_radius }m | Tier: { toRoman(props.data.info.level) }
                </span>
            </div>
        </components.Option>
    </div>
)

export const SelectGun:FC<{
    guns: GQLGun[]
    currentGunIndex: number
    onSelect: Dispatch<TankConfigAction>
 }> = ({
    guns,
    currentGunIndex,
    onSelect
}) => {

    const options = guns.map(c => ({ value: c.user_string, label: c.user_string, info: { ...c } }))
    const currentlySelected = options.find(c => c.info.index === currentGunIndex)

    function handleSelection(val: typeof options[number] | null) {
        if (val?.info.index !== undefined) {
            onSelect({
                type: 'SET_GUN',
                payload: val.info.index
            })
        }
    }

    return (
        <Select
            options={options}
            components={{ Option }}
            defaultValue={currentlySelected}
            isClearable={false}
            isSearchable={false}
            onChange={handleSelection}
            isDisabled={guns.length < 2}
        />
    )

}

