
import React from "react"
import { graphql } from "gatsby"
import GamePage from "../components/game-page"
import SEO from "../components/seo"
import Layout from "../components/layout"

export default function Game( {data} ) {
    const game_name = data.allSgoytCsv.nodes[0].game
    return (
        <Layout>
            <SEO title={game_name}></SEO>
            <GamePage data={data.allSgoytCsv.nodes}></GamePage>
        </Layout>
    )
}

export const query = graphql`
    query {
        allSgoytCsv(filter: {gameid: {eq: "23387"}}, sort: {fields: yearmonth, order: DESC}) {
            nodes {
                game
                gameid
                geeklisthost
                geeklistitem
                rownum
                user
                yearmonth
            }
        }
    }
`
