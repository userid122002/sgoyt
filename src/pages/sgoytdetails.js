import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import GamePage from "../components/game-page"
import SEO from "../components/seo"
import Layout from "../components/layout"
import withLocation from "../components/withLocation"

function Game( {data, search} ) {
    const { gameid } =  search
    const game_data = data.allSgoytCsv.nodes.filter(n => n.gameid === gameid)
    const game_name = game_data[0].game
    return (
        <Layout>
            <SEO title={game_name}></SEO>
            <GamePage data={game_data}></GamePage>
        </Layout>
    )
}

Game.propTypes = {
    search: PropTypes.object,
}

export default withLocation(Game)

export const query = graphql`
    query {
        allSgoytCsv {
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