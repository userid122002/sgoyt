import React from "react"
import { Link } from "gatsby"
import { DataGrid } from "@material-ui/data-grid"
import Collapsible from "react-collapsible"
import { LineChart } from 'react-chartkick'
import "chart.js"

export default function GamePage( {game_data, geeklist_data} ) {
    const columns = [
        { field: 'link', headerName: "Link", width: 200, filterable: false, sortable: false, renderCell: (params) => (params.value) },
        { field: 'year_month', headerName: "Year/Month", width: 200 },
        { field: 'contributor', headerName: "Contributor", width: 200 },
        { field: 'id', headerName: "ID", hide: true },
    ]
    const rows = []
    let exp = <div></div>
    let exp_for = <div></div>
    if (game_data['sgoyt_entries'] != null) {
        game_data['sgoyt_entries'].forEach(function(data_item) {
            rows.push(
                {
                    link: <a href={data_item.geeklist_item_link} target="_blank" rel="noreferrer">[sgoyt]</a>,
                    year_month: data_item.year_month,
                    contributor: data_item.contributor,
                    id: data_item.geeklist_item_id,
                }
            )
        })
        if (game_data['expansions'].length > 0) {
        exp = <h4>Expansions:</h4>
        }
        if (game_data['expansion_for'].length > 0) {
            exp_for = <h4>Expansion for:</h4>
        }
    }
    let details = <div>
        <Collapsible trigger="Game Details"><p>No data</p></Collapsible>
    </div>
    if (game_data['game_name'] != null) {
        details = <div>
        <h3>{game_data['game_name']}</h3>
        <Collapsible trigger="Game Details">
            <div>
                <img alt={game_data['game_name']} style={{margin:`10px 10px`}} src={game_data['thumbnail']}></img>
                <p><a href={game_data['bgg_link']} target="_blank" rel="noreferrer">[bgg]</a></p>
                <p>Designer(s): {game_data['designers_string']}</p>
                <p>Rating: {game_data['rating']}</p>
                <p>Weight: {game_data['weight']}</p>
                <p>Year Published: {game_data['year_published']}</p>
                <p>Play Time: {game_data['play_time']}</p>
                <p>Game Categories: {game_data['categories_string']}</p>
                <p>Game Mechanics: {game_data['mechanics_string']}</p>
                <p>Recommended as a solo game: {game_data['recommended_string']}</p>
                {exp}
                <table>
                <tbody>
                {game_data.expansions.map(function(expansion) {
                    return (
                        <tr key={expansion.expansion_name}>
                            <td><p>{expansion.expansion_name}</p></td>
                            <td> <p><Link to={"/gamedetails/?gameid=" + expansion.expansion_id}>[details]</Link></p></td>
                            <td><p><a href={expansion.expansion_bgg_link} target="_blank" rel="noreferrer">[bgg]</a></p></td>
                        </tr>
                    )
                })}
                </tbody>
                </table>
                {exp_for}
                {game_data.expansion_for.map(function(expansion_for) {
                    return (
                        <tr key={expansion_for.game_name}>
                            <td><p>{expansion_for.game_name}</p></td>
                            <td><p><Link to={"/gamedetails/?gameid=" + expansion_for.game_id}>[details]</Link></p></td>
                            <td><p><a href={expansion_for.game_bgg_link} target="_blank" rel="noreferrer">[bgg]</a></p></td>
                        </tr>
                    )
                })}
            </div>
        </Collapsible>
        </div>
    }
    let chart = <div>
        <Collapsible trigger="Chart"><p>No data</p></Collapsible>
    </div>
    if (game_data['game_name'] != null) {
        const chart_data = {}
        geeklist_data.forEach(function(geeklist) {
            const count_var = 'sgoyt_count_' + geeklist['geeklist_id']
            const count = game_data[count_var]
            chart_data[geeklist['year_month']] = count
        })
        chart = <div>
            <Collapsible trigger="Chart">
                <LineChart data={chart_data}></LineChart>
            </Collapsible>
        </div>
    }
    return (        
        <div>
            {details}
            {chart}
            <small>The column header can be used to filter the results for a particular year/month or user.</small>
            <div style={{ height: 670, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10, 20, 50, 100]} hideFooterSelectedRowCount={true}/>
            </div>
        </div>
    )
}