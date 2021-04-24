import { FC, createContext, useContext } from 'react'
import { createHashHistory } from 'history'

/**
 * So the grand idea is that we're effectively storing our state in the path,
 * this allows people to share 'comparisons' by sharing the page link
 */

const history = createHashHistory()
const HistoryContext = createContext(history)

const HistoryProvider:FC = ({ children }) => {
    return <HistoryContext.Provider value={history}>{ children }</HistoryContext.Provider>
}

const useHistory = () => useContext(HistoryContext)

export { HistoryProvider, HistoryContext, useHistory }
