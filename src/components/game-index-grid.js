import React from "react"
import { DataGrid } from "@material-ui/data-grid"
import { Link } from "gatsby"

export default function GameIndexGrid({ data }) {
    const columns = [
        { field: 'game', headerName: 'Game', width: 780 },
        { field: 'gamepage', headerName: 'Details', width: 120, filterable: false, sortable: false, renderCell: (params) => (params.value) },
        { field: 'bgg_link', headerName: 'BGG', width: 120, filterable: false, sortable: false, renderCell: (params) => (params.value) },
        { field: 'id', headerName: 'ID', hide: true },
    ]
    const rows = []
    data.forEach(function(data_item) {
            rows.push(
                {
                    game: data_item.game_name,
                    gamepage: <Link to={"/gamedetails/?gameid=" + data_item.game_id}>[details]</Link>,
                    bgg_link: <a href={data_item.bgg_link} target="_blank" rel="noreferrer">[bgg]</a>,
                    id: data_item.game_id,
                }
            )
        }
    )
    return (
        <div>
           <p><small>The column header can be used to filter the results for a particular game.</small></p>
           <div style={{ height: 670, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10, 20, 50, 100]} hideFooterSelectedRowCount={true}/>
            </div>
        </div>
    )
}