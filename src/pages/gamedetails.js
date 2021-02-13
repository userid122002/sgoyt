import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import GamePage from "../components/game-page"
import SEO from "../components/seo"
import Layout from "../components/layout"
import withLocation from "../components/withLocation"
import "../sass/components/_Collapsible.scss"
// import "../components/_Collapsible.scss"

function Game( {data, search} ) {
    const { gameid } =  search
    const game_data = data.allSgoytCsv.nodes.filter(n => n.gameid === gameid)
    const game_name_data = data.allGameIndexCsv.nodes.filter(n => n.gameid === gameid)
    let game_name = ""
    let bgglink = ""
    game_name_data.forEach(function(data_item){
        game_name = data_item.game
        bgglink = data_item.bgglink
    })
    return (
        <Layout>
            <SEO title={game_name}></SEO>
            <GamePage data={game_data} game_name={game_name} bgglink={bgglink}></GamePage>
        </Layout>
    )
}

Game.propTypes = {
    search: PropTypes.object,
}

export default withLocation(Game)

export const query = graphql`
    query {
        allGameIndexCsv {
            nodes {
                bgglink
                game
                gameid
            }
            totalCount
        }
        allSgoytCsv(sort: {fields: rownum, order: DESC}) {
            nodes {
                game
                gameid
                geeklisthost
                geeklistitem
                rownum
                user
                yearmonth
            }
            totalCount
        }
    }
`