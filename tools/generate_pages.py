import os
import pandas as pd

page_text = """
import React from "react"
import { graphql } from "gatsby"
import GamePage from "../../components/game-page"
import SEO from "../../components/seo"
import Layout from "../../components/layout"

export default function Game( {data} ) {
    const game_name = data.allSgoytCsv.nodes[0].game
    return (
        <Layout>
            <SEO title={game_name}></SEO>
            <GamePage data={data.allSgoytCsv.nodes}></GamePage>
        </Layout>
    )
}

export const query = graphql`
    query {
        allSgoytCsv(filter: {gameid: {eq: "[GEEKLISTID]"}}, sort: {fields: yearmonth, order: DESC}) {
            nodes {
                game
                gameid
                geeklisthost
                geeklistitem
                rownum
                user
                yearmonth
            }
        }
    }
`
"""

data = pd.read_csv('tools/CSV/game_index.csv', delimiter='###', engine='python')
for row in data.itertuples(index=False, name='game_item'):
    file_name = 'G{0}.js'.format(str(row[0]))
    output_file_path = 'tools/JS/{0}'.format(file_name)
    page_contents = page_text.replace('[GEEKLISTID]', str(row[0]))
    js_output = open(output_file_path, 'w')
    js_output.write(page_contents)
    js_output.close()