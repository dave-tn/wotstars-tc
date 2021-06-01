import { FC, Dispatch } from 'react'
import Select, { components } from 'react-select'

import { toRoman } from '../../utils/tankTiers'

import { GQLTurret } from './SelectTankList'
import { TankConfigAction } from '../TankConfigEditor'


const Option:FC = (props: any) => (
    <div>
        <components.Option {...props} >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <span>{ props.data.label }</span>
                <span>
                    { props.data.info.vision_radius }👁 { props.data.info.rotation_speed }° | Tier: { toRoman(props.data.info.level) }
                </span>
            </div>
        </components.Option>
    </div>
)

export const SelectTurret:FC<{
    turrets: GQLTurret[]
    currentTurretIndex: number
    onSelect: Dispatch<TankConfigAction>
 }> = ({
    turrets,
    currentTurretIndex,
    onSelect
}) => {

    const options = turrets.map(c => ({ value: c.user_string, label: c.user_string, info: { ...c } }))
    const currentlySelected = options.find(c => c.info.index === currentTurretIndex)

    function handleSelection(val: typeof options[number] | null) {
        if (val?.info.index !== undefined) {
            onSelect({
                type: 'SET_TURRET',
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
            isDisabled={turrets.length < 2}
        />
    )

}

