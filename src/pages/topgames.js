import React from "react"
import { graphql } from "gatsby"
import Collapsible from "react-collapsible"
import SEO from "../components/seo"
import Layout from "../components/layout"

export default function TopGames( {data} ) {
  const top_game_data = []
    data.all_time.nodes.forEach(function(top_game) {
        top_game_data.push(top_game)
    })
    const geeklist_data = []
    data.allYearMonthDataJson.nodes.forEach(function(geeklist) {
        geeklist_data.push(geeklist)
    })
    return (
        <Layout>
            <SEO title="Top Games"></SEO>
            <div key='All Time'>
            <Collapsible trigger="Top 25 Games - All Time">
            <table table-layout='fixed' width='100%'>
            <tbody>
            {top_game_data.map(function(data_item) {
                return (
                    <tr key={'All Time - ' + data_item.game_name}>
                        <td width='35%'>{data_item.game_name}</td>
                        <td width='15%'>{data_item.sgoyt_count}</td>
                        <td width='15%'><a href={data_item.bgg_link} target="_blank" rel="noreferrer">[bgg]</a></td>
                    </tr>
                )
            })}
            </tbody>
            </table>
            </Collapsible>
            </div>
            {geeklist_data.map(function(data_item) {
                let geeklist_id = data_item.geeklist_id
                let year_month = data_item.year_month
                let collapsible_trigger = "Top 25 Games - " + year_month
                let count_key = 'sgoyt_count_' + geeklist_id
                let gl_key = 'gl_' + geeklist_id
                let ordered_data = data[gl_key].nodes
                return (
                    <div key={collapsible_trigger}>
                    <Collapsible trigger={collapsible_trigger}>
                    <table table-layout='fixed' width='100%'>
                    <tbody>
                        {ordered_data.map(function(ordered_data_item) {
                            const key = year_month + ' - ' + ordered_data_item.game_name
                            return (
                                <tr key={key}>
                                    <td width='35%'>{ordered_data_item.game_name}</td>
                                    <td width='15%'>{ordered_data_item[count_key]}</td>
                                    <td width='15%'><a href={ordered_data_item.bgg_link} target="_blank" rel="noreferrer">[bgg]</a></td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </table>
                    </Collapsible>
                    </div>
                )
            })}
        </Layout>
    )
}

export const query = graphql`
  query {
    allYearMonthDataJson (sort: {fields: year_month, order: DESC}) {
      nodes {
        geeklist_id
        year_month
        geeklist_host
        geeklist_link
      }
    }
    all_time: allGameDataJson (limit: 25, sort: {fields: sgoyt_count, order: DESC}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count
      }
    }
    gl_156765: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_156765, order: DESC}, filter: {sgoyt_count_156765: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_156765
      }
    }
    gl_157888: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_157888, order: DESC}, filter: {sgoyt_count_157888: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_157888
      }
    }
    gl_158763: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_158763, order: DESC}, filter: {sgoyt_count_158763: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_158763
      }
    }
    gl_160445: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_160445, order: DESC}, filter: {sgoyt_count_160445: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_160445
      }
    }
    gl_161764: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_161764, order: DESC}, filter: {sgoyt_count_161764: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_161764
      }
    }
    gl_163198: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_163198, order: DESC}, filter: {sgoyt_count_163198: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_163198
      }
    }
    gl_164593: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_164593, order: DESC}, filter: {sgoyt_count_164593: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_164593
      }
    }
    gl_166060: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_166060, order: DESC}, filter: {sgoyt_count_166060: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_166060
      }
    }
    gl_169311: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_169311, order: DESC}, filter: {sgoyt_count_169311: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_169311
      }
    }
    gl_170533: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_170533, order: DESC}, filter: {sgoyt_count_170533: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_170533
      }
    }
    gl_171598: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_171598, order: DESC}, filter: {sgoyt_count_171598: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_171598
      }
    }
    gl_172996: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_172996, order: DESC}, filter: {sgoyt_count_172996: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_172996
      }
    }
    gl_174241: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_174241, order: DESC}, filter: {sgoyt_count_174241: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_174241
      }
    }
    gl_175551: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_175551, order: DESC}, filter: {sgoyt_count_175551: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_175551
      }
    }
    gl_176697: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_176697, order: DESC}, filter: {sgoyt_count_176697: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_176697
      }
    }
    gl_178257: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_178257, order: DESC}, filter: {sgoyt_count_178257: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_178257
      }
    }
    gl_178963: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_178963, order: DESC}, filter: {sgoyt_count_178963: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_178963
      }
    }
    gl_179645: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_179645, order: DESC}, filter: {sgoyt_count_179645: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_179645
      }
    }
    gl_182515: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_182515, order: DESC}, filter: {sgoyt_count_182515: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_182515
      }
    }
    gl_182573: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_182573, order: DESC}, filter: {sgoyt_count_182573: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_182573
      }
    }
    gl_183994: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_183994, order: DESC}, filter: {sgoyt_count_183994: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_183994
      }
    }
    gl_186058: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_186058, order: DESC}, filter: {sgoyt_count_186058: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_186058
      }
    }
    gl_186592: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_186592, order: DESC}, filter: {sgoyt_count_186592: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_186592
      }
    }
    gl_190679: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_190679, order: DESC}, filter: {sgoyt_count_190679: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_190679
      }
    }
    gl_191963: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_191963, order: DESC}, filter: {sgoyt_count_191963: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_191963
      }
    }
    gl_193005: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_193005, order: DESC}, filter: {sgoyt_count_193005: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_193005
      }
    }
    gl_194479: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_194479, order: DESC}, filter: {sgoyt_count_194479: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_194479
      }
    }
    gl_194940: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_194940, order: DESC}, filter: {sgoyt_count_194940: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_194940
      }
    }
    gl_197513: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_197513, order: DESC}, filter: {sgoyt_count_197513: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_197513
      }
    }
    gl_198923: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_198923, order: DESC}, filter: {sgoyt_count_198923: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_198923
      }
    }
    gl_200203: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_200203, order: DESC}, filter: {sgoyt_count_200203: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_200203
      }
    }
    gl_202271: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_202271, order: DESC}, filter: {sgoyt_count_202271: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_202271
      }
    }
    gl_204546: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_204546, order: DESC}, filter: {sgoyt_count_204546: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_204546
      }
    }
    gl_205877: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_205877, order: DESC}, filter: {sgoyt_count_205877: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_205877
      }
    }
    gl_206595: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_206595, order: DESC}, filter: {sgoyt_count_206595: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_206595
      }
    }
    gl_208306: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_208306, order: DESC}, filter: {sgoyt_count_208306: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_208306
      }
    }
    gl_209493: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_209493, order: DESC}, filter: {sgoyt_count_209493: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_209493
      }
    }
    gl_210694: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_210694, order: DESC}, filter: {sgoyt_count_210694: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_210694
      }
    }
    gl_211592: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_211592, order: DESC}, filter: {sgoyt_count_211592: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_211592
      }
    }
    gl_213557: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_213557, order: DESC}, filter: {sgoyt_count_213557: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_213557
      }
    }
    gl_214406: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_214406, order: DESC}, filter: {sgoyt_count_214406: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_214406
      }
    }
    gl_215297: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_215297, order: DESC}, filter: {sgoyt_count_215297: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_215297
      }
    }
    gl_217780: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_217780, order: DESC}, filter: {sgoyt_count_217780: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_217780
      }
    }
    gl_219163: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_219163, order: DESC}, filter: {sgoyt_count_219163: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_219163
      }
    }
    gl_221242: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_221242, order: DESC}, filter: {sgoyt_count_221242: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_221242
      }
    }
    gl_222478: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_222478, order: DESC}, filter: {sgoyt_count_222478: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_222478
      }
    }
    gl_223793: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_223793, order: DESC}, filter: {sgoyt_count_223793: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_223793
      }
    }
    gl_223927: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_223927, order: DESC}, filter: {sgoyt_count_223927: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_223927
      }
    }
    gl_225998: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_225998, order: DESC}, filter: {sgoyt_count_225998: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_225998
      }
    }
    gl_227011: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_227011, order: DESC}, filter: {sgoyt_count_227011: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_227011
      }
    }
    gl_228234: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_228234, order: DESC}, filter: {sgoyt_count_228234: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_228234
      }
    }
    gl_229124: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_229124, order: DESC}, filter: {sgoyt_count_229124: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_229124
      }
    }
    gl_229952: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_229952, order: DESC}, filter: {sgoyt_count_229952: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_229952
      }
    }
    gl_231127: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_231127, order: DESC}, filter: {sgoyt_count_231127: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_231127
      }
    }
    gl_233358: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_233358, order: DESC}, filter: {sgoyt_count_233358: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_233358
      }
    }
    gl_235012: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_235012, order: DESC}, filter: {sgoyt_count_235012: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_235012
      }
    }
    gl_237172: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_237172, order: DESC}, filter: {sgoyt_count_237172: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_237172
      }
    }
    gl_238328: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_238328, order: DESC}, filter: {sgoyt_count_238328: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_238328
      }
    }
    gl_238369: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_238369, order: DESC}, filter: {sgoyt_count_238369: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_238369
      }
    }
    gl_240624: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_240624, order: DESC}, filter: {sgoyt_count_240624: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_240624
      }
    }
    gl_241528: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_241528, order: DESC}, filter: {sgoyt_count_241528: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_241528
      }
    }
    gl_241745: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_241745, order: DESC}, filter: {sgoyt_count_241745: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_241745
      }
    }
    gl_242306: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_242306, order: DESC}, filter: {sgoyt_count_242306: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_242306
      }
    }
    gl_244471: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_244471, order: DESC}, filter: {sgoyt_count_244471: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_244471
      }
    }
    gl_245355: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_245355, order: DESC}, filter: {sgoyt_count_245355: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_245355
      }
    }
    gl_246401: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_246401, order: DESC}, filter: {sgoyt_count_246401: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_246401
      }
    }
    gl_247302: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_247302, order: DESC}, filter: {sgoyt_count_247302: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_247302
      }
    }
    gl_249922: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_249922, order: DESC}, filter: {sgoyt_count_249922: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_249922
      }
    }
    gl_251846: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_251846, order: DESC}, filter: {sgoyt_count_251846: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_251846
      }
    }
    gl_251880: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_251880, order: DESC}, filter: {sgoyt_count_251880: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_251880
      }
    }
    gl_252324: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_252324, order: DESC}, filter: {sgoyt_count_252324: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_252324
      }
    }
    gl_253515: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_253515, order: DESC}, filter: {sgoyt_count_253515: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_253515
      }
    }
    gl_255931: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_255931, order: DESC}, filter: {sgoyt_count_255931: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_255931
      }
    }
    gl_256394: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_256394, order: DESC}, filter: {sgoyt_count_256394: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_256394
      }
    }
    gl_258026: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_258026, order: DESC}, filter: {sgoyt_count_258026: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_258026
      }
    }
    gl_260880: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_260880, order: DESC}, filter: {sgoyt_count_260880: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_260880
      }
    }
    gl_262008: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_262008, order: DESC}, filter: {sgoyt_count_262008: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_262008
      }
    }
    gl_262319: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_262319, order: DESC}, filter: {sgoyt_count_262319: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_262319
      }
    }
    gl_262633: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_262633, order: DESC}, filter: {sgoyt_count_262633: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_262633
      }
    }
    gl_266487: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_266487, order: DESC}, filter: {sgoyt_count_266487: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_266487
      }
    }
    gl_268583: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_268583, order: DESC}, filter: {sgoyt_count_268583: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_268583
      }
    }
    gl_269654: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_269654, order: DESC}, filter: {sgoyt_count_269654: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_269654
      }
    }
    gl_270349: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_270349, order: DESC}, filter: {sgoyt_count_270349: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_270349
      }
    }
    gl_272126: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_272126, order: DESC}, filter: {sgoyt_count_272126: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_272126
      }
    }
    gl_273040: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_273040, order: DESC}, filter: {sgoyt_count_273040: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_273040
      }
    }
    gl_274323: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_274323, order: DESC}, filter: {sgoyt_count_274323: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_274323
      }
    }
    gl_275246: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_275246, order: DESC}, filter: {sgoyt_count_275246: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_275246
      }
    }
    gl_276177: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_276177, order: DESC}, filter: {sgoyt_count_276177: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_276177
      }
    }
    gl_277289: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_277289, order: DESC}, filter: {sgoyt_count_277289: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_277289
      }
    }
    gl_278237: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_278237, order: DESC}, filter: {sgoyt_count_278237: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_278237
      }
    }
    gl_279491: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_279491, order: DESC}, filter: {sgoyt_count_279491: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_279491
      }
    }
    gl_280864: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_280864, order: DESC}, filter: {sgoyt_count_280864: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_280864
      }
    }
    gl_281198: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_281198, order: DESC}, filter: {sgoyt_count_281198: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_281198
      }
    }
    gl_282453: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_282453, order: DESC}, filter: {sgoyt_count_282453: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_282453
      }
    }
    gl_284335: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_284335, order: DESC}, filter: {sgoyt_count_284335: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_284335
      }
    }
    gl_285147: allGameDataJson (limit: 25, sort: {fields: sgoyt_count_285147, order: DESC}, filter: {sgoyt_count_285147: {gt: 0}}) {
      nodes {
        game_id
        game_name
        bgg_link
        sgoyt_count_285147
      }
    }
  }
`
