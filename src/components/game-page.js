import React from "react"
import { Link } from "gatsby"
import { DataGrid } from "@material-ui/data-grid"
import Collapsible from "react-collapsible"

export default function GamePage( {data} ) {
    const columns = [
        { field: 'link', headerName: "Link", width: 200, filterable: false, sortable: false, renderCell: (params) => (params.value) },
        { field: 'year_month', headerName: "Year/Month", width: 200 },
        { field: 'contributor', headerName: "Contributor", width: 200 },
        { field: 'id', headerName: "ID", hide: true },
    ]
    const rows = []
    let exp = <div></div>
    let exp_for = <div></div>
    if (data['sgoyt_entries'] != null) {
        data['sgoyt_entries'].forEach(function(data_item) {
            rows.push(
                {
                    link: <a href={data_item.geeklist_item_link} target="_blank" rel="noreferrer">[sgoyt]</a>,
                    year_month: data_item.year_month,
                    contributor: data_item.contributor,
                    id: data_item.geeklist_item_id,
                }
            )
        })
        if (data['expansions'].length > 0) {
        exp = <h4>Expansions:</h4>
        }
        if (data['expansion_for'].length > 0) {
            exp_for = <h4>Expansion for:</h4>
        }
    }
    let details = <div>
        <Collapsible trigger="Game Details"><p>No data</p></Collapsible>
    </div>
    if (data['game_name'] != null) {
        details = <div>
        <h3>{data['game_name']}</h3>
        <Collapsible trigger="Game Details">
            <div>
                <img alt={data['game_name']} style={{margin:`10px 10px`}} src={data['thumbnail']}></img>
                <p><a href={data['bgg_link']} target="_blank" rel="noreferrer">[bgg]</a></p>
                <p>Designer(s): {data['designers_string']}</p>
                <p>Rating: {data['rating']}</p>
                <p>Weight: {data['weight']}</p>
                <p>Year Published: {data['year_published']}</p>
                <p>Play Time: {data['play_time']}</p>
                <p>Game Categories: {data['categories_string']}</p>
                <p>Game Mechanics: {data['mechanics_string']}</p>
                <p>Recommended as a solo game: {data['recommended_string']}</p>
                {exp}
                {data.expansions.map(function(expansion) {
                    return (
                        <tr>
                            <td><p>{expansion.expansion_name}</p></td>
                            <td> <p><Link to={"/gamedetails/?gameid=" + expansion.expansion_id} target="_blank" rel="noreferrer">[details]</Link></p></td>
                            <td><p><a href={expansion.expansion_bgg_link} target="_blank" rel="noreferrer">[bgg]</a></p></td>
                        </tr>
                    )
                })}
                {exp_for}
                {data.expansion_for.map(function(expansion_for) {
                    return (
                        <tr>
                            <td padding-top='20px'
                                padding-bottom='20px'
                                padding-right='20px'>
                                <p>{expansion_for.game_name}</p>
                            </td>
                            <td padding-top='20px'
                                padding-bottom='20px'
                                padding-right='20px'>
                                <p><Link to={"/gamedetails/?gameid=" + expansion_for.game_id} target="_blank" rel="noreferrer">[details]</Link></p>
                            </td>
                            <td padding-top='20px'
                                padding-bottom='20px'
                                padding-right='20px'>
                                <p><a href={expansion_for.game_bgg_link} target="_blank" rel="noreferrer">[bgg]</a></p>
                            </td>
                        </tr>
                    )
                })}
            </div>
        </Collapsible>
    </div>
    }
    return (        
        <div>
            {details}
            <small>The column header can be used to filter the results for a particular year/month or user.</small>
            <div style={{ height: 670, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10, 20, 50, 100]} hideFooterSelectedRowCount={true}/>
            </div>
        </div>
    )
}