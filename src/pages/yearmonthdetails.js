import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import YearMonthPage from "../components/yearmonth-page"
import SEO from "../components/seo"
import Layout from "../components/layout"
import withLocation from "../components/withLocation"

function YearMonth( {data, search} ) {
    const { geeklistid } =  search
    const game_data = data.allSgoytCsv.nodes.filter(n => n.geeklistid === geeklistid)
    const yearemonth_data = data.allYearmonthIndexCsv.nodes.filter(n => n.geeklistid === geeklistid)
    let yearmonth = ""
    let host = ""
    yearemonth_data.forEach(function(data_item) {
        yearmonth = data_item.yearmonth
    })
    game_data.forEach(function(data_item) {
        host = data_item.geeklisthost
    }) 
    return (
        <Layout>
            <SEO title={yearmonth}></SEO>
            <YearMonthPage data={game_data} yearmonth={yearmonth} host={host}></YearMonthPage>
        </Layout>
    )
}

YearMonth.propTypes = {
    search: PropTypes.object,
}

export default withLocation(YearMonth)

export const query = graphql`
    query {
        allYearmonthIndexCsv {
            nodes {
                geeklistid
                yearmonth
                geeklistlink
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
                geeklistid
            }
            totalCount
        }
    }
`