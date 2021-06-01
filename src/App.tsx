import { FC, useState } from 'react'

import styles from './App.module.css'

import { AddTank } from './Components/AddTank'
import { TanksTable } from './TanksTable'
import { TankConfigEditor } from './Components/TankConfigEditor'

import tankyMcPew from './images/TankyMcPewpew-TC.png'

const App:FC = () => {

  const [ showAddTankView, setShowAddTankView ] = useState(false)

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        WoTStars' Tank Compare
        <img src={tankyMcPew} alt="site logo" className={styles.headerLogo}></img>
        <span><a className={styles.returnLink} href="https://www.wotstars.com">&lt; back to WoTStars</a></span>
      </header>
      <div className={styles.appBody}>
        { showAddTankView && <AddTank setShow={setShowAddTankView} /> }
        <TanksTable showAddTankView={setShowAddTankView} />
        <TankConfigEditor />
      </div>
    </div>
  )
}

export { App }
