import { FC, Dispatch } from 'react'
import Select, { components } from 'react-select'

import { GQLShot } from './SelectTankList'
import { TankConfigAction } from '../TankConfigEditor'


const Option:FC = (props: any) => (
    <div>
        <components.Option {...props} >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <span style={{ color: props.data.info.is_premium ? 'gold' : 'inherit' }}>{ props.data.label }</span>
                <span>
                    Dmg: { props.data.info.damage } Pen: { props.data.info.piercing_power }mm
                </span>
            </div>
        </components.Option>
    </div>
)

// const ValueContainer:FC = (props: any) => {
    
//     console.log(props)
//     return (
//         <components.ValueContainer { ...props }>
//             {/* { props.children} */}
//             {/* <span>{ props.selectProps.value.label }</span> */}
//             <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', color: '#c3c3c3' }}>
//                 <span style={{ color: props.selectProps.value.info.is_premium ? 'gold' : 'inherit' }}>{ props.selectProps.value.label }</span>
//                 <span>
//                     Dmg: { props.selectProps.value.info.damage } Pen: { props.selectProps.value.info.piercing_power }mm
//                 </span>
//             </div>
//         </components.ValueContainer>
//     )
// }

export const SelectShot:FC<{
    shots: GQLShot[]
    currentShotIndex: number
    onSelect: Dispatch<TankConfigAction>
 }> = ({
    shots,
    currentShotIndex,
    onSelect
}) => {

    const options = shots.map(c => ({ value: c.user_string, label: c.user_string, info: { ...c } }))
    const currentlySelected = options.find(c => c.info.index === currentShotIndex)

    function handleSelection(val: typeof options[number] | null) {
        if (val?.info.index !== undefined) {
            onSelect({
                type: 'SET_SHOT',
                payload: val.info.index
            })
        }
    }

    return (
        <Select
            value={currentlySelected}
            options={options}
            components={{
                Option,
                // ValueContainer
            }}
            isClearable={false}
            isSearchable={false}
            onChange={handleSelection}
            isDisabled={shots.length < 2}
        />
    )

}
