import React from "react"
import { graphql } from "gatsby"
import YearMonthIndexGrid from "../components/yearmonth-index-grid"
import SEO from "../components/seo"
import Layout from "../components/layout"

export default function Index( {data} ) {
    return (
      <Layout>
          <SEO title="Year/Month Index"></SEO>
          <YearMonthIndexGrid data={data.allYearmonthIndexCsv.nodes}></YearMonthIndexGrid>
      </Layout>
    )
  }

  export const query = graphql`
    query {
      allYearmonthIndexCsv (sort: {fields: geeklistid, order: DESC}) {
        nodes {
          geeklistid
          yearmonth
          geeklistlink
        }
      }
    }
`