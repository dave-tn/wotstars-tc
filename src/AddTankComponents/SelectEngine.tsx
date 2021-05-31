import { FC, Dispatch } from 'react'
import Select, { components } from 'react-select'

import { toRoman } from './../utils/tankTiers'

import { GQLEngine } from '../AddTankComponents/SelectTankList'
import { TankConfigAction } from './../Components/TankConfigEditor'

const Option:FC = (props: any) => (
    <div>
        <components.Option {...props} >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <span>{ props.data.label }</span>
                <span>
                    { props.data.info.power }hp | Tier: { toRoman(props.data.info.level) }
                </span>
            </div>
        </components.Option>
    </div>
)

export const SelectEngine:FC<{
    engines: GQLEngine[]
    currentEngineIndex: number
    onSelect: Dispatch<TankConfigAction>
 }> = ({
    engines,
    currentEngineIndex,
    onSelect
}) => {

    const options = engines.map(c => ({ value: c.user_string, label: c.user_string, info: { ...c } }))
    const currentlySelected = options.find(c => c.info.index === currentEngineIndex)

    function handleSelection(val: typeof options[number] | null) {
        if (val?.info.index !== undefined) {
            onSelect({
                type: 'SET_ENGINE',
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
            isDisabled={engines.length < 2}
        />
    )

}

