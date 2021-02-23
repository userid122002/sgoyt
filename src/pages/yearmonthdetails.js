import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import YearMonthPage from "../components/yearmonth-page"
import SEO from "../components/seo"
import Layout from "../components/layout"
import withLocation from "../components/withLocation"

function YearMonth( {data, search} ) {
    const { geeklistid } =  search
    const filtered_data = data.allYearMonthDataJson.nodes.filter(n => n.geeklist_id === geeklistid)
    let sgoyt_data = {}
    filtered_data.forEach(function(data_item) {
        sgoyt_data = data_item
    })
    return (
        <Layout>
            <SEO title={sgoyt_data.year_month}></SEO>
            <YearMonthPage data={sgoyt_data}></YearMonthPage>
        </Layout>
    )
}

YearMonth.propTypes = {
    search: PropTypes.object,
}

export default withLocation(YearMonth)

export const query = graphql`
  query {
    allYearMonthDataJson {
        nodes {
          geeklist_host
          geeklist_id
          geeklist_link
          year_month
          sgoyt_entries {
            contributor
            game_bgg_link
            game_id
            game_name
            geeklist_host
            geeklist_id
            geeklist_item_id
            geeklist_item_link
            month
            year
            year_month
          }
        }
      }
  }
`
