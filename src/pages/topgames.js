import React from "react"
import { graphql } from "gatsby"
import Collapsible from "react-collapsible"
import SEO from "../components/seo"
import Layout from "../components/layout"

export default function TopGames( {data} ) {
    const top_game_data = data.allGameDataJson.nodes.slice(0,25)
    // const geeklist_data = data.allYearMonthDataJson.nodes
    return (
        <Layout>
            <SEO title="Top Games"></SEO>
            <Collapsible trigger="Top 25 Games - All Time">
            {top_game_data.map(function(data_item) {
                return (
                    <tr>
                        <td>{data_item.game_name}</td>
                        <td>{data_item.sgoyt_count}</td>
                        <td><a href={data_item.bgg_link} target="_blank" rel="noreferrer">[bgg]</a></td>
                    </tr>
                )
            })}
            </Collapsible>
            {/* {geeklist_data.map(function(data_item) {
                let geeklist_id = data_item.geeklist_id
                let year_month = data_item.year_month
                let collapsible_trigger = "Top 25 Games - " + year_month
                let count_key = 'sgoyt_count_' + geeklist_id
                let ordered_data = sort_by_key(data.allGameDataJson.nodes, count_key, -1).slice(0, 25)
                return (
                    <Collapsible trigger={collapsible_trigger}>
                        {ordered_data.map(function(ordered_data_item) {
                            return (
                                <tr>
                                    <td>{ordered_data_item.game_name}</td>
                                    <td>{ordered_data_item[count_key]}</td>
                                    <td><a href={ordered_data_item.bgg_link} target="_blank" rel="noreferrer">[bgg]</a></td>
                                </tr>
                            )
                        })}
                    </Collapsible>
                )
            })} */}
        </Layout>
    )
}

// function sort_by_key(array, key, order = 1)
// {
//  return array.sort(function(a, b)
//  {
//   var x = a[key]; var y = b[key]
//   return order*((x < y) ? -1 : ((x > y) ? 1 : 0))
//  })
// }

export const query = graphql`
  query {
    allGameDataJson (sort: {fields: sgoyt_count, order: DESC}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count
      }
    }
  }
`

// export const query = graphql`
//   query {
//     allYearMonthDataJson (sort: {fields: year_month, order: DESC}) {
//       nodes {
//         geeklist_id
//         year_month
//         geeklist_host
//         geeklist_link
//       }
//     }
//     allGameDataJson (sort: {fields: sgoyt_count, order: DESC}) {
//       nodes {
//         game_id
//         game_name
//         bgg_link
//         sgoyt_count
//         sgoyt_count_156765
//         sgoyt_count_157888
//         sgoyt_count_158763
//         sgoyt_count_160445
//         sgoyt_count_161764
//         sgoyt_count_163198
//         sgoyt_count_164593
//         sgoyt_count_166060
//         sgoyt_count_170533
//         sgoyt_count_171598
//         sgoyt_count_172996
//         sgoyt_count_174241
//         sgoyt_count_175551
//         sgoyt_count_176697
//         sgoyt_count_178257
//         sgoyt_count_178963
//         sgoyt_count_179645
//         sgoyt_count_182515
//         sgoyt_count_182573
//         sgoyt_count_183994
//         sgoyt_count_186058
//         sgoyt_count_186592
//         sgoyt_count_190679
//         sgoyt_count_191963
//         sgoyt_count_193005
//         sgoyt_count_194479
//         sgoyt_count_194940
//         sgoyt_count_197513
//         sgoyt_count_198923
//         sgoyt_count_200203
//         sgoyt_count_202271
//         sgoyt_count_204546
//         sgoyt_count_205877
//         sgoyt_count_206595
//         sgoyt_count_208306
//         sgoyt_count_209493
//         sgoyt_count_210694
//         sgoyt_count_211592
//         sgoyt_count_213557
//         sgoyt_count_214406
//         sgoyt_count_215297
//         sgoyt_count_217780
//         sgoyt_count_219163
//         sgoyt_count_221242
//         sgoyt_count_222478
//         sgoyt_count_223793
//         sgoyt_count_223927
//         sgoyt_count_225998
//         sgoyt_count_227011
//         sgoyt_count_228234
//         sgoyt_count_229124
//         sgoyt_count_229952
//         sgoyt_count_231127
//         sgoyt_count_233358
//         sgoyt_count_235012
//         sgoyt_count_237172
//         sgoyt_count_238328
//         sgoyt_count_238369
//         sgoyt_count_240624
//         sgoyt_count_241528
//         sgoyt_count_241745
//         sgoyt_count_242306
//         sgoyt_count_244471
//         sgoyt_count_245355
//         sgoyt_count_246401
//         sgoyt_count_282453
//         sgoyt_count_280864
//         sgoyt_count_279491
//         sgoyt_count_278237
//         sgoyt_count_277289
//         sgoyt_count_276177
//         sgoyt_count_275246
//         sgoyt_count_274323
//         sgoyt_count_273040
//         sgoyt_count_272126
//         sgoyt_count_270349
//         sgoyt_count_269654
//         sgoyt_count_268583
//         sgoyt_count_266487
//         sgoyt_count_262633
//         sgoyt_count_262319
//         sgoyt_count_262008
//         sgoyt_count_260880
//         sgoyt_count_258026
//         sgoyt_count_256394
//         sgoyt_count_255931
//         sgoyt_count_253515
//         sgoyt_count_252324
//         sgoyt_count_251880
//         sgoyt_count_251846
//         sgoyt_count_249922
//         sgoyt_count_247302
//       }
//     }
//   }
// `