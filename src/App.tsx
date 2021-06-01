import { FC, useState } from 'react'

import styles from './App.module.css'

import { AddTank } from './AddTank'
import { TanksTable } from './TanksTable'
import { TankConfigEditor } from './Components/TankConfigEditor'

import tankyMcPew from './images/TankyMcPewpew-TC.png'

const App:FC = () => {

  const [ showTankEditor, setShowTankEditor ] = useState(false)

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        WoTStars' Tank Compare
        <img src={tankyMcPew} alt="site logo" className={styles.headerLogo}></img>
      </header>
      <div className={styles.appBody}>
        { showTankEditor && <AddTank setShow={setShowTankEditor} /> }
        <TanksTable showTankEditor={setShowTankEditor} />
        <TankConfigEditor />
      </div>
    </div>
  )
}

export { App }
