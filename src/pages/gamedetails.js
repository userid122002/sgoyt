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
    const game_data = data.allGameDataJson.nodes.filter(n => n.game_id === gameid)
    let game_details = {}
    let recommended = ""
    let not_recommended = ""
    let best = ""
    game_data.forEach(function(data_item){
        game_details['game_name'] = data_item.game_name
        game_details['bgg_link'] = data_item.bgg_link
        game_details['categories_string'] = data_item.categories_string
        game_details['designers_string'] = data_item.designers_string
        game_details['mechanics_string'] = data_item.mechanics_string
        game_details['play_time'] = data_item.play_time
        game_details['rating'] = data_item.rating
        game_details['thumbnail'] = data_item.thumbnail
        game_details['weight'] = data_item.weight
        game_details['year_published'] = data_item.year_published
        game_details['sgoyt_entries'] = sort_by_key(data_item.sgoyt_entries, 'year_month', -1)
        game_details['expansions'] = data_item.expansions
        game_details['expansion_for'] = data_item.expansion_for
        recommended = data_item.recommended
        not_recommended = data_item.not_recommended
        best = data_item.best
    })
    game_details['recommended_string'] = String(parseInt(recommended, 10) + parseInt(best, 10)) + ' out of ' + String(parseInt(recommended, 10) + parseInt(best, 10) + parseInt(not_recommended, 10)) + ' (' + String((100 * (parseFloat(recommended) + parseFloat(best)) / (parseFloat(recommended) + parseFloat(best) + parseFloat(not_recommended))).toFixed(2)) + '%)'
    return (
        <Layout>
            <SEO title={game_details['game_name']}></SEO>
            <GamePage data={game_details}></GamePage>
        </Layout>
    )
}

function sort_by_key(array, key, order = 1)
{
 return array.sort(function(a, b)
 {
  var x = a[key]; var y = b[key]
  return order*((x < y) ? -1 : ((x > y) ? 1 : 0))
 })
}

Game.propTypes = {
    search: PropTypes.object,
}

export default withLocation(Game)

export const query = graphql`
  query {
    allGameDataJson {
      nodes {
        best
        bgg_link
        categories_string
        designers_string
        expansion_for {
          game_bgg_link
          game_id
          game_name
        }
        expansions {
          expansion_bgg_link
          expansion_id
          expansion_name
        }
        game_id
        game_name
        mechanics_string
        not_recommended
        play_time
        rating
        recommended
        sgoyt_entries {
          contributor
          geeklist_host
          geeklist_id
          geeklist_item_id
          geeklist_item_link
          year_month
        }
        thumbnail
        weight
        year_published
        }
    }
  }
`