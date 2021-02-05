import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function History( {data} ) {
    return (
        <Layout>
            <SEO title="History"></SEO>
            <h1>Update history</h1>
            {data.allHistoryCsv.nodes.map(function(data_item) {
                return (
                    <tr>
                        <td padding-top='20px'
                            padding-bottom='20px'
                            padding-right='20px'>
                            {data_item.date}
                        </td>
                        <td padding-top='20px'
                            padding-bottom='20px'
                            padding-right='20px'>
                            {data_item.summary}
                        </td>
                    </tr>
                )
            })}
            <p></p>
            <Link to="/">Home</Link>
        </Layout>
    )
}

export const query = graphql`
    query {
        allHistoryCsv (sort: {fields: rownum, order: ASC}) {
            nodes {
                date
                summary
            }
        }
    }
`