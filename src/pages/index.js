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
        <Collapsible trigger="Search Games by Title"><GameIndexGrid data={data.allGameDataJson.nodes}></GameIndexGrid></Collapsible>
        <Collapsible trigger="Search Games by Mechanic"><MechanicsIndexGrid data={data.allGameDataJson.nodes}></MechanicsIndexGrid></Collapsible>
        <Collapsible trigger="Search Games by Category"><CategoriesIndexGrid data={data.allGameDataJson.nodes}></CategoriesIndexGrid></Collapsible>
        <Collapsible trigger="Search Games by Designer"><DesignersIndexGrid data={data.allGameDataJson.nodes}></DesignersIndexGrid></Collapsible>
        <Collapsible trigger="Search Geeklists by Year/Month"><YearMonthIndexGrid data={data.allYearMonthDataJson.nodes}></YearMonthIndexGrid></Collapsible>
    </Layout>
  )
}

export const query = graphql`
    query {
      allYearMonthDataJson (sort: {fields: year_month, order: DESC}) {
        nodes {
          geeklist_id
          geeklist_link
          year_month
        }
      },
      allGameDataJson (sort: {fields: game_name}) {
        nodes {
          bgg_link
          game_id
          game_name
          designers
          categories
          mechanics
        }
      }
    }
`