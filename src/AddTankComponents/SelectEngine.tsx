import { FC } from 'react'
import Select, { ActionMeta, components } from 'react-select'

import { toRoman } from './../utils/tankTiers'

import { GQLEngine } from '../AddTankComponents/SelectTankList'


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
 }> = ({
    engines
}) => {

    const options = engines.map(c => ({ value: c.user_string, label: c.user_string, info: { ...c } }))

    function handleSelection(val: typeof options[number] | null, action: ActionMeta<typeof options[number]>) {
        console.log('Engine selection:')
        console.log(val, action)
    }

    return (
        <Select
            options={options}
            components={{ Option }}
            defaultValue={options[0]}
            isClearable={false}
            isSearchable={false}
            onChange={handleSelection}
        />
    )

}

