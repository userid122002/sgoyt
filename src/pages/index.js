import React from "react"
import { graphql } from "gatsby"
import GameIndexGrid from "../components/game-index-grid"
import SEO from "../components/seo"
import Layout from "../components/layout"

export default function Index( {data} ) {
  return (
    <Layout>
        <SEO title="Home"></SEO>
        <GameIndexGrid data={data.allGameIndexCsv.nodes}></GameIndexGrid>
    </Layout>
  )
}

export const query = graphql`
    query {
      allGameIndexCsv (sort: {fields: game, order: ASC}) {
        nodes {
          bgglink
          game
          gameid
        }
      }
    }
`