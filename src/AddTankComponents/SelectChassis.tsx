import { FC, Dispatch } from 'react'
import Select, { components } from 'react-select'

import { toRoman } from './../utils/tankTiers'

import { GQLChassis } from '../AddTankComponents/SelectTankList'

import { TankConfigAction } from './../Components/TankConfigEditor'


const Option = (props: any) => (
    <div>
        <components.Option {...props} >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <span>{ props.data.label }</span>
                <span>
                    { props.data.info.rotation_speed }° | Tier: { toRoman(props.data.info.level) }
                </span>
            </div>
        </components.Option>
    </div>
)

export const SelectChassis:FC<{
    chassis: GQLChassis[]
    currentChassisIndex: number
    onSelect: Dispatch<TankConfigAction>
 }> = ({
    chassis,
    currentChassisIndex,
    onSelect
}) => {

    const options = chassis.map(c => ({ value: c.user_string, label: c.user_string, info: { ...c } }))
    const currentlySelected = options.find(c => c.info.index === currentChassisIndex)

    function handleSelection(val: typeof options[number] | null) {
        if (val?.info.index !== undefined) {
            onSelect({
                type: 'SET_CHASSIS',
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
        />
    )

}

