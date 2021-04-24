import { FC } from 'react'

import styles from './HeaderRow.module.css'

import { TankConfig } from './../utils/comparisonConfigUtils/getTankConfig'
import { toRoman } from '../utils/tankTiers'
import { toNation } from './../utils/tankNations'
import { toType } from './../utils/tankTypes'

const HeaderRow:FC<{ data: TankConfig[] }> = ({ data }) => {

    return (
        <tr>
            <td></td> { /* No title/header for the row */ }
            { data.map(td => {
                if (!td.rawData) return <td key={td.uid}>Missing tank data<br/> for this config</td>

                return (
                    <td key={td.uid}>
                        <div className={styles.cell}>

                            <img
                                className={styles.tankImage}
                                src={td.rawData.info.image_preview_url}
                                alt={`${td.rawData.info.user_string} preview`}
                            />
                        
                            <div className={styles.textWrap}>
                                <span className={styles.name}>{ td.rawData.info.user_string }</span>
                                <span>{ toType(td.rawData.info.type_slug) }</span>
                                <span>{ toNation(td.rawData.info.nation) } | { toRoman(td.rawData.info.level) }</span>

                                
                            </div>

                        </div>
                    </td>
                )
            })}
    </tr>
    )

}
export { HeaderRow }
