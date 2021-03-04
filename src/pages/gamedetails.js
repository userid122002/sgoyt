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
    const filtered_game_data = data.allGameDataJson.nodes.filter(n => n.game_id === gameid)
    const geeklist_data = data.allYearMonthDataJson.nodes
    let game_details = {}
    let recommended = ""
    let not_recommended = ""
    let best = ""
    filtered_game_data.forEach(function(data_item){
        game_details = data_item
        game_details['sgoyt_entries'] = sort_by_key(data_item.sgoyt_entries, 'year_month', -1)
        recommended = data_item.recommended
        not_recommended = data_item.not_recommended
        best = data_item.best
    })
    game_details['recommended_string'] = String(parseInt(recommended, 10) + parseInt(best, 10)) + ' out of ' + String(parseInt(recommended, 10) + parseInt(best, 10) + parseInt(not_recommended, 10)) + ' (' + String((100 * (parseFloat(recommended) + parseFloat(best)) / (parseFloat(recommended) + parseFloat(best) + parseFloat(not_recommended))).toFixed(2)) + '%)'
    return (
        <Layout>
            <SEO title={game_details['game_name']}></SEO>
            <GamePage game_data={game_details} geeklist_data={geeklist_data}></GamePage>
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
    allYearMonthDataJson (sort: {fields: year_month, order: ASC}) {
      nodes {
        geeklist_id
        year_month
      }
    }
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
        sgoyt_count_156765
        sgoyt_count_157888
        sgoyt_count_158763
        sgoyt_count_160445
        sgoyt_count_161764
        sgoyt_count_163198
        sgoyt_count_164593
        sgoyt_count_166060
        sgoyt_count_169311
        sgoyt_count_170533
        sgoyt_count_171598
        sgoyt_count_172996
        sgoyt_count_174241
        sgoyt_count_175551
        sgoyt_count_176697
        sgoyt_count_178257
        sgoyt_count_178963
        sgoyt_count_179645
        sgoyt_count_182515
        sgoyt_count_182573
        sgoyt_count_183994
        sgoyt_count_186058
        sgoyt_count_186592
        sgoyt_count_190679
        sgoyt_count_191963
        sgoyt_count_193005
        sgoyt_count_194479
        sgoyt_count_194940
        sgoyt_count_197513
        sgoyt_count_198923
        sgoyt_count_200203
        sgoyt_count_202271
        sgoyt_count_204546
        sgoyt_count_205877
        sgoyt_count_206595
        sgoyt_count_208306
        sgoyt_count_209493
        sgoyt_count_210694
        sgoyt_count_211592
        sgoyt_count_213557
        sgoyt_count_214406
        sgoyt_count_215297
        sgoyt_count_217780
        sgoyt_count_219163
        sgoyt_count_221242
        sgoyt_count_222478
        sgoyt_count_223793
        sgoyt_count_223927
        sgoyt_count_225998
        sgoyt_count_227011
        sgoyt_count_228234
        sgoyt_count_229124
        sgoyt_count_229952
        sgoyt_count_231127
        sgoyt_count_233358
        sgoyt_count_235012
        sgoyt_count_237172
        sgoyt_count_238328
        sgoyt_count_238369
        sgoyt_count_240624
        sgoyt_count_241528
        sgoyt_count_241745
        sgoyt_count_242306
        sgoyt_count_244471
        sgoyt_count_245355
        sgoyt_count_246401
        sgoyt_count_247302
        sgoyt_count_249922
        sgoyt_count_251846
        sgoyt_count_251880
        sgoyt_count_252324
        sgoyt_count_253515
        sgoyt_count_255931
        sgoyt_count_256394
        sgoyt_count_258026
        sgoyt_count_260880
        sgoyt_count_262008
        sgoyt_count_262319
        sgoyt_count_262633
        sgoyt_count_266487
        sgoyt_count_268583
        sgoyt_count_269654
        sgoyt_count_270349
        sgoyt_count_272126
        sgoyt_count_273040
        sgoyt_count_274323
        sgoyt_count_275246
        sgoyt_count_276177
        sgoyt_count_277289
        sgoyt_count_278237
        sgoyt_count_279491
        sgoyt_count_280864
        sgoyt_count_281198
        sgoyt_count_282453
      }
    }
  }
`
