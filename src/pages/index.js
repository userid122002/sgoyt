import React from "react"
import { graphql } from "gatsby"
import IndexGrid from "../components/index-grid"
import SEO from "../components/seo"
import Layout from "../components/layout"

export default function Index( {data} ) {
  return (
    <Layout>
        <SEO title="Home"></SEO>
        <IndexGrid data={data.allGameIndexCsv.nodes}></IndexGrid>
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