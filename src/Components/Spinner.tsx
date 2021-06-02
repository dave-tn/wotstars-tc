import { FC } from 'react'

import styles from './Spinner.module.css'


const Spinner:FC = () =>
        <div className={styles.spinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>


const CenteredSpinnerWithText:FC<{ text?: string }> = ({ text = 'Loading...'}) => (
    <div className={styles.wrap}>
        <Spinner />
        <div>{ text }</div>
    </div>
)

export {
    Spinner,
    CenteredSpinnerWithText
}
