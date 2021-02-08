import React from "react"
import { DataGrid } from "@material-ui/data-grid"
import { Link } from "gatsby"

export default function IndexGrid({ data }) {
    const columns = [
        { field: 'game', headerName: 'Game', width: 780 },
        { field: 'gamepage', headerName: 'Details', width: 120, renderCell: (params) => (params.value) },
        { field: 'bgglink', headerName: 'BGG', width: 120, renderCell: (params) => (params.value) },
        { field: 'id', headerName: 'ID', hide: true }
    ]
    const rows = []
    data.forEach(function(data_item) {
            rows.push(
                {
                    game: data_item.game,
                    gamepage: <Link to={"/sgoytdetails/?gameid=" + data_item.gameid}>[details]</Link>,
                    bgglink: <a href={data_item.bgglink} target="_blank" rel="noreferrer">[bgg]</a>,
                    id: data_item.gameid,
                }
            )

        }
    )
    return (
        <div>
            <h1>Index of Games</h1>
            <div style={{ height: 670, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10, 20, 50, 100]}/>
            </div>
        </div>
    )
}