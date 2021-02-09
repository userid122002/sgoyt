import React from "react"
import { DataGrid } from "@material-ui/data-grid"
import { Link } from "gatsby"

export default function YearMonthIndexGrid( {data} ) {
    const columns = [
        { field: 'yearmonth', headerName: "Year/Month", width: 200 },
        { field: 'yearmonthpage', headerName: "Details", width: 120, filterable: false, sortable: false, renderCell: (params) => (params.value) },
        { field: 'bgglink', headerName: "BGG", width: 120, filterable: false, sortable: false, renderCell: (params) => (params.value) },
        { field: 'id', headerName: "ID", hide: true },
    ]
    const rows = []
    data.forEach(function(data_item) {
        rows.push(
            {
                'yearmonth': data_item.yearmonth,
                'yearmonthpage': <Link to={"/yearmonthdetails/?geeklistid=" + data_item.geeklistid}>[details]</Link>,
                'bgglink': <a href={data_item.geeklistlink} target="_blank" rel="noreferrer">[bgg]</a>,
                'id': data_item.geeklistid,
            }
        )
    })
    return (
        <div>
            <h1>Year/Month Index</h1>
            <div style={{ height: 670, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10, 20, 50, 100]}/>
            </div>
            <small>The column header can be used to filter the results for a particular year/month.</small>
        </div>
    )
}