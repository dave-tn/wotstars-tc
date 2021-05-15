import { FC } from 'react'
import { useQuery, gql } from '@apollo/client'
import { toNation } from '../utils/tankNations'

interface Nations {
    nations: string[]
}

const GET_NATIONS_QUERY = gql`
    query GetNations {
        nations
    }
`

export const SelectNation:FC<{ setSelectedNation: React.Dispatch<React.SetStateAction<string>> }> = ({
    setSelectedNation
}) => {

    const { loading, error, data } = useQuery<Nations>(GET_NATIONS_QUERY, {
        onCompleted: ({ nations }) => setSelectedNation(nations[0])        
    })
    // TODO: FIXME
    if (loading) return <div>Loading list of nations data...</div>
    if (error) return <div>There was an error loading the list of nations data. Maybe try refreshing 🤷‍♂️</div>

    return (
        <select onChange={(e) => setSelectedNation(e.target.value)}>
            { data?.nations && data.nations.map(n => 
                <option key={n} value={n}>{ toNation(n) }</option>
            )}
        </select>
    )

}

