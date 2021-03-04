import React from "react"
import { DataGrid } from "@material-ui/data-grid"
import { Link } from "gatsby"

export default function YearMonthIndexGrid( {data} ) {
    const columns = [
        { field: 'year_month', headerName: "Year/Month", width: 200 },
        { field: 'year_month_page', headerName: "Details", width: 120, filterable: false, sortable: false, renderCell: (params) => (params.value) },
        { field: 'bgg_link', headerName: "BGG", width: 120, filterable: false, sortable: false, renderCell: (params) => (params.value) },
        { field: 'geeklist_host', headerName: "Host", width: 180 },
        { field: 'id', headerName: "ID", hide: true },
    ]
    const rows = []
    data.forEach(function(data_item) {
        rows.push(
            {
                'year_month': data_item.year_month,
                'year_month_page': <Link to={"/yearmonthdetails/?geeklistid=" + data_item.geeklist_id}>[details]</Link>,
                'bgg_link': <a href={data_item.geeklist_link} target="_blank" rel="noreferrer">[bgg]</a>,
                'geeklist_host': data_item.geeklist_host,
                'id': data_item.geeklist_id,
            }
        )
    })
    return (
        <div>
            <p><small>The column header can be used to filter the results for a particular year/month.</small></p>
            <div style={{ height: 670, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10, 20, 50, 100]} hideFooterSelectedRowCount={true}/>
            </div>
        </div>
    )
}