import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function History( {data} ) {
    return (
        <Layout>
            <SEO title="History"></SEO>
            <h1>Update history</h1>
            <table table-layout='fixed' width='100%'>
            <tbody>
            {data.allHistoryCsv.nodes.map(function(data_item) {
                return (
                    <tr>
                        <td width='15%'
                            padding-top='20px'
                            padding-bottom='20px'
                            padding-right='20px'>
                            {data_item.date}
                        </td>
                        <td width='50%'
                            padding-top='20px'
                            padding-bottom='20px'
                            padding-right='20px'>
                            {data_item.summary}
                        </td>
                    </tr>
                )
            })}
            </tbody>
            </table>
        </Layout>
    )
}

export const query = graphql`
    query {
        allHistoryCsv (sort: {fields: rownum, order: DESC}) {
            nodes {
                date
                summary
            }
        }
    }
`