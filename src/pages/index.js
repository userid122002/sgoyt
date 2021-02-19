import React from "react"
import { graphql } from "gatsby"
import Collapsible from "react-collapsible"
import GameIndexGrid from "../components/game-index-grid"
import MechanicsIndexGrid from "../components/mechanics-index-grid"
import CategoriesIndexGrid from "../components/category-index-grid"
import DesignersIndexGrid from "../components/designer-index-grid"
import YearMonthIndexGrid from "../components/yearmonth-index-grid"
import SEO from "../components/seo"
import Layout from "../components/layout"

export default function Index( {data} ) {
  return (
    <Layout>
        <SEO title="Home"></SEO>
        <h1>Index</h1>
        <Collapsible trigger="Search Games by Title"><GameIndexGrid data={data.allGameIndexCsv.nodes}></GameIndexGrid></Collapsible>
        <Collapsible trigger="Search Games by Mechanic"><MechanicsIndexGrid data={data.allGameIndexCsv.nodes}></MechanicsIndexGrid></Collapsible>
        <Collapsible trigger="Search Games by Category"><CategoriesIndexGrid data={data.allGameIndexCsv.nodes}></CategoriesIndexGrid></Collapsible>
        <Collapsible trigger="Search Games by Designer"><DesignersIndexGrid data={data.allGameIndexCsv.nodes}></DesignersIndexGrid></Collapsible>
        <Collapsible trigger="Search Geeklists by Year/Month"><YearMonthIndexGrid data={data.allYearmonthIndexCsv.nodes}></YearMonthIndexGrid></Collapsible>
    </Layout>
  )
}

export const query = graphql`
    query {
      allGameIndexCsv (sort: {fields: game, order: ASC}) {
        nodes {
          bgglink
          game
          gameid
          mechanics
          categories
          designers
        }
      },
      allYearmonthIndexCsv (sort: {fields: geeklistid, order: DESC}) {
        nodes {
          geeklistid
          yearmonth
          geeklistlink
        }
    }
  }
`