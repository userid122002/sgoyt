import React from "react"
import { DataGrid } from "@material-ui/data-grid"
import { Link } from "gatsby"

export default function CategoriesIndexGrid( {data} ) {
    const columns = [
        { field: 'game', headerName: 'Game', width: 500 },
        { field: 'gamepage', headerName: 'Details', width: 120, filterable: false, sortable: false, renderCell: (params) => (params.value) },
        { field: 'categories', headerName: 'Categories', width: 1500 },
        { field: 'id', headerName: 'ID', hide: true },
    ]
    const rows = []
    data.forEach(function(data_item) {
            rows.push(
                {
                    game: data_item.game_name,
                    gamepage: <Link to={"/gamedetails/?gameid=" + data_item.game_id}>[details]</Link>,
                    categories: data_item.categories_string,
                    id: data_item.game_id,
                }
            )
        }
    )
    return (
        <div>
            <p><small>The column header can be used to filter the results for a particular game or category.</small></p>
            <p><small>Note: You will need to scroll over to the right and hover over the menu in order to see the option to filter by category.</small></p>
            <div style={{ height: 670, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10, 20, 50, 100]} hideFooterSelectedRowCount={true}/>
            </div>
        </div>
    )
}