import React from "react"
import { DataGrid } from "@material-ui/data-grid"
import { Link } from "gatsby"

export default function GamePage( {data, game_name} ) {
    const entry_count = data.length
    const back_link = '<--back'
    
    const columns = [
        { field: 'link', headerName: "Link", width: 200, filterable: false, sortable: false, renderCell: (params) => (params.value) },
        { field: 'yearmonth', headerName: "Year/Month", width: 200 },
        { field: 'user', headerName: "User", width: 200 },
        { field: 'id', headerName: "ID", hide: true}
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
            <h2>{game_name}</h2>
            <p><Link to="/">{back_link}</Link></p>
            <p>SGOYT entries: {entry_count}</p>
            <div style={{ height: 670, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10, 20, 50, 100]}/>
            </div>
            <small>The column header can be used to filter the results for a particular year/month or user.</small>
        </div>
    )
}