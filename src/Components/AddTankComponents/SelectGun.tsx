import { FC, Dispatch } from 'react'
import Select, { components } from 'react-select'

import { toRoman } from '../../utils/tankTiers'
import { rounder } from './../../utils/rounder'

import { GQLGun } from './SelectTankList'
import { TankConfigAction } from '../TankConfigEditor'


const Option:FC = (props: any) => (
    <div>
        <components.Option {...props} >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <span>{ props.data.label }</span>
                <span>
                    Reload: { rounder((60 / props.data.info.reload_time), 2) }s Aim: { props.data.info.aiming_time }s 	&#9678;{ props.data.info.shot_dispersion_radius }m
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
            value={currentlySelected}
            options={options}
            components={{ Option }}
            isClearable={false}
            isSearchable={false}
            onChange={handleSelection}
            isDisabled={guns.length < 2}
        />
    )

}

