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
        game_details['bgg_link'] = data_item.bgg_link
        game_details['categories_string'] = data_item.categories_string
        game_details['designers_string'] = data_item.designers_string
        game_details['expansion_for'] = data_item.expansion_for
        game_details['expansions'] = data_item.expansions
        game_details['game_id'] = data_item.game_id
        game_details['game_name'] = data_item.game_name
        game_details['mechanics_string'] = data_item.mechanics_string
        game_details['play_time'] = data_item.play_time
        game_details['rating'] = data_item.rating
        game_details['thumbnail'] = data_item.thumbnail
        game_details['weight'] = data_item.weight
        game_details['year_published'] = data_item.year_published
        game_details['sgoyt_count_156765'] = data_item.sgoyt_count_156765
        game_details['sgoyt_count_157888'] = data_item.sgoyt_count_157888
        game_details['sgoyt_count_158763'] = data_item.sgoyt_count_158763
        game_details['sgoyt_count_160445'] = data_item.sgoyt_count_160445
        game_details['sgoyt_count_161764'] = data_item.sgoyt_count_161764
        game_details['sgoyt_count_163198'] = data_item.sgoyt_count_163198
        game_details['sgoyt_count_164593'] = data_item.sgoyt_count_164593
        game_details['sgoyt_count_166060'] = data_item.sgoyt_count_166060
        game_details['sgoyt_count_169311'] = data_item.sgoyt_count_169311
        game_details['sgoyt_count_170533'] = data_item.sgoyt_count_170533
        game_details['sgoyt_count_171598'] = data_item.sgoyt_count_171598
        game_details['sgoyt_count_172996'] = data_item.sgoyt_count_172996
        game_details['sgoyt_count_174241'] = data_item.sgoyt_count_174241
        game_details['sgoyt_count_175551'] = data_item.sgoyt_count_175551
        game_details['sgoyt_count_176697'] = data_item.sgoyt_count_176697
        game_details['sgoyt_count_178257'] = data_item.sgoyt_count_178257
        game_details['sgoyt_count_178963'] = data_item.sgoyt_count_178963
        game_details['sgoyt_count_179645'] = data_item.sgoyt_count_179645
        game_details['sgoyt_count_182515'] = data_item.sgoyt_count_182515
        game_details['sgoyt_count_182573'] = data_item.sgoyt_count_182573
        game_details['sgoyt_count_183994'] = data_item.sgoyt_count_183994
        game_details['sgoyt_count_186058'] = data_item.sgoyt_count_186058
        game_details['sgoyt_count_186592'] = data_item.sgoyt_count_186592
        game_details['sgoyt_count_190679'] = data_item.sgoyt_count_190679
        game_details['sgoyt_count_191963'] = data_item.sgoyt_count_191963
        game_details['sgoyt_count_193005'] = data_item.sgoyt_count_193005
        game_details['sgoyt_count_194479'] = data_item.sgoyt_count_194479
        game_details['sgoyt_count_194940'] = data_item.sgoyt_count_194940
        game_details['sgoyt_count_197513'] = data_item.sgoyt_count_197513
        game_details['sgoyt_count_198923'] = data_item.sgoyt_count_198923
        game_details['sgoyt_count_200203'] = data_item.sgoyt_count_200203
        game_details['sgoyt_count_202271'] = data_item.sgoyt_count_202271
        game_details['sgoyt_count_204546'] = data_item.sgoyt_count_204546
        game_details['sgoyt_count_205877'] = data_item.sgoyt_count_205877
        game_details['sgoyt_count_206595'] = data_item.sgoyt_count_206595
        game_details['sgoyt_count_208306'] = data_item.sgoyt_count_208306
        game_details['sgoyt_count_209493'] = data_item.sgoyt_count_209493
        game_details['sgoyt_count_210694'] = data_item.sgoyt_count_210694
        game_details['sgoyt_count_211592'] = data_item.sgoyt_count_211592
        game_details['sgoyt_count_213557'] = data_item.sgoyt_count_213557
        game_details['sgoyt_count_214406'] = data_item.sgoyt_count_214406
        game_details['sgoyt_count_215297'] = data_item.sgoyt_count_215297
        game_details['sgoyt_count_217780'] = data_item.sgoyt_count_217780
        game_details['sgoyt_count_219163'] = data_item.sgoyt_count_219163
        game_details['sgoyt_count_221242'] = data_item.sgoyt_count_221242
        game_details['sgoyt_count_222478'] = data_item.sgoyt_count_222478
        game_details['sgoyt_count_223793'] = data_item.sgoyt_count_223793
        game_details['sgoyt_count_223927'] = data_item.sgoyt_count_223927
        game_details['sgoyt_count_225998'] = data_item.sgoyt_count_225998
        game_details['sgoyt_count_227011'] = data_item.sgoyt_count_227011
        game_details['sgoyt_count_228234'] = data_item.sgoyt_count_228234
        game_details['sgoyt_count_229124'] = data_item.sgoyt_count_229124
        game_details['sgoyt_count_229952'] = data_item.sgoyt_count_229952
        game_details['sgoyt_count_231127'] = data_item.sgoyt_count_231127
        game_details['sgoyt_count_233358'] = data_item.sgoyt_count_233358
        game_details['sgoyt_count_235012'] = data_item.sgoyt_count_235012
        game_details['sgoyt_count_237172'] = data_item.sgoyt_count_237172
        game_details['sgoyt_count_238328'] = data_item.sgoyt_count_238328
        game_details['sgoyt_count_238369'] = data_item.sgoyt_count_238369
        game_details['sgoyt_count_240624'] = data_item.sgoyt_count_240624
        game_details['sgoyt_count_241528'] = data_item.sgoyt_count_241528
        game_details['sgoyt_count_241745'] = data_item.sgoyt_count_241745
        game_details['sgoyt_count_242306'] = data_item.sgoyt_count_242306
        game_details['sgoyt_count_244471'] = data_item.sgoyt_count_244471
        game_details['sgoyt_count_245355'] = data_item.sgoyt_count_245355
        game_details['sgoyt_count_246401'] = data_item.sgoyt_count_246401
        game_details['sgoyt_count_247302'] = data_item.sgoyt_count_247302
        game_details['sgoyt_count_249922'] = data_item.sgoyt_count_249922
        game_details['sgoyt_count_251846'] = data_item.sgoyt_count_251846
        game_details['sgoyt_count_251880'] = data_item.sgoyt_count_251880
        game_details['sgoyt_count_252324'] = data_item.sgoyt_count_252324
        game_details['sgoyt_count_253515'] = data_item.sgoyt_count_253515
        game_details['sgoyt_count_255931'] = data_item.sgoyt_count_255931
        game_details['sgoyt_count_256394'] = data_item.sgoyt_count_256394
        game_details['sgoyt_count_258026'] = data_item.sgoyt_count_258026
        game_details['sgoyt_count_260880'] = data_item.sgoyt_count_260880
        game_details['sgoyt_count_262008'] = data_item.sgoyt_count_262008
        game_details['sgoyt_count_262319'] = data_item.sgoyt_count_262319
        game_details['sgoyt_count_262633'] = data_item.sgoyt_count_262633
        game_details['sgoyt_count_266487'] = data_item.sgoyt_count_266487
        game_details['sgoyt_count_268583'] = data_item.sgoyt_count_268583
        game_details['sgoyt_count_269654'] = data_item.sgoyt_count_269654
        game_details['sgoyt_count_270349'] = data_item.sgoyt_count_270349
        game_details['sgoyt_count_272126'] = data_item.sgoyt_count_272126
        game_details['sgoyt_count_273040'] = data_item.sgoyt_count_273040
        game_details['sgoyt_count_274323'] = data_item.sgoyt_count_274323
        game_details['sgoyt_count_275246'] = data_item.sgoyt_count_275246
        game_details['sgoyt_count_276177'] = data_item.sgoyt_count_276177
        game_details['sgoyt_count_277289'] = data_item.sgoyt_count_277289
        game_details['sgoyt_count_278237'] = data_item.sgoyt_count_278237
        game_details['sgoyt_count_279491'] = data_item.sgoyt_count_279491
        game_details['sgoyt_count_280864'] = data_item.sgoyt_count_280864
        game_details['sgoyt_count_281198'] = data_item.sgoyt_count_281198
        game_details['sgoyt_count_282453'] = data_item.sgoyt_count_282453
        game_details['sgoyt_count_284335'] = data_item.sgoyt_count_284335
        game_details['sgoyt_count_285147'] = data_item.sgoyt_count_285147
        
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
        sgoyt_count_284335
        sgoyt_count_285147
      }
    }
  }
`
