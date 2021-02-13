import React from "react"
import { DataGrid } from "@material-ui/data-grid"
import Collapsible from "react-collapsible"

export default function GamePage( {data, game_name, bgglink} ) {
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

    return (
        <div>
            <img alt={game_name} style={{float:`right`, margin:`0px 10px`}} src="https://cf.geekdo-images.com/rpwCZAjYLD940NWwP3SRoA__thumb/img/YT6svCVsWqLrDitcMEtyazVktbQ=/fit-in/200x150/filters:strip_icc()/pic4718279.jpg"></img>
            <h3>{game_name}</h3>
            <Collapsible trigger="Game Details">
                <tr>
                    <td><small><a href={bgglink} target="_blank" rel="noreferrer">[bgg]</a></small></td>
                    <td><small>Rating: 5</small></td>
                    <td><small>Weight: 3.5</small></td>
                    <td><small>Year published: 2015</small></td>
                    <td><small>Play time: 240 min</small></td>
                    <td><small>80% recommended at 1 player.</small></td>
                </tr>
            </Collapsible>
            <div style={{ height: 670, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10, 20, 50, 100]} hideFooterSelectedRowCount={true}/>
            </div>
            <small>The column header can be used to filter the results for a particular year/month or user.</small>
        </div>
    )
}