import { FC } from 'react'

import styles from './TankIntro.module.css'

import { toRoman } from '../utils/tankTiers'
import { toNation } from './../utils/tankNations'
import { toType } from './../utils/tankTypes'

import { TankInfo } from '../typesStuff/Tank'


const TankIntro: FC<{ tank: TankInfo }> = ({ tank }) => {
    if (!tank) return <div>Missing tank data... 😱</div>

    return (
        <div className={styles.cell}>

            <img
                className={styles.tankImage}
                src={tank.image_preview_url}
                alt={`${tank.user_string} preview`}
            />

            <div className={styles.textWrap}>
                <span className={`${styles.name}${tank.is_premium? ` ${styles.premiumTextColour}` : ''}`}>{tank.user_string}</span>
                <span>{toType(tank.type_slug)}</span>
                <span>{toNation(tank.nation)} | {toRoman(tank.level)}</span>
            </div>

        </div>
    )
}

export {
    TankIntro
}
