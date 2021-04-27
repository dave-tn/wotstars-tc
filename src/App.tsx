import { FC, useState, useEffect } from 'react'

import styles from './App.module.css'

import { Tank } from './typesStuff/Tank'
import { AddTank } from './AddTank'
import { TanksTable } from './TanksTable'

const App:FC = () => {

  const [ tanks, setTanks ] = useState<Tank[]>([])
  /**
   * The wotc-vehicles file contains data from public Wargaming sources
   * The formatting is per WG's formatting, and the bits we're interested in
   * are described & typed in typesStuff/Tank
   */
  useEffect(() => {
      fetch('/wotc-vehicles.json')
          .then(res => res.json())
          .then(json => {
              setTanks(json)
          })
          // TODO: Catch load fails, show error message and allow retrying
  }, [])

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        WoTStars' Tank Compare
        <img src="/TankyMcPewPew-TC.png" alt="site logo" className={styles.headerLogo}></img>
      </header>
      <div className={styles.appBody}>
        {/* TODO: A loading spinner for while we wait for our vehicles data */}
        { !tanks && <div>Loading tank schematics!...</div> }
        { tanks && <AddTank tanks={tanks} /> }
        <TanksTable tanks={tanks} />
      </div>
    </div>
  )
}

export { App }
