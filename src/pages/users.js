import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { LineChart } from 'react-chartkick'
import "chart.js"

export default function UserData( {data} ) {
    const guild_data = data.allGuildDataJson.nodes
    let guild_membership = {}
    let count_data = [{"name": "Count", "data": {}}]
    let cum_count_data = [{"name": "Cumulative Count", "data": {}}]
    guild_data.forEach(function(data_item) {
        guild_membership['user_count_by_date'] = data_item.user_count_by_date
    })
    guild_membership.user_count_by_date.forEach(function(data_item) {
        count_data[0]['data'][data_item.date] = data_item.count
        cum_count_data[0]['data'][data_item.date] = data_item.cumulative_count
    })
    const top_host_data = data.allTopHostsDataJson.nodes
    let top_hosts = {}
    top_host_data.forEach(function(data_item) {
        top_hosts['top_hosts'] = sort_by_key(data_item.top_hosts, 'count', -1)
    })
    const top_contributor_data = data.allTopContributorsDataJson.nodes
    let top_contributors = {}
    top_contributor_data.forEach(function(data_item) {
        top_contributors['top_contributors'] = sort_by_key(data_item.top_contributors, 'count', -1)
    })
    return (
        <Layout>
            <SEO title="Users"></SEO>
            <h1>One Player Guild - Membership Count by Month</h1>
            <LineChart data={count_data}></LineChart>
            <h1>One Player Guild - Cumulative Membership Count by Month</h1>
            <LineChart data={cum_count_data}></LineChart>
            <h1>Top SGOYT Hosts</h1>
            <table table-layout='fixed' width='100%'><tbody>
                {top_hosts['top_hosts'].map(function(data_item) {
                    return (
                        <tr key={data_item['username']}>
                            <td>{data_item['username']}</td>
                            <td>{data_item['count']}</td>
                        </tr>
                    )
                })}
            </tbody></table>
            <h1>Top SGOYT Contributors</h1>
            <table table-layout='fixed' width='100%'><tbody>
                {top_contributors['top_contributors'].map(function(data_item) {
                    return (
                        <tr key={data_item['username']}>
                            <td>{data_item['username']}</td>
                            <td>{data_item['count']}</td>
                        </tr>
                    )
                })}
            </tbody></table>
        </Layout>
    )
}

function sort_by_key(array, key, order = 1)
{
 return array.sort(function(a, b)
 {
  var x = a[key]; var y = b[key]
  return order*((x < y) ? -1 : ((x > y) ? 1 : 0))
 })
}

export const query = graphql`
  query {
    allGuildDataJson {
      nodes {
        user_count_by_date {
          count
          cumulative_count
          date
        }
      }
    }
    allTopContributorsDataJson {
      nodes {
        top_contributors {
          count
          username
        }
      }
    }
    allTopHostsDataJson {
      nodes {
        top_hosts {
          count
          username
        }
      }
    }
  }
`