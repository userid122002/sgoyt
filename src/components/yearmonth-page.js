import React from "react"
import { DataGrid } from "@material-ui/data-grid"
import { Link } from "gatsby"

export default function YearMonthPage( {data, yearmonth, host} ) {
    const entry_count = data.length
    const back_link = '<--back'

    const columns = [
        { field: 'game', headerName: "Game", width: 780 },
        { field: 'link', headerName: "Link", width: 120, filterable: false, sortable: false, renderCell: (params) => (params.value) },
        { field: 'user', headerName: "User", width: 250 },
        { field: 'id', headerName: "ID", hide: true },
    ]
    const rows = []
    data.forEach(function(data_item) {
        rows.push(
            {
                game: data_item.game,
                link: <a href={data_item.geeklistitem} target="_blank" rel="noreferrer">[sgoyt]</a>,
                user: data_item.user,
                id: data_item.rownum,
            }
        )
    })
    return (
        <div>
            <h2>{yearmonth}</h2>
            <p>Hosted by {host}</p>
            <p><Link to="/yearmonthindex">{back_link}</Link></p>
            <p>SGOYT entries: {entry_count}</p>
            <div style={{ height: 670, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10, 20, 50, 100]}/>
            </div>
            <small>The column header can be used to filter the results for a particular game or user.</small>
        </div>
    )
}