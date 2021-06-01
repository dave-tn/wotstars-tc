import { GQLPlayers } from './AddTankComponents/SelectTankList'
import styles from './TankColumn.module.css'

import { rounder } from '../utils/rounder'

/**
 * Takes a list of 'Top Player' stats and returns 3 rows worth of data (always 3; to ensure our grid layout functions properly)
 */
function TopPlayersRows({ players }: { players: GQLPlayers[] }) {
    const items = []
    for (let i = 0; i < 3; i++) {
        if (!players[i]) items.push(<div> none ... </div>)
        else {
            const player = players[i]
            items.push((
                <div className={`${styles.playerCell}`}>
                    <div className={styles.playerTopRow}>
                        <div className={`${player.platform === 'xbox' ? styles.platformXbox : styles.platformPs}`}></div>
                        <a
                            className={styles.playerName}
                            href={`https://www.wotstars.com/${player.platform}/${player.account_id}`}>
                        { player.playerinfo.nickname }
                        </a>

                        { player.playerinfo?.clan?.tag &&
                            <a
                                className={styles.playerClanTag}
                                href={`https://www.wotstars.com/clans/${player.playerinfo.clan.clan_id}`}>
                                [{ player.playerinfo?.clan?.tag }]
                            </a>
                        }
                    </div>
                    <div className={styles.playerStatsRow}>
                        <span>{ rounder(player.p90.battles, 0) }</span>
                        <span className={styles.playerWn8}>{ rounder(player.p90.wn8, 0) }</span>
                        <span>{ rounder(player.p90.tdpb, 0) }</span>
                    </div>
                </div>
            ))
        }

    }

    return items
}

export {
    TopPlayersRows
}
