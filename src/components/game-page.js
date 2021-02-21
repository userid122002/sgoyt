import React from "react"
import { Link } from "gatsby"
import { DataGrid } from "@material-ui/data-grid"
import Collapsible from "react-collapsible"

export default function GamePage( {data, game_details, expansion_details, expansion_for_details} ) {
    const columns = [
        { field: 'link', headerName: "Link", width: 200, filterable: false, sortable: false, renderCell: (params) => (params.value) },
        { field: 'yearmonth', headerName: "Year/Month", width: 200 },
        { field: 'user', headerName: "User", width: 200 },
        { field: 'id', headerName: "ID", hide: true },
    ]
    const rows = []
    data.forEach(function(data_item) {
        rows.push(
            {
                link: <a href={data_item.geeklistitem} target="_blank" rel="noreferrer">[sgoyt]</a>,
                yearmonth: data_item.yearmonth,
                user: data_item.user,
                id: data_item.rownum,
            }
        )
    })
    let exp = <div></div>
    if (expansion_details.length > 0) {
        exp = <h4>Expansions:</h4>
    }
    let exp_for = <div></div>
    if (expansion_for_details.length > 0) {
        exp_for = <h4>Expansion for:</h4>
    }
    console.log(game_details['game_name'] == null)
    let details = <div>
        <Collapsible trigger="Game Details"><p>No data</p></Collapsible>
    </div>
    if (game_details['game_name'] != null) {
        details = <div>
        <h3>{game_details['game_name']}</h3>
        <Collapsible trigger="Game Details">
            <div>
                <img alt={game_details['game_name']} style={{margin:`10px 10px`}} src={game_details['thumbnail']}></img>
                <p><a href={game_details['bgglink']} target="_blank" rel="noreferrer">[bgg]</a></p>
                <p>Designer(s): {game_details['designers']}</p>
                <p>Rating: {game_details['rating']}</p>
                <p>Weight: {game_details['weight']}</p>
                <p>Year Published: {game_details['yearpublished']}</p>
                <p>Play Time: {game_details['playtime']}</p>
                <p>Game Categories: {game_details['categories']}</p>
                <p>Game Mechanics: {game_details['mechanics']}</p>
                <p>Recommended as a solo game: {game_details['recommended']}</p>
                {exp}
                {expansion_details.map(function(expansion) {
                    return (
                        <tr>
                            <td><p>{expansion.expansionname}</p></td>
                            <td> <p><Link to={"/gamedetails/?gameid=" + expansion.expansionid} target="_blank" rel="noreferrer">[details]</Link></p></td>
                            <td><p><a href={expansion.expansionbgglink} target="_blank" rel="noreferrer">[bgg]</a></p></td>
                        </tr>
                    )
                })}
                {exp_for}
                {expansion_for_details.map(function(expansion_for) {
                    return (
                        <tr>
                            <td padding-top='20px'
                                padding-bottom='20px'
                                padding-right='20px'>
                                <p>{expansion_for.gamename}</p>
                            </td>
                            <td padding-top='20px'
                                padding-bottom='20px'
                                padding-right='20px'>
                                <p><Link to={"/gamedetails/?gameid=" + expansion_for.gameid} target="_blank" rel="noreferrer">[details]</Link></p>
                            </td>
                            <td padding-top='20px'
                                padding-bottom='20px'
                                padding-right='20px'>
                                <p><a href={expansion_for.gamebgglink} target="_blank" rel="noreferrer">[bgg]</a></p>
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