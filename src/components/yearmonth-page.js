import React from "react"
import { DataGrid } from "@material-ui/data-grid"

export default function YearMonthPage( {data} ) {
    const columns = [
        { field: 'game_name', headerName: "Game", width: 780 },
        { field: 'link', headerName: "Link", width: 120, filterable: false, sortable: false, renderCell: (params) => (params.value) },
        { field: 'contributor', headerName: "Contributor", width: 250 },
        { field: 'id', headerName: "ID", hide: true },
    ]
    const rows = []
    data.sgoyt_entries.forEach(function(data_item) {
        rows.push(
            {
                game_name: data_item.game_name,
                link: <a href={data_item.geeklist_item_link} target="_blank" rel="noreferrer">[sgoyt]</a>,
                contributor: data_item.contributor,
                id: data_item.geeklist_item_id,
            }
        )
    })
    return (
        <div>
            <h2>{data.year_month}</h2>
            <p>Hosted by {data.geeklist_host}</p>
            <small>The column header can be used to filter the results for a particular game or user.</small>
            <div style={{ height: 670, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10, 20, 50, 100]} hideFooterSelectedRowCount={true}/>
            </div>
        </div>
    )
}