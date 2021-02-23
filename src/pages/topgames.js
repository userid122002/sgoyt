import React from "react"
import { graphql } from "gatsby"
import Collapsible from "react-collapsible"
import SEO from "../components/seo"
import Layout from "../components/layout"

export default function TopGames( {data} ) {
    const game_data = data.allGameDataJson.nodes.slice(0,25)
    return (
        <Layout>
            <SEO title="Top Games"></SEO>
            <Collapsible trigger="Top 25 Games - All Time">
            {game_data.map(function(data_item) {
                return (
                    
                        <tr>
                            <td>{data_item.game_name}</td>
                            <td>{data_item.sgoyt_count}</td>
                            <td><a href={data_item.bgg_link} target="_blank" rel="noreferrer">[bgg]</a></td>
                        </tr>
                )
            })}
            </Collapsible>
        </Layout>
    )
}

export const query = graphql`
  query {
    allGameDataJson(sort: {fields: sgoyt_count, order: DESC}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count
      }
    }
  }
`