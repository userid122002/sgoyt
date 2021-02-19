import React from "react"
import { graphql } from "gatsby"
import Collapsible from "react-collapsible"
import SEO from "../components/seo"
import Layout from "../components/layout"

export default function TopGames( {data} ) {
    const game_data = data.allGameIndexCsv.nodes.sort(compare).slice(0,25)
    return (
        <Layout>
            <SEO title="Top Games"></SEO>
            <Collapsible trigger="Top 25 Games - All Time">
            {game_data.map(function(data_item) {
                return (
                    
                        <tr>
                            <td>{data_item.game}</td>
                            <td>{data_item.count}</td>
                            <td><a href={data_item.bgglink} target="_blank" rel="noreferrer">[bgg]</a></td>
                        </tr>
                )
            })}
            </Collapsible>
        </Layout>
    )
}

export function compare(a, b) {
    const countA = parseInt(a.count, 10)
    const countB = parseInt(b.count, 10)

    let comparison = 0
    if (countA > countB) {
        comparison = 1
    }
    else if (countA < countB) {
        comparison = -1
    }
    return comparison * -1
}


export const query = graphql`
query {
  allGameIndexCsv {
    nodes {
      count
      bgglink
      game
      gameid
    }
  }
}
`