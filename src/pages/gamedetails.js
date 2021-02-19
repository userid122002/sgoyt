import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import GamePage from "../components/game-page"
import SEO from "../components/seo"
import Layout from "../components/layout"
import withLocation from "../components/withLocation"
import "../sass/components/_Collapsible.scss"

function Game( {data, search} ) {
    const { gameid } =  search
    const game_data = data.allSgoytCsv.nodes.filter(n => n.gameid === gameid)
    const game_details_data = data.allGameIndexCsv.nodes.filter(n => n.gameid === gameid)
    let game_details = {}
    let recommended = ""
    let not_recommended = ""
    let best = ""
    game_details_data.forEach(function(data_item){
        game_details['game_name'] = data_item.game
        game_details['bgglink'] = data_item.bgglink
        game_details['categories'] = data_item.categories
        game_details['designers'] = data_item.designers
        game_details['mechanics'] = data_item.mechanics
        game_details['playtime'] = data_item.playtime
        game_details['rating'] = data_item.rating
        game_details['thumbnail'] = data_item.thumbnail
        game_details['weight'] = data_item.weight
        game_details['yearpublished'] = data_item.yearpublished
        recommended = data_item.recommended
        not_recommended = data_item.not_recommended
        best = data_item.best
    })
    game_details['recommended'] = String(parseInt(recommended, 10) + parseInt(best, 10)) + ' out of ' + String(parseInt(recommended, 10) + parseInt(best, 10) + parseInt(not_recommended, 10)) + ' (' + String((100 * (parseFloat(recommended) + parseFloat(best)) / (parseFloat(recommended) + parseFloat(best) + parseFloat(not_recommended))).toFixed(2)) + '%)'
    return (
        <Layout>
            <SEO title={game_details['game_name']}></SEO>
            <GamePage data={game_data} game_details={game_details}></GamePage>
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
                categories
                designers
                mechanics
                playtime
                rating
                thumbnail
                weight
                yearpublished
                recommended
                not_recommended
                best
            }
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